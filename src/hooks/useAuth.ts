import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthService } from "../services/authService";
import type {
  LoginRequest,
  RegisterRequest,
  VerifyResetPasswordRequest,
} from "../types/auth";
import { CookiesService } from "../services/cookieServices";
import { LocalStorageService } from "../services/local-storage";
import { TokenType } from "../bases/enums/jwt.enum";
import { type ApiError } from "../api/api";

interface AuthFlowError {
  type?: "LOGIN_ERROR" | "PROFILE_ERROR";
  originalError?: ApiError;
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      let tokens;
      try {
        tokens = await AuthService.login(payload);
      } catch (err) {
        return Promise.reject({ type: "LOGIN_ERROR", originalError: err });
      }

      localStorage.setItem("accessToken", tokens.accessToken);

      if (tokens.refreshToken) {
        CookiesService.saveToken(tokens.refreshToken, TokenType.REFRESH_TOKEN);
      }

      try {
        const user = await AuthService.getMe();
        LocalStorageService.saveValue("me", user);
        return user;
      } catch (err) {
        return Promise.reject({ type: "PROFILE_ERROR", originalError: err });
      }
    },
    onSuccess: (user) => {
      toast.success("Login successful!");

      const isEmployer = user.roles.includes("EMPLOYER");

      if (!user.hasProfile) {
        if (isEmployer) {
          navigate("/employer/setup/company");
        } else {
          navigate("/candidate/settings");
        }
      } else {
        if (isEmployer) {
          navigate("/employer/dashboard");
        } else {
          navigate("/candidate/overview");
        }
      }
    },
    onError: (error: unknown) => {
      const authError = error as AuthFlowError;

      if (authError?.type === "LOGIN_ERROR") {
        const beMessage = authError.originalError?.response?.data?.message;
        toast.error(beMessage || "Incorrect email or password.");
      } else if (authError?.type === "PROFILE_ERROR") {
        toast.error(
          "Login successful, but failed to fetch profile. Please check the Backend API!",
        );
        console.error("Details of /auth/me error:", authError.originalError);
      } else {
        toast.error("An unexpected error occurred during processing.");
        console.error("Unknown error:", error);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => AuthService.register(payload),
    onSuccess: () => {
      toast.success(
        "Registration successful! Please check your email to verify your account.",
      );
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const beMessage = apiError.response?.data?.message;
      toast.error(
        beMessage || "Registration failed. The email may already exist.",
      );
    },
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => AuthService.requestPasswordReset(email),
    onSuccess: () => {
      toast.success("Password reset link sent! Please check your email.");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const beMessage = apiError.response?.data?.message;
      toast.error(beMessage || "No account found with this email.");
    },
  });
};

export const useVerifyResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: VerifyResetPasswordRequest) =>
      AuthService.verifyResetPassword(payload),
    onSuccess: () => {
      toast.success("Password updated successfully! Please log in again.");
      navigate("/login");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const beMessage = apiError.response?.data?.message;
      toast.error(beMessage || "Invalid or expired token.");
    },
  });
};
