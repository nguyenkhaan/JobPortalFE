import { Briefcase, Building2, Users } from "lucide-react";

const statsData = [
  {
    id: 1,
    count: "175,324",
    label: "Live Job",
    icon: Briefcase,
    active: false,
  },
  {
    id: 2,
    count: "97,354",
    label: "Companies",
    icon: Building2,
    active: false,
  },
  {
    id: 3,
    count: "3,847,154",
    label: "Candidates",
    icon: Users,
    active: false,
  },
  {
    id: 4,
    count: "7,532",
    label: "New Jobs",
    icon: Briefcase,
    active: false,
  },
];

export default function Stats() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`flex items-center gap-5 p-6 rounded-xl shadow-sm transition-transform hover:-translate-y-1 duration-300 ${
                stat.active
                  ? "bg-primary-500 text-bg-white"
                  : "bg-bg-white text-gray-900"
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  stat.active
                    ? "bg-bg-white/20 text-bg-white"
                    : "bg-primary-50 text-primary-500"
                }`}
              >
                <Icon size={32} strokeWidth={1.5} />
              </div>

              <div>
                <h3
                  className={`text-2xl font-bold mb-1 ${
                    stat.active ? "text-bg-white" : "text-gray-900"
                  }`}
                >
                  {stat.count}
                </h3>
                <p
                  className={`text-sm ${
                    stat.active ? "text-bg-white/80" : "text-gray-500"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
