import { useMemo, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  type AuditLog,
  type ActionType,
  type EntityType,
} from "./components/types";
import AuditLogFilterBar from "./components/AuditLogFilterBar";
import LogDetailModal from "./components/LogDetailModal";
import TablePagination from "../../../components/ui/TablePagination";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import AuditLogTable from "./components/AuditLogTable";
import { AdminService } from "../../../services/adminService";
import type { AdminAuditRecord } from "../../../types/admin";

const mapActionType = (value: string): ActionType => {
  switch (value) {
    case "CREATE":
      return "Create";
    case "DELETE":
      return "Delete";
    default:
      return "Update";
  }
};

const mapEntityType = (value: string): EntityType => {
  switch (value) {
    case "User":
    case "JobPost":
    case "Payment":
    case "System":
      return value;
    default:
      return "EmployerProfile";
  }
};

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<ActionType | "All">("All");
  const [entityFilter, setEntityFilter] = useState<EntityType | "All">("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [bulkDelete, setBulkDelete] = useState(false);
  const [clearOld, setClearOld] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-audit-logs",
      searchQuery,
      actionFilter,
      entityFilter,
      startDate,
      endDate,
      currentPage,
      itemsPerPage,
    ],
    queryFn: () =>
      AdminService.getAuditLogs({
        search: searchQuery || undefined,
        actionType: actionFilter === "All" ? undefined : actionFilter.toUpperCase(),
        entityName:
          entityFilter === "All"
            ? undefined
            : entityFilter === "EmployerProfile"
              ? "EmploymentProfile"
              : entityFilter,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      }),
  });

  const currentItems = useMemo(() => {
    const mapLog = (log: AdminAuditRecord): AuditLog => ({
      id: String(log.id),
      createdAt: new Date(log.eventTime).toLocaleString(),
      userId: log.actorUserId ? String(log.actorUserId) : "N/A",
      email: log.actorEmail || "Unknown",
      action: mapActionType(log.actionType),
      entityType: mapEntityType(log.entityName),
      entityId: String(log.recordId),
      ipAddress: "N/A",
      description: `${log.actionType} ${log.entityName} #${log.recordId}`,
    });

    return (data?.items || []).map(mapLog);
  }, [data]);

  const totalPages = Math.max(
    1,
    Math.ceil((data?.totalItems || 0) / itemsPerPage),
  );

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(currentItems.map((log) => log.id));
    else setSelectedIds([]);
  };

  const handleToggleSelectRow = (id: string, checked: boolean) => {
    if (checked) setSelectedIds((prev) => [...prev, id]);
    else setSelectedIds((prev) => prev.filter((item) => item != null));
  };

  const executeBulkDelete = () => {
    toast.info("Audit log deletion is not available yet.");
    setBulkDelete(false);
  };

  const executeClearOldLogs = () => {
    toast.info("Bulk audit cleanup is not available yet.");
    setClearOld(false);
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor system activities and security events
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setBulkDelete(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors animate-in slide-in-from-right-4"
            >
              <Trash2 size={16} /> Delete Selected ({selectedIds.length})
            </button>
          )}
          <button
            onClick={() => setClearOld(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <AlertTriangle size={16} className="text-yellow-500" />{" "}
            <p className="text-yellow-500">Clear 30 Days</p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <AuditLogFilterBar
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          actionFilter={actionFilter}
          onActionChange={(value) => {
            setActionFilter(value);
            setCurrentPage(1);
          }}
          entityFilter={entityFilter}
          onEntityChange={(value) => {
            setEntityFilter(value);
            setCurrentPage(1);
          }}
          startDate={startDate}
          onStartDateChange={(value) => {
            setStartDate(value);
            setCurrentPage(1);
          }}
          endDate={endDate}
          onEndDateChange={(value) => {
            setEndDate(value);
            setCurrentPage(1);
          }}
        />

        <AuditLogTable
          logs={currentItems}
          selectedIds={selectedIds}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleSelectRow={handleToggleSelectRow}
          onViewDetail={setSelectedLog}
          isLoading={isLoading}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
        />
      </div>

      <LogDetailModal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
      />

      <ConfirmModal
        isOpen={bulkDelete}
        title="Delete Selected Logs"
        message={`Are you sure you want to permanently delete ${selectedIds.length} selected log entries? This action cannot be undone.`}
        onConfirm={executeBulkDelete}
        onCancel={() => setBulkDelete(false)}
        confirmText="Delete Logs"
        isDanger={true}
      />

      <ConfirmModal
        isOpen={clearOld}
        title="Clear Old Logs"
        message="Are you sure you want to delete all audit logs older than 30 days? This will permanently erase historical tracking data."
        onConfirm={executeClearOldLogs}
        onCancel={() => setClearOld(false)}
        confirmText="Clear Old Data"
        isDanger={true}
      />
    </div>
  );
}
