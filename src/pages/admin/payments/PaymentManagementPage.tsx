import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type PaymentStatus } from "./components/StatusBadge";
import PaymentDetailDrawer, {
  type Payment,
} from "./components/PaymentDetailDrawer";
import PaymentFilterBar from "./components/PaymentFilterBar";
import PaymentTable from "./components/PaymentTable";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import TablePagination from "../../../components/ui/TablePagination";
import { AdminService } from "../../../services/adminService";
import type { AdminPaymentRecord } from "../../../types/admin";

const mapPaymentStatus = (
  status: AdminPaymentRecord["status"],
): PaymentStatus => {
  switch (status) {
    case "COMPLETED":
      return "Completed";
    case "FAILED":
      return "Failed";
    case "CANCELED":
      return "Canceled";
    default:
      return "Pending";
  }
};

const mapUiStatusToApiStatus = (status: PaymentStatus) => {
  switch (status) {
    case "Completed":
      return "COMPLETED";
    case "Failed":
      return "FAILED";
    case "Canceled":
      return "CANCELED";
    default:
      return "PENDING";
  }
};

const mapPayment = (payment: AdminPaymentRecord): Payment => ({
  id: String(payment.id),
  user: payment.employerName || "Employer",
  email: payment.payerEmail || "Unknown",
  plan: payment.planName,
  amount: payment.cost,
  date: new Date(payment.createdAt).toLocaleString(),
  status: mapPaymentStatus(payment.status),
  paymentMethod: payment.method || "N/A",
  transactionRef: payment.transactionRef || "N/A",
});

export default function PaymentManagementPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "All">(
    "All",
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    id: string | null;
    newStatus: PaymentStatus | null;
  }>({ isOpen: false, id: null, newStatus: null });

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-payments",
      currentPage,
      itemsPerPage,
      searchQuery,
      statusFilter,
    ],
    queryFn: () =>
      AdminService.getPayments({
        page: currentPage - 1,
        size: itemsPerPage,
        search: searchQuery || undefined,
        status:
          statusFilter === "All"
            ? undefined
            : mapUiStatusToApiStatus(statusFilter),
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      id,
      newStatus,
    }: {
      id: number;
      newStatus: PaymentStatus;
    }) =>
      AdminService.updatePaymentStatus(id, mapUiStatusToApiStatus(newStatus)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
      toast.success("Payment status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update payment status");
    },
  });

  const payments = useMemo(
    () => (data?.content || []).map(mapPayment),
    [data],
  );

  const totalPages = Math.max(1, data?.totalPages || 1);

  const selectedPayment = useMemo(() => {
    return payments.find((p) => p.id === selectedPaymentId) || null;
  }, [payments, selectedPaymentId]);

  const handleUpdateStatus = (id: string, newStatus: PaymentStatus) => {
    setConfirmConfig({ isOpen: true, id, newStatus });
    setActiveDropdownId(null);
  };

  const executeStatusUpdate = () => {
    const { id, newStatus } = confirmConfig;
    if (id && newStatus) {
      updateStatusMutation.mutate({ id: Number(id), newStatus });
    }
    setConfirmConfig({ isOpen: false, id: null, newStatus: null });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage employer transactions
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <PaymentFilterBar
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          statusFilter={statusFilter}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        />

        <PaymentTable
          payments={payments}
          onViewDetail={setSelectedPaymentId}
          activeDropdownId={activeDropdownId}
          onToggleDropdown={setActiveDropdownId}
          onUpdateStatus={handleUpdateStatus}
          isLoading={isLoading}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      <PaymentDetailDrawer
        isOpen={!!selectedPaymentId}
        onClose={() => setSelectedPaymentId(null)}
        payment={selectedPayment}
        onUpdateStatus={handleUpdateStatus}
      />

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title="Update Payment Status"
        message={`Are you sure you want to mark transaction ${confirmConfig.id} as ${confirmConfig.newStatus}?`}
        onConfirm={executeStatusUpdate}
        onCancel={() =>
          setConfirmConfig({ isOpen: false, id: null, newStatus: null })
        }
        confirmText={`Mark as ${confirmConfig.newStatus}`}
        isDanger={confirmConfig.newStatus === "Failed"}
      />
    </div>
  );
}
