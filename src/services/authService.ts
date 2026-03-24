import api from "./axiosClient";
import type {
  ApiResponse,
  LoginResponseDto,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types/auth";

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponseDto> {
    const result = await api.post<ApiResponse<LoginResponseDto>>(
      "/auth/login",
      payload,
    );
    if (!result.data?.isSuccess || !result.data?.value) {
      throw new Error(result.data?.errorMessage || "Login is failure");
    }

    return result.data.value;
  },

  async register(payload: RegisterRequest): Promise<void> {
    const result = await api.post<ApiResponse<string>>(
      "/auth/register",
      payload,
    );

    if (!result.data?.isSuccess) {
      throw new Error(result.data?.errorMessage || "Register is failure");
    }
  },

  async forgotPassword(payload: ForgotPasswordRequest): Promise<string> {
    const result = await api.post<ApiResponse<string>>(
      "/auth/forgot-password",
      payload,
    );
    if (!result.data?.isSuccess) {
      throw new Error(result.data?.errorMessage || "Request failed");
    }

    return result.data.value || "Please check your email";
  },

  async ResetPassword(payload: ResetPasswordRequest): Promise<string> {
    const result = await api.post<ApiResponse<string>>(
      "/auth/reset-password",
      payload,
    );
    if (!result.data.isSuccess) {
      throw new Error(result.data?.errorMessage || "Reset password failed");
    }
    return result.data.value || "Reset password successfully";
  },
};
