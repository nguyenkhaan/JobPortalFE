import { Outlet } from "react-router-dom";
import briefcaseIcon from "../assets/briefcaseIcon.svg";
import BuildingsIcon from "../assets/buildingsIcon.svg";
import JobLogo from "../assets/JobLogo.svg";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full font-sans bg-bg-white relative overflow-hidden">
      <div className="flex w-full min-h-screen relative z-10">
        <div className="w-full lg:w-1/2 flex flex-col justify-start items-center p-8 bg-transparent">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 mb-20 text-xl font-bold text-gray-900">
              <span className="text-primary-500 text-2xl">
                <img
                  src={JobLogo}
                  alt="My Job logo"
                  className="w-8 h-8 object-contain"
                />
              </span>
              MyJob
            </div>
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 flex-col justify-center items-center relative p-12 overflow-hidden">
          <img
            src="/Background.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="z-10 max-w-lg text-white relative">
            <h2 className="text-4xl font-bold mb-12 leading-tight">
              Over 1,756,324 candidates <br /> waiting for good employees
            </h2>
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm w-fit">
                  <img
                    src={briefcaseIcon}
                    alt="briefcase icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-white">1,756,324</div>
                <div className="text-sm text-gray-200">Live Job</div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm w-fit">
                  <img
                    src={BuildingsIcon}
                    alt="buildings icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-white">97,354</div>
                <div className="text-sm text-gray-200">Companies</div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm w-fit">
                  <img
                    src={briefcaseIcon}
                    alt="briefcase icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="text-xl font-bold text-white">7,532</div>
                <div className="text-sm text-gray-200">New Jobs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
