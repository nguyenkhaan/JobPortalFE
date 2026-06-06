import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  CheckCircle2,
  XCircle,
  ArrowUpCircle,
  Eye,
  XSquare,
  Users,
} from "lucide-react";

export interface JobItem {
  id: string;
  title: string;
  type: string;
  dateInfo: string;
  status: "Active" | "Expire";
  applications: number;
  isFeatured?: boolean;
  isHighlighted?: boolean;
}

interface MyJobsTableProps {
  jobs: JobItem[];
  onViewApplications: (id: string) => void;
  onPromote: (id: string) => void;
  onViewDetail: (id: string) => void;
  onMarkExpired: (id: string) => void;
  isLoading?: boolean;
}

export default function MyJobsTable({
  jobs,
  onViewApplications,
  onPromote,
  onViewDetail,
  onMarkExpired,
  isLoading = false,
}: MyJobsTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
      ref={tableRef}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4">JOBS</th>
              <th className="px-6 py-4">STATUS</th>
              <th className="px-6 py-4">APPLICATIONS</th>
              <th className="px-6 py-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  Loading jobs...
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            ) : jobs.map((job) => {
              const rowClass = job.isHighlighted
                ? "bg-amber-50/50 hover:bg-amber-100/50 border-l-4 border-l-amber-400 transition-colors group"
                : "hover:bg-blue-50/30 border-l-4 border-l-transparent transition-colors group";

              return (
                <tr key={job.id} className={rowClass}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{job.title}</p>
                      {job.isFeatured && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 rounded border border-blue-200">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {job.type} &bull; {job.dateInfo}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {job.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border bg-green-50 border-green-200 text-sm font-medium text-green-700">
                        <CheckCircle2 size={16} /> {job.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border bg-red-50 border-red-200 text-sm font-medium text-red-700">
                        <XCircle size={16} /> {job.status}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Users size={16} className="text-gray-400" />
                      {job.applications} Applications
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 relative">
                      <button
                        onClick={() => onViewApplications(job.id)}
                        className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 font-semibold text-sm rounded-md transition-colors"
                      >
                        View Applications
                      </button>

                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === job.id ? null : job.id,
                          )
                        }
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openDropdownId === job.id && (
                        <div className="absolute right-0 top-12 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                          <button
                            onClick={() => {
                              onPromote(job.id);
                              setOpenDropdownId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <ArrowUpCircle
                              size={16}
                              className="text-blue-500"
                            />
                            Promote Job
                          </button>
                          <button
                            onClick={() => {
                              onViewDetail(job.id);
                              setOpenDropdownId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={16} className="text-gray-400" /> View
                            Detail
                          </button>
                          {job.status === "Active" && (
                            <button
                              onClick={() => {
                                onMarkExpired(job.id);
                                setOpenDropdownId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <XSquare size={16} /> Make it Expire
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
