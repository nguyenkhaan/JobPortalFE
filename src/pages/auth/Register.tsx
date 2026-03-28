import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ComboBox, { type OptionType } from "../../components/ui/ComboBox";
import GoogleLogo from "../../assets/GooogleLogo.svg";
import React, { useState } from "react";
import { toast } from "sonner";
import type { RegisterRequest } from "../../types/auth";
import { AuthService } from "../../services/authService";

const accountTypes = [
  { label: "Employers", value: "employers" },
  { label: "Job Seekers", value: "job_seekers" },
];

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState<OptionType>(accountTypes[0]);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !email || !password) {
      toast.error("Please enter all required information!");
    }
    if (password !== confirmPassowrd) {
      toast.error("Confirm password does not match");
      return;
    }
    try {
      setIsLoading(true);

      const payload: RegisterRequest = {
        role: role.value as string,
        fullName,
        username,
        email,
        password,
      };
      await AuthService.register(payload);
      toast.success("Create a new account successfully! ");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Register failed, Please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-3xl font-bold text-gray-900 ">Create account</h1>

        <div className="relative">
          <ComboBox
            options={accountTypes}
            placeholder="Employers"
            onChange={(option) => setRole(option)}
          />
        </div>
      </div>
      <p className="text-gray-500 mb-8">
        Already have account?{" "}
        <Link
          to="/login"
          className="text-primary-500 font-medium hover:underline"
        >
          Log In
        </Link>
      </p>

      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassowrd}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />

        <label className="flex items-start gap-2 cursor-pointer text-gray-600 -mt-1">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <span className="text-sm">
            I've read and agree with your{" "}
            <Link
              to="#"
              className="text-primary-500 font-medium hover:underline"
            >
              Terms of services
            </Link>
          </span>
        </label>
        <Button
          variant="primary"
          fullWidth
          className="mt-2 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {" "}
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Create Account <ArrowRight size={20} />
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
