export type ApiResponse<T> = {
  isSuccess: boolean;
  value: T | null;
  errorMessage: string | null;
};

export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  role?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  role: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
