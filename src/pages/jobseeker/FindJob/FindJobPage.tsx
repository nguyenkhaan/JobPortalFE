import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardPagination from "../../../components/ui/DashboardPagination";

import JobSearchBar from "./components/JobSearchBar";
import FilterSortBar from "./components/FilterSortBar";
import JobList from "./components/JobList";
import { JobService } from "../../../services/jobService";

export default function FindJobPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [locationKeyword, setLocationKeyword] = useState("");

  const { data, dataUpdatedAt } = useQuery({
    queryKey: ["public-jobs", currentPage, searchKeyword],
    queryFn: () =>
      JobService.getJobs({
        keyword: searchKeyword || undefined,
        offset: (currentPage - 1) * 12,
        limit: 12,
      }),
  });

  const jobs =
    data?.items.map((job) => {
      const salaryText =
        job.salaryMin > 0 && job.salaryMax > 0
          ? `$${job.salaryMin}-$${job.salaryMax}/${job.salaryType.toLowerCase()}`
          : "Negotiable";
      const diffDays = Math.ceil(
        (new Date(job.expiresAt).getTime() - dataUpdatedAt) /
          (1000 * 60 * 60 * 24),
      );

      return {
        id: String(job.id),
        title: job.title,
        type: job.employmentType.replaceAll("_", " "),
        isFeatured: Boolean(job.isFeatured),
        logo: job.employer?.logo || "https://ui-avatars.com/api/?name=Job",
        location: job.employer?.companyName || locationKeyword || "Remote",
        salary: salaryText,
        daysRemaining:
          diffDays > 0 ? `${diffDays} Days Remaining` : "Expired",
      };
    }) || [];

  const totalPages = Math.max(1, Math.ceil((data?.totalItems || 0) / 12));

  const handleToggleSave = (id: string | number) => {
    const stringId = String(id);
    setSavedJobIds(prev => 
      prev.includes(stringId) 
        ? prev.filter(item => item !== stringId) 
        : [...prev, stringId]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white font-sans min-h-screen pb-16">

      <JobSearchBar 
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        locationKeyword={locationKeyword}
        setLocationKeyword={setLocationKeyword}
      />

      <div className="max-w-7xl mx-auto px-8 mt-8">

        <FilterSortBar viewMode={viewMode} setViewMode={setViewMode} />

        <JobList 
          jobs={jobs} 
          viewMode={viewMode} 
          savedJobIds={savedJobIds} 
          onToggleSave={handleToggleSave} 
        />

        <DashboardPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>
    </div>
  );
}
