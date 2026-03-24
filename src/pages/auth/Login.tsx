import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authService } from "../../services/authService";
import type { LoginRequest } from "../../types/auth";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GoogleLogo from "../../assets/GooogleLogo.svg";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handle when click sign in
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    try {
      setIsLoading(true);
      const payload: LoginRequest = { email, password };

      const data = await authService.login(payload);
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);

      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message || "Login faied, Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

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
        <Button
          variant="primary"
          fullWidth
          className="mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Sign In <ArrowRight size={20} />
            </>
          )}
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
