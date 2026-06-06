import { Edit2, Trash2 } from "lucide-react";
import { type Industry } from "./types";

interface IndustryTableProps {
  industries: Industry[];
  onEdit: (industry: Industry) => void;
  onDelete: (industry: Industry) => void;
  isLoading?: boolean;
}

export default function IndustryTable({
  industries,
  onEdit,
  onDelete,
  isLoading = false,
}: IndustryTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left border-collapse min-w-175">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
            <th className="px-6 py-4 w-24">ID</th>
            <th className="px-6 py-4">Industry Name</th>
            <th className="px-6 py-4">Linked Jobs</th>
            <th className="px-6 py-4">Created Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Loading industries...
              </td>
            </tr>
          ) : industries.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No industries found.
              </td>
            </tr>
          ) : (
            industries.map((industry) => (
              <tr
                key={industry.id}
                className="hover:bg-blue-50/50 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-mono text-gray-500">
                  {industry.id}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900">
                    {industry.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      industry.jobCount > 0
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {industry.jobCount} Jobs
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {industry.createdAt}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(industry)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(industry)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
