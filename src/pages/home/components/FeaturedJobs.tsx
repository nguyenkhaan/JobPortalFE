import { Link } from "react-router-dom";
import { ArrowRight, MapPin, DollarSign, Bookmark } from "lucide-react";
import Button from "../../../components/ui/Button";
import { toast } from "sonner";
import { useState } from "react";

const featuredJobs = [
  {
    id: 1,
    logoText: "Up",
    logoColor: "bg-green-500",
    title: "Senior UX Designer",
    type: "Full Time",
    company: "Upwork",
    location: "Dhaka, Bangladesh",
    salary: "$50k - $80k",
    active: false,
  },
  {
    id: 2,
    logoText: "Ap",
    logoColor: "bg-gray-900",
    title: "Software Engineer",
    type: "Remote",
    company: "Apple",
    location: "New York, USA",
    salary: "$100k - $120k",
    active: false,
  },
  {
    id: 3,
    logoText: "Pi",
    logoColor: "bg-red-500",
    title: "Junior Graphic Designer",
    type: "Part Time",
    company: "Pinterest",
    location: "London, UK",
    salary: "$30k - $40k",
    active: false,
  },
  {
    id: 4,
    logoText: "Dr",
    logoColor: "bg-pink-500",
    title: "Product Designer",
    type: "Full Time",
    company: "Dribbble",
    location: "Dhaka, Bangladesh",
    salary: "$40k - $60k",
    active: false,
  },
  {
    id: 5,
    logoText: "Fb",
    logoColor: "bg-blue-600",
    title: "Marketing Officer",
    type: "Full Time",
    company: "Facebook",
    location: "Singapore",
    salary: "$70k - $90k",
    active: false,
  },
];

export default function FeaturedJobs() {
  const [saveJobs, setSaveJobs] = useState<number[]>([]);

  const handleSaveJob = (id: number) => {
    if (saveJobs.includes(id)) {
      setSaveJobs(saveJobs.filter((jobId) => jobId != id));
      toast.info("Job removed from saved jobs");
    } else {
      setSaveJobs([...saveJobs, id]);
      toast.success("Job saved successfully");
    }
  };
  return (
    <section className="w-full py-16 lg:py-24 px-8 bg-bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured job
          </h2>
          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-2 text-primary-500 font-medium hover:underline"
          >
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className={`group flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-xl border transition-all duration-300 ${
                job.active
                  ? "border-primary-500 shadow-md ring-1 ring-primary-500"
                  : "border-gray-100 hover:border-primary-500 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0 ${job.logoColor}`}
                >
                  {job.logoText}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
                      {job.title}
                    </h3>
                    <span className="px-2.5 py-1 bg-primary-50 text-primary-500 text-xs font-medium rounded-full">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} /> {job.salary}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                <button
                  onClick={() => handleSaveJob(job.id)}
                  className="p-3 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Bookmark size={20} />
                </button>
                <Button
                  variant={job.active ? "primary" : "social"}
                  className={`flex-1 md:flex-none px-6 py-2.5 ${!job.active && "border-primary-100 text-primary-500 bg-primary-50/50 hover:bg-primary-50"}`}
                >
                  Apply Now <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
