import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GoogleLogo from "../../assets/GooogleLogo.svg";

export default function Login() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
        <p className="text-gray-500">
          Don't have account?{" "}
          <Link
            to="/register"
            className="text-primary-500 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>

      <form className="flex flex-col gap-5">
        <Input type="email" placeholder="Email address" />
        <Input type="password" placeholder="Password" />

        <div className="flex items-center justify-between -mt-1">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span>Remember Me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-primary-500 font-medium hover:underline"
          >
            Forgot password
          </Link>
        </div>
        <Button variant="primary" fullWidth className="mt-2">
          Sign In <ArrowRight size={20} />
        </Button>
      </form>
      <div className="flex items-center gap-4 my-6 ">
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
