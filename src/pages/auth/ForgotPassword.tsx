import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ForgotPasswordRequest } from "../../types/auth";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GoogleLogo from "../../assets/GooogleLogo.svg";
import { authService } from "../../services/authService";

export default function ForgotPassowrd() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassowrd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    try {
      setIsLoading(false);
      const payload: ForgotPasswordRequest = { email };

      const message = await authService.forgotPassword(payload);
      toast.success(message);
      setEmail("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Request failed, please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Forgot Password
        </h1>
        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <p>
            Go back to{" "}
            <Link
              to="/login"
              className="text-primary-500 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
          <p>
            Don't have account{" "}
            <Link
              to="/register"
              className="text-primary-500 font-medium hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
      <form onSubmit={handleForgotPassowrd} className="flex flex-col gap-5">
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Button
          variant="primary"
          fullWidth
          className="mt-2 flex items-center justify-center gap-2"
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
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-100"></div>
        <span className="text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-100"></div>
      </div>
      <div className="flex gap-4">
        <Button variant="social" fullWidth>
          <img src={GoogleLogo} />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
