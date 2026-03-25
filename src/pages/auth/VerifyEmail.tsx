import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import JobLogo from "../../assets/JobLogo.svg";

// import { AuthService } from "../../services/authService";
export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please enter your verification code!");
      return;
    }

    try {
      setIsLoading(true);
      // await AuthService.verifyEmail({ email, code });

      toast.success("Verify account successfully! You can log in now.");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Verification failed, please check your code!");
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
            Email Verification
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            We've sent a verification to{" "}
            <span className="font-medium text-gray-900">{email}</span> to verify
            your email address and activate your account.
          </p>
          <form onSubmit={handleVerify} className="flex flex-col gap-5">
            <Input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
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
                  Verify My Account <ArrowRight size={20} />
                </>
              )}
            </Button>
          </form>
          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              Didn't receive any code?{" "}
              <button
                type="button"
                onClick={() =>
                  toast.success("Code has been resent to your email!")
                }
                className="text-primary-500 font-medium hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
