import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GoogleLogo from "../../assets/GooogleLogo.svg";

export default function ForgotPassowrd() {
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
      <form className="flex flex-col gap-5">
        <Input type="email" placeholder="Email address" />
        <Button variant="primary" fullWidth className="mt-2">
          Reset Password <ArrowRight size={20} />
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
