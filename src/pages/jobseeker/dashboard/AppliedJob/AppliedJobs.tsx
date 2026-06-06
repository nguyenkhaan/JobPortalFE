import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppliedJobItem, { type AppliedJobItemProps } from "./AppliedJobItem";
import DashboardPagination from "../../../../components/ui/DashboardPagination";
import { ApplicationService } from "../../../../services/applicationService";

export default function AppliedJobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["candidate-applied-jobs", currentPage],
    queryFn: () =>
      ApplicationService.getApplications({
        offset: (currentPage - 1) * 8,
        limit: 8,
      }),
  });

  const totalPages = Math.max(1, Math.ceil((data?.totalItems || 0) / 8));

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null); 

  const jobs: Omit<AppliedJobItemProps, "isSelected" | "onSelect">[] =
    data?.items.map((item) => ({
      id: String(item.id),
      logo:
        item.jobPost?.id && item.jobPost?.title
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(item.jobPost.title)}`
          : "https://ui-avatars.com/api/?name=Job",
      role: item.jobPost?.title || "Applied Job",
      type: "Application",
      location: item.jobSeekerProfile?.address || "Remote",
      salary: "Negotiable",
      dateApplied: item.appliedAt
        ? new Date(item.appliedAt).toLocaleString()
        : "N/A",
      status: item.status,
    })) || [];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 text-left animate-fade-in pb-8">
      <div className="flex items-center gap-2 pb-2">
        <h1 className="text-[18px] font-bold text-gray-900">Applied Jobs</h1>
        <span className="text-[15px] font-medium text-gray-400">(589)</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center px-6 py-3.5 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 tracking-wider">
          <div className="flex-1">JOBS</div>
          <div className="w-[180px]">DATE APPLIED</div>
          <div className="w-[120px]">STATUS</div>
          <div className="w-[140px] text-center">ACTION</div>
        </div>

        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <AppliedJobItem
              key={job.id}
              {...job}
              isSelected={selectedJobId === job.id}
              onSelect={() => setSelectedJobId(job.id)}
            />
          ))}
        </div>
      </div>

      <DashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
