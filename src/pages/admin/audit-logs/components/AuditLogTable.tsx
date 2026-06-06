import { Eye } from "lucide-react";
import { type AuditLog, type ActionType } from "./types";

interface AuditLogTableProps {
  logs: AuditLog[];
  selectedIds: string[];
  onToggleSelectAll: (checked: boolean) => void;
  onToggleSelectRow: (id: string, checked: boolean) => void;
  onViewDetail: (log: AuditLog) => void;
  isLoading?: boolean;
}

const getActionColor = (action: ActionType) => {
  switch (action) {
    case "Create":
    case "Approve":
      return "bg-green-50 text-green-700 border-green-200";
    case "Delete":
    case "Reject":
      return "bg-red-50 text-red-700 border-red-200";
    case "Update":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function AuditLogTable({
  logs,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectRow,
  onViewDetail,
  isLoading = false,
}: AuditLogTableProps) {
  const isAllSelected = logs.length > 0 && selectedIds.length === logs.length;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < logs.length;

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left border-collapse min-w-250">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
            <th className="px-6 py-4 w-12">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={(e) => onToggleSelectAll(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
            </th>
            <th className="px-6 py-4">Timestamp & IP</th>
            <th className="px-6 py-4">Actor (User)</th>
            <th className="px-6 py-4">Action</th>
            <th className="px-6 py-4">Entity</th>
            <th className="px-6 py-4 text-right">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                Loading audit logs...
              </td>
            </tr>
          ) : logs.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                No logs found matching your filters.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr
                key={log.id}
                className={`hover:bg-blue-50/30 transition-colors ${selectedIds.includes(log.id) ? "bg-blue-50/50" : ""}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(log.id)}
                    onChange={(e) =>
                      onToggleSelectRow(log.id, e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {log.createdAt}
                  </p>
                  <p className="text-xs text-gray-500">{log.ipAddress}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-900">{log.email}</p>
                  <p className="text-xs text-gray-500 font-mono">
                    {log.userId}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider ${getActionColor(log.action)}`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {log.entityType}
                  </p>
                  <p className="text-xs text-gray-500 font-mono truncate max-w-37.5">
                    {log.entityId}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onViewDetail(log)}
                    className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="View JSON Payload"
                  >
                    <Eye size={18} />
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
