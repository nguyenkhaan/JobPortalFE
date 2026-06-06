import { privateApi, unwrap, unwrapPage } from "../api/api";
import type {
  AdminAuditRecord,
  AdminDashboardSummary,
  AdminEmployerRecord,
  AdminIndustryRecord,
  AdminPaymentRecord,
  AdminUserRecord,
} from "../types/admin";

export const AdminService = {
  getDashboardSummary: async (): Promise<AdminDashboardSummary> => {
    const response = await privateApi.get("/admin/dashboard/summary");
    return unwrap<AdminDashboardSummary>(response);
  },

  getPayments: async (params: {
    search?: string;
    status?: "PENDING" | "COMPLETED" | "FAILED" | "CANCELED";
    page?: number;
    size?: number;
  }): Promise<{
    content: AdminPaymentRecord[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }> => {
    const response = await privateApi.get("/admin/payments", { params });
    return unwrap<{
      content: AdminPaymentRecord[];
      totalPages: number;
      totalElements: number;
      size: number;
      number: number;
    }>(response);
  },

  updatePaymentStatus: async (
    paymentId: number,
    status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELED",
  ) => {
    const response = await privateApi.patch(
      `/payments/${paymentId}/status`,
      null,
      {
        params: { status },
      },
    );
    return unwrap<AdminPaymentRecord>(response);
  },

  getEmployers: async (params: {
    search?: string;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    offset?: number;
    limit?: number;
  }) => {
    const response = await privateApi.get("/admin/employers", { params });
    return unwrapPage<AdminEmployerRecord>(response);
  },

  getEmployerById: async (id: number) => {
    const response = await privateApi.get(`/admin/employers/${id}`);
    return unwrap<AdminEmployerRecord>(response);
  },

  updateEmployerApproval: async (
    id: number,
    payload: {
      approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
      rejectionReason?: string;
    },
  ) => {
    const response = await privateApi.patch(
      `/admin/employers/${id}/approval`,
      payload,
    );
    return unwrap<AdminEmployerRecord>(response);
  },

  getUsers: async (params: {
    search?: string;
    role?: "SEEKER" | "EMPLOYER" | "ADMIN";
    active?: boolean;
    offset?: number;
    limit?: number;
  }) => {
    const response = await privateApi.get("/admin/users", { params });
    return unwrapPage<AdminUserRecord>(response);
  },

  toggleUserLock: async (id: number) => {
    const response = await privateApi.put(`/admin/users/${id}/lock`);
    return unwrap<AdminUserRecord>(response);
  },

  deactivateUser: async (id: number) => {
    const response = await privateApi.delete(`/admin/users/${id}`);
    return unwrap<AdminUserRecord>(response);
  },

  getIndustries: async (params: {
    name?: string;
    offset?: number;
    limit?: number;
  }) => {
    const response = await privateApi.get("/industry", { params });
    return unwrapPage<AdminIndustryRecord>(response);
  },

  createIndustry: async (name: string) => {
    const response = await privateApi.post("/industry", { name });
    return unwrap<AdminIndustryRecord>(response);
  },

  updateIndustry: async (id: number, name: string) => {
    const response = await privateApi.patch(`/industry/${id}`, { name });
    return unwrap<AdminIndustryRecord>(response);
  },

  deleteIndustry: async (id: number) => {
    const response = await privateApi.delete(`/industry/${id}`);
    return unwrap(response);
  },

  getAuditLogs: async (params: {
    search?: string;
    actionType?: string;
    entityName?: string;
    startDate?: string;
    endDate?: string;
    offset?: number;
    limit?: number;
  }) => {
    const response = await privateApi.get("/audit", { params });
    return unwrapPage<AdminAuditRecord>(response);
  },
};
