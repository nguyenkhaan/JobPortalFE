import { User, Building, Globe, AtSign } from "lucide-react";
const steps = [
  { path: "company", label: "Company Info", icon: User },
  { path: "fouding", label: "Fouding Info", icon: Building },
  { path: "social", label: "Social Media Profile", icon: Globe },
  { path: "contact", label: "Contact", icon: AtSign },
];

interface SetupStepperProps {
  currentStepIndex: number;
  isSuccessPage: boolean;
}

export default function SetupStepper({
  currentStepIndex,
  isSuccessPage,
}: SetupStepperProps) {
  if (isSuccessPage) return null;
  return (
    <div className="min-w-3xl mb-12 flex border-b border-gray-200">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStepIndex == index;
        const isPast = currentStepIndex > index;
        return (
          <div
            key={step.path}
            className={`flex-1 items-center justify-center gap-2 pb-4 border-b-2 font-medium transition-colors ${
              isActive
                ? "border-primary-500 text-primary-500"
                : isPast
                  ? "border-transparent text-gray-900"
                  : "border-transparent text-gray-400"
            }`}
          >
            <div className="flex flex-col-2 items-center justify-center gap-2">
              <Icon size={18} />
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
