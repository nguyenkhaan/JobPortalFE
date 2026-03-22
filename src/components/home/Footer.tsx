import { Link } from "react-router-dom";
import JobLogo from "../../assets/JobLogo.svg";
import SocialMediaIcon from "../../assets/Social_Media.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-2xl font-bold text-bg-white mb-6">
            <img
              src={JobLogo}
              alt="My Job logo"
              className="w-8 h-8 object-contain brightness-0 invert"
            />
            MyJob
          </div>
          <p className="mb-4">
            Call now:{" "}
            <span className="text-bg-white font-medium">+84-867-070-087</span>
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            University of Information and Technology, KP.6 Linh Trung, T.P Ho
            Chi Minh
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-bg-white font-medium text-lg mb-2">Quick Link</h3>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            About
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Contact
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Pricing
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Blog
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-bg-white font-medium text-lg mb-2">Candidate</h3>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Browse Jobs
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Browse Employers
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Candidate Dashboard
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Saved Jobs
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-bg-white font-medium text-lg mb-2">Employers</h3>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Post a Job
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Browse Candidates
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Employers Dashboard
          </Link>
          <Link to="#" className="hover:text-primary-500 transition-colors">
            Applications
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-sm flex justify-between items-center text-gray-500">
        <p>© 2026 MyJob - Web Job Portal. All rights reserved.</p>
        <div className="flex gap-4">
          <img src={SocialMediaIcon} />
        </div>
      </div>
    </footer>
  );
}
