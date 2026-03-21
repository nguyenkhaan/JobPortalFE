import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ComboBox from "../../components/home/ComboBox";
import GoogleLogo from "../../assets/GooogleLogo.svg";

const accountTypes = [
  { label: "Employers", value: "employers" },
  { label: "Job Seekers", value: "job_seekers" },
];

export default function Register() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-3xl font-bold text-gray-900 ">Create account</h1>

        <div className="relative">
          <ComboBox options={accountTypes} placeholder="Employers" />
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

      <form className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <Input type="text" placeholder="Full Name" />
          <Input type="text" placeholder="Username" />
        </div>
        <Input type="email" placeholder="Email address" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />

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
        <Button variant="primary" fullWidth className="mt-2">
          Create Account <ArrowRight size={20} />
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
