import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, PhoneCall } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Button from "../../../components/ui/Button";
import JobLogo from "../../../assets/JobLogo.svg";
import ComboBox from "../../../components/ui/ComboBox";

const languages = [
  { label: "English", value: "english" },
  { label: "Vietnamese", value: "vietnamese" },
];
const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/find-job", label: "Find Job" },
  { path: "/employers", label: "Employers" },
  { path: "/candicates", label: "Candicates" },
  { path: "/pricing", label: "Pricing Plans" },
  { path: "/customer", label: "Customer Supports" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else setHidden(false);
  });
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full border-b border-gray-100 bg-bg-white sticky top-0 z-50"
    >
      <div className="hidden lg:flex justify-between items-center py-2 px-8 bg-gray-50 text-sm text-gray-500 border-gray-100">
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `py-2 border-b-2 transition-colors ${
                  isActive
                    ? "border-primary-500 text-primary-500 font-medium"
                    : "border-transparent text-gray-500 hover:text-primary-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PhoneCall size={16} />
            <span className="font-medium text-gray-900">+84867070087</span>
          </div>
          <ComboBox options={languages} placeholder="English" />
        </div>
      </div>

      <div className="flex justify-between items-center py-4 px-8">
        <Link
          to="/home"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900"
        >
          <span className="text-primary-500 flex items-center">
            <img
              src={JobLogo}
              alt="My Job logo"
              className="w-8 h-8 object-contain"
            />
          </span>
          MyJob
        </Link>

        <div className="hidden lg:flex items-center border border-gray-100 rounded-md px-6 py-2 w-1/3 gap-4">
          <Search className="text-primary-500" size={28} />
          <input
            type="text"
            placeholder="Job title, keyword, company"
            className="flex-1 w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="social"
              className="px-6 py-2 border-primary-100 text-primary-500 hover:bg-primary-50"
            >
              Sign In
            </Button>
          </Link>
          <Button variant="primary" className="px-6 py-2">
            Post A Job
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
