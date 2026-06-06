import { ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { type EmployerProfile, type ApprovalStatus } from "./types";

interface EmployerTableProps {
  employers: EmployerProfile[];
  onReview: (id: string) => void;
  isLoading?: boolean;
}

const renderStatusBadge = (status: ApprovalStatus) => {
  switch (status) {
    case "Approved":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 size={14} /> Approval
        </span>
      );
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock size={14} /> Pending
        </span>
      );
    case "Rejected":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border-red-200">
          <XCircle size={14} /> Rejected
        </span>
      );
    default:
      return null;
  }
};

export default function EmployerTable({
  employers,
  onReview,
  isLoading = false,
}: EmployerTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left border-collapse min-w-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
            <th className="px-6 py-4">Company Name</th>
            <th className="px-6 py-4">Industry</th>
            <th className="px-6 py-4">Registration Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Loading employers...
              </td>
            </tr>
          ) : employers.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No employers found in this category
              </td>
            </tr>
          ) : (
            employers.map((employer) => (
              <tr
                key={employer.id}
                className="hover:bg-blue-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={employer.logoUrl}
                      alt=""
                      className="w-10 h-10 rounded-md object-cover border border-gray-200"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {employer.companyName}
                      </p>
                      <p className="text-xs text-gray-500">{employer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {employer.industry}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {employer.registrationDate}
                </td>
                <td className="px-6 py-4">
                  {renderStatusBadge(employer.status)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onReview(employer.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                  >
                    Review <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
