import { ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import JobLogo from "../../assets/JobLogo.svg";

export default function VerifyEmail() {
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
            <span className="font-medium text-gray-900">example@gmail.com</span>{" "}
            to verify your email address and activate your account.
          </p>
          <form className="flex flex-col gap-5">
            <Input type="text" placeholder="Verification Code" />

            <Button variant="primary" fullWidth className="mt-2">
              Verify My Account <ArrowRight size={20} />
            </Button>
          </form>
          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              Didn't receive any code?{" "}
              <button
                type="button"
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
