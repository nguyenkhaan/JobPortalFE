import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthService } from "../../services/authService";
import type { ResetPasswordRequest } from "../../types/auth";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import JobLogo from "../../assets/JobLogo.svg";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or expired token!");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter both password fields!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Confirm password does not match!");
      return;
    }

    try {
      setIsLoading(true);
      const payload: ResetPasswordRequest = {
        token,
        newPassword,
        confirmPassword,
      };

      const message = await AuthService.resetPassword(payload);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Reset password failed. Please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-bg-white font-sans">
      <div className="w-full flex justify-center pt-12 pb-6">
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="text-primary-500 text-2xl flex items-center">
            <img
              src={JobLogo}
              alt="My Job logo"
              className="w-8 h-8 object-contain"
            />
          </span>
          MyJob
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 pb-24">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Reset Password
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Please choose a password that hasn't been used before
          </p>

          <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
            <Button
              variant="primary"
              fullWidth
              className="mt-2 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Reset Password <ArrowRight size={20} />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
