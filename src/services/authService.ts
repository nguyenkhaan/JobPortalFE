import { publicApi, privateApi } from "../api/api";
import { TokenType } from "../bases/enums/jwt.enum";
import { CookiesService } from "./cookieServices";
import { LocalStorageService } from "./localStorageService";

import type {
  ApiResponse,
  LoginResponseDto,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types/auth";

export class AuthService {
  static async login(payload: LoginRequest): Promise<LoginResponseDto> {
    const result = await publicApi.post<unknown, ApiResponse<LoginResponseDto>>(
      "/auth/login",
      payload,
    );

    if (!result.isSuccess || !result.value) {
      throw new Error(result.errorMessage || "Login failed");
    }

    return result.value;
  }
  static async register(payload: RegisterRequest): Promise<void> {
    const result = await publicApi.post<unknown, ApiResponse<string>>(
      "/auth/register",
      payload,
    );

    if (!result.isSuccess) {
      throw new Error(result.errorMessage || "Registration failed");
    }
  }

  static async forgotPassword(payload: ForgotPasswordRequest): Promise<string> {
    const result = await publicApi.post<unknown, ApiResponse<string>>(
      "/auth/forgot-password",
      payload,
    );

    if (!result.isSuccess) {
      throw new Error(result.errorMessage || "Failed to send request");
    }

    return result.value || "Please check your email";
  }

  static async resetPassword(payload: ResetPasswordRequest): Promise<string> {
    const result = await publicApi.post<unknown, ApiResponse<string>>(
      "/auth/reset-password",
      payload,
    );

    if (!result.isSuccess) {
      throw new Error(result.errorMessage || "Password reset failed");
    }

    return result.value || "Password reset successful";
  }

  static async me() {
    const result = await privateApi.get<unknown, ApiResponse<unknown>>(
      "/auth/me",
    );

    if (!result.isSuccess || !result.value) {
      throw new Error(
        result.errorMessage || "Failed to fetch user information",
      );
    }

    return result.value;
  }

  static checkLogin(): boolean {
    return !!(
      CookiesService.getToken(TokenType.ACCESS_TOKEN) &&
      CookiesService.getToken(TokenType.REFRESH_TOKEN) &&
      LocalStorageService.getValue("me")
    );
  }
}
