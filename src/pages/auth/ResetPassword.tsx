import { ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import JobLogo from "../../assets/JobLogo.svg";

export default function ResetPassword() {
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

          <form className="flex flex-col gap-5">
            <Input type="password" placeholder="New Password" />
            <Input type="password" placeholder="Confirm Password" />
            <Button variant="primary" fullWidth className="mt-2">
              Reset Password <ArrowRight size={20} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
