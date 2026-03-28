// src/layouts/EmployerSetupLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import SetupHeader from "../pages/Employer/AccountSetup/components/SetupHeader";
import SetupStepper from "../pages/Employer/AccountSetup/components/SetupStepper";
import SetupFooter from "../pages/Employer/AccountSetup/components/SetupFooter";

export default function EmployerSetupLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  let progress = 0;
  let currentStepIndex = 0;

  if (currentPath.includes("company")) {
    progress = 0;
    currentStepIndex = 0;
  } else if (currentPath.includes("founding")) {
    progress = 25;
    currentStepIndex = 1;
  } else if (currentPath.includes("social")) {
    progress = 50;
    currentStepIndex = 2;
  } else if (currentPath.includes("contact")) {
    progress = 75;
    currentStepIndex = 3;
  } else if (currentPath.includes("success")) {
    progress = 100;
    currentStepIndex = 4;
  }
  const isSuccessPage = currentPath.includes("success");
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <SetupHeader progress={progress} isSuccessPage={isSuccessPage} />
      <main className="flex-1 flex flex-col items-center pt-8 pb-24 px-4">
        <SetupStepper
          currentStepIndex={currentStepIndex}
          isSuccessPage={isSuccessPage}
        />
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
      <SetupFooter />
    </div>
  );
}
