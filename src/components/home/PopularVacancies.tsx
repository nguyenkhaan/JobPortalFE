// src/components/PopularVacancies.tsx
import { Link } from "react-router-dom";

const vacancies = [
  { title: "Anesthesiologists", open: "45,904 Open Positions", active: false },
  { title: "Surgeons", open: "50,364 Open Positions", active: false },
  {
    title: "Obstetricians-Gynecologists",
    open: "4,339 Open Positions",
    active: false,
  },
  { title: "Orthodontists", open: "20,079 Open Positions", active: false },
  {
    title: "Maxillofacial Surgeons",
    open: "74,875 Open Positions",
    active: false,
  },
  { title: "Software Developer", open: "43,359 Open Positions", active: false },
  { title: "Psychiatrists", open: "18,599 Open Positions", active: false },
  { title: "Data Scientist", open: "28,200 Open Positions", active: false },
  { title: "Financial Manager", open: "61,391 Open Positions", active: false },
  {
    title: "Management Analysis",
    open: "93,046 Open Positions",
    active: false,
  },
  { title: "IT Manager", open: "50,963 Open Positions", active: false },
  {
    title: "Operations Research Analysis",
    open: "16,627 Open Positions",
    active: false,
  },
];

export default function PopularVacancies() {
  return (
    <section className="w-full py-16 px-8 bg-bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Most Popular Vacancies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
          {vacancies.map((job, index) => (
            <Link to="#" key={index} className="group flex flex-col gap-1">
              <h3
                className={`text-lg font-medium transition-colors ${
                  job.active
                    ? "text-primary-500 border-b border-primary-500 w-fit pb-0.5"
                    : "text-gray-900 group-hover:text-primary-500"
                }`}
              >
                {job.title}
              </h3>
              <p className="text-sm text-gray-500">{job.open}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
