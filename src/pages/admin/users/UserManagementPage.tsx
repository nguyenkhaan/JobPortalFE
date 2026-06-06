import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type UserProfile,
  type UserRole,
  type UserStatus,
} from "./components/types";
import UserTable from "./components/UserTable";
import UserFilterBar from "./components/UserFilterBar";
import DeleteUserModal from "./components/DeleteUserModal";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import TablePagination from "../../../components/ui/TablePagination";
import { AdminService } from "../../../services/adminService";
import type { AdminUserRecord } from "../../../types/admin";

export default function UserManagementPage() {
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const [lockConfirm, setLockConfirm] = useState<{
    isOpen: boolean;
    user: UserProfile | null;
  }>({ isOpen: false, user: null });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    user: UserProfile | null;
  }>({ isOpen: false, user: null });

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-users",
      searchQuery,
      roleFilter,
      statusFilter,
      currentPage,
      itemsPerPage,
    ],
    queryFn: () =>
      AdminService.getUsers({
        search: searchQuery || undefined,
        role:
          roleFilter === "All"
            ? undefined
            : roleFilter === "Candidate"
              ? "SEEKER"
              : "EMPLOYER",
        active:
          statusFilter === "All" ? undefined : statusFilter === "Active",
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: number) => AdminService.toggleUserLock(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User status updated successfully");
    },
    onError: () => toast.error("Failed to update user status"),
  });

  const deactivateMutation = useMutation({
    mutationFn: (id: number) => AdminService.deactivateUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User account deactivated successfully");
    },
    onError: () => toast.error("Failed to deactivate user"),
  });

  const users = useMemo(() => {
    const mapUser = (user: AdminUserRecord): UserProfile => ({
      id: String(user.id),
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.displayName || user.email,
      )}`,
      fullName: user.displayName || user.email,
      email: user.email,
      role: user.roles?.includes("EMPLOYER") ? "Employer" : "Candidate",
      createdAt: new Date(user.createdAt).toLocaleString(),
      status: user.active && !user.banned ? "Active" : "Locked",
    });

    return (data?.items || []).map(mapUser);
  }, [data]);

  const totalPages = Math.max(
    1,
    Math.ceil((data?.totalItems || 0) / itemsPerPage),
  );

  const executeStatusToggle = () => {
    if (lockConfirm.user) {
      toggleMutation.mutate(Number(lockConfirm.user.id));
    }
    setLockConfirm({ isOpen: false, user: null });
  };
  const executeDelete = (userId: string) => {
    deactivateMutation.mutate(Number(userId));
    setDeleteConfirm({ isOpen: false, user: null });
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage candidates and employer accounts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <UserFilterBar
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          roleFilter={roleFilter}
          onRoleChange={(value) => {
            setRoleFilter(value);
            setCurrentPage(1);
          }}
          statusFilter={statusFilter}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        />

        <UserTable
          users={users}
          activeDropdownId={activeDropdownId}
          onToggleDropdown={setActiveDropdownId}
          onToggleStatusClick={(user) => setLockConfirm({ isOpen: true, user })}
          onDeleteClick={(user) => setDeleteConfirm({ isOpen: true, user })}
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
      <ConfirmModal
        isOpen={lockConfirm.isOpen}
        title={
          lockConfirm.user?.status === "Active"
            ? "Lock User Account"
            : "Unlock User Account"
        }
        message={
          lockConfirm.user?.status === "Active"
            ? `Are you sure you want to lock ${lockConfirm.user?.fullName}'s account? The user will not be able to log in.`
            : `Are you sure you want to unlock ${lockConfirm.user?.fullName}'s account?`
        }
        onConfirm={executeStatusToggle}
        onCancel={() => setLockConfirm({ isOpen: false, user: null })}
        confirmText={
          lockConfirm.user?.status === "Active"
            ? "Lock Account"
            : "Unlock Account"
        }
        isDanger={lockConfirm.user?.status === "Active"}
      />
      <DeleteUserModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, user: null })}
        onConfirm={executeDelete}
        user={deleteConfirm.user}
      />
    </div>
  );
}
