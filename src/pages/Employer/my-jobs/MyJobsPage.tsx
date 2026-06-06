import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MyJobsTable, { type JobItem } from "./components/MyJobsTable";
import Pagination from "../../../components/ui/Pagination";
import PromoteJobModal from "./components/PromoteJobModal";
import CustomDropdown from "../../../components/ui/DropDown";
import { EmployerService } from "../../../services/employerService";
import { JobService } from "../../../services/jobService";
import type { JobResponse } from "../../../types/employer";

const ITEMS_PER_PAGE = 6;

const filterOptions = [
  { label: "All Jobs", value: "All Jobs" },
  { label: "Active", value: "Active" },
  { label: "Expire", value: "Expire" },
];

export default function MyJobsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<string>("All Jobs");
  const [currentPage, setCurrentPage] = useState(1);

  const [promoteModalData, setPromoteModalData] = useState<{
    isOpen: boolean;
    jobId: string;
    jobTitle: string;
  }>({
    isOpen: false,
    jobId: "",
    jobTitle: "",
  });

  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["employer-jobs", currentPage, filter],
    queryFn: () =>
      EmployerService.getRecentJobs({
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      }),
  });

  const updateJobMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Record<string, unknown>;
    }) => JobService.updateJob(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["employerDashboard"] });
    },
  });

  const currentJobs = useMemo(() => {
    const getDateInfo = (job: JobResponse) => {
      const expiresAt = new Date(job.expiresAt);
      const diffDays = Math.ceil(
        (expiresAt.getTime() - dataUpdatedAt) / (1000 * 60 * 60 * 24),
      );

      return diffDays > 0
        ? `${diffDays} days remaining`
        : new Date(job.expiresAt).toLocaleDateString();
    };

    const mapped =
      data?.items.map(
        (job): JobItem => ({
          id: String(job.id),
          title: job.title,
          type: job.employmentType.replaceAll("_", " "),
          dateInfo: getDateInfo(job),
          status: job.status === "OPEN" ? "Active" : "Expire",
          applications: job.applicationCount || 0,
          isFeatured: job.isFeatured,
          isHighlighted: job.isHighlighted,
        }),
      ) || [];

    if (filter === "All Jobs") {
      return mapped;
    }

    return mapped.filter((job) => job.status === filter);
  }, [data, dataUpdatedAt, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil((data?.totalItems || 0) / ITEMS_PER_PAGE),
  );

  const handleFilterChange = (val: string) => {
    setFilter(val);
    setCurrentPage(1);
  };

  const handleViewApplications = (id: string) => {
    navigate(`/employer/applications?jobId=${id}`);
  };

  const handlePromoteClick = (id: string) => {
    const job = currentJobs.find((j) => j.id === id);
    if (job) {
      setPromoteModalData({ isOpen: true, jobId: job.id, jobTitle: job.title });
    }
  };

  const handleConfirmPromote = (plan: string) => {
    updateJobMutation.mutate({
      id: Number(promoteModalData.jobId),
      payload: {
        isFeatured: plan === "featured",
        isHighlighted: plan === "highlight",
      },
    });
    setPromoteModalData((prev) => ({ ...prev, isOpen: false }));
    toast.success(`Successfully promoted job as ${plan.toUpperCase()}`);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/employer/my-jobs/${id}`);
  };

  const handleMarkExpired = (id: string) => {
    updateJobMutation.mutate({
      id: Number(id),
      payload: {
        status: "CLOSED",
      },
    });
    toast.success("Job marked as expired!");
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-900">
          My Jobs{" "}
          <span className="text-gray-400 font-medium">
            ({currentJobs.length})
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Job status</span>
          <div className="w-36">
            <CustomDropdown
              options={filterOptions}
              value={filter}
              onChange={handleFilterChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <MyJobsTable
        jobs={currentJobs}
        onViewApplications={handleViewApplications}
        onPromote={handlePromoteClick}
        onViewDetail={handleViewDetail}
        onMarkExpired={handleMarkExpired}
        isLoading={isLoading}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <PromoteJobModal
        isOpen={promoteModalData.isOpen}
        jobTitle={promoteModalData.jobTitle}
        onClose={() =>
          setPromoteModalData((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={handleConfirmPromote}
      />
    </div>
  );
}
