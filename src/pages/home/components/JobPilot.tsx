import { UserPlus, CloudUpload, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Create account",
    description:
      "Aliquam facilisis egestas sapien, nec aliquet magna vestibulum et.",
    active: false,
  },
  {
    id: 2,
    icon: CloudUpload,
    title: "Upload CV/Resume",
    description:
      "Curabitur sit amet maximus ligula. Eleifend vel eleifend non.",
    active: false,
  },
  {
    id: 3,
    icon: Search,
    title: "Find suitable job",
    description: "Phasellus quis eleifend ex. Morbi placerat nisl non urna.",
    active: false,
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Apply job",
    description:
      "Curabitur sit amet maximus ligula. Eleifend vel eleifend non.",
    active: false,
  },
];

export default function JobPilot() {
  return (
    <section className="w-full py-16 lg:py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          How jobpilot work
        </h2>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0 border-t-2 border-dashed border-gray-200 z-0"></div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`relative z-10 flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 ${
                  step.active
                    ? "bg-bg-white shadow-lg"
                    : "bg-transparent hover:bg-bg-white hover:shadow-md"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm ${
                    step.active
                      ? "bg-primary-500 text-bg-white"
                      : "bg-bg-white text-primary-500"
                  }`}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Nội dung text */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
