import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Industry } from "./components/types";
import IndustryTable from "./components/IndustryTable";
import IndustryModal from "./components/IndustryModal";
import TablePagination from "../../../components/ui/TablePagination";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { AdminService } from "../../../services/adminService";
import type { AdminIndustryRecord } from "../../../types/admin";

export default function IndustryManagementPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
  const [deletingIndustry, setDeletingIndustry] = useState<Industry | null>(
    null,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["admin-industries", searchQuery, currentPage, itemsPerPage],
    queryFn: () =>
      AdminService.getIndustries({
        name: searchQuery || undefined,
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      }),
  });

  const saveMutation = useMutation({
    mutationFn: ({ id, name }: { id?: string; name: string }) =>
      id
        ? AdminService.updateIndustry(Number(id), name)
        : AdminService.createIndustry(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-industries"] });
      toast.success(
        editingIndustry
          ? "Industry updated successfully"
          : "New industry created successfully",
      );
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to save industry"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => AdminService.deleteIndustry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-industries"] });
      toast.success("Industry deleted successfully");
      setDeletingIndustry(null);
    },
    onError: () => toast.error("Failed to delete industry"),
  });

  const currentItems = useMemo(() => {
    const mapIndustry = (industry: AdminIndustryRecord): Industry => ({
      id: String(industry.id),
      name: industry.name,
      jobCount: industry.jobCount,
      createdAt: new Date(industry.createdAt).toLocaleDateString(),
    });

    return (data?.items || []).map(mapIndustry);
  }, [data]);

  const totalPages = Math.max(
    1,
    Math.ceil((data?.totalItems || 0) / itemsPerPage),
  );

  const handleOpenAddModal = () => {
    setEditingIndustry(null);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (industry: Industry) => {
    setEditingIndustry(industry);
    setIsModalOpen(true);
  };

  const handleSubmitForm = (name: string) => {
    saveMutation.mutate({ id: editingIndustry?.id, name });
  };

  const handleDeleteConfirm = () => {
    if (!deletingIndustry) return;

    if (deletingIndustry.jobCount > 0) {
      toast.error(
        `Cannot delete "${deletingIndustry.name}". It is currently linked to ${deletingIndustry.jobCount} jobs.`,
      );
    } else {
      deleteMutation.mutate(Number(deletingIndustry.id));
    }
  };
  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Industry Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage job categories and industries
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={18} /> Add New Industry
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <div className="p-5 border-b border-gray-200 bg-gray-50/50 shrink-0">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search industries..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white shadow-sm"
            />
          </div>
        </div>

        <IndustryTable
          industries={currentItems}
          onEdit={handleOpenEditModal}
          onDelete={setDeletingIndustry}
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
      <IndustryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingIndustry}
      />

      <ConfirmModal
        isOpen={!!deletingIndustry}
        title="Delete Industry"
        message={
          deletingIndustry?.jobCount && deletingIndustry.jobCount > 0
            ? `Warning: "${deletingIndustry.name}" is currently linked to ${deletingIndustry.jobCount} jobs. Deleting it may cause data inconsistency. Are you sure you want to proceed? (Note: The system might hide it instead of deleting).`
            : `Are you sure you want to delete "${deletingIndustry?.name}"? This action cannot be undone.`
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingIndustry(null)}
        confirmText="Delete Industry"
        isDanger={true}
      />
    </div>
  );
}
