import { Eye, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import StatusBadge, { type PaymentStatus } from "./StatusBadge";
import { type Payment } from "./PaymentDetailDrawer";

interface PaymentTableProps {
  payments: Payment[];
  onViewDetail: (id: string) => void;
  activeDropdownId: string | null;
  onToggleDropdown: (id: string | null) => void;
  onUpdateStatus: (id: string, newStatus: PaymentStatus) => void;
  isLoading?: boolean;
}

export default function PaymentTable({
  payments,
  onViewDetail,
  activeDropdownId,
  onToggleDropdown,
  onUpdateStatus,
  isLoading = false,
}: PaymentTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left border-collapse min-w-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
            <th className="px-6 py-4">Transaction</th>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Plan</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                Loading payments...
              </td>
            </tr>
          ) : payments.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                No transaction found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-blue-50/50 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900">
                  {payment.id}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-900">
                    {payment.user}
                  </p>
                  <p className="text-xs text-gray-500">{payment.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {payment.plan}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {payment.date}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-6 py-4 text-right relative">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewDetail(payment.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() =>
                          onToggleDropdown(
                            activeDropdownId === payment.id ? null : payment.id,
                          )
                        }
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeDropdownId === payment.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-20 animate-in zoom-in-95">
                          <button
                            onClick={() =>
                              onUpdateStatus(payment.id, "Completed")
                            }
                            disabled={payment.status === "Completed"}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-700"
                          >
                            <CheckCircle2 size={16} /> Mark Completed
                          </button>
                          <button
                            onClick={() => onUpdateStatus(payment.id, "Failed")}
                            disabled={payment.status === "Failed"}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-700"
                          >
                            <XCircle size={16} /> Mark Failed
                          </button>
                        </div>
                      )}
                    </div>
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
