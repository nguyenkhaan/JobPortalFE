export interface AdminPaymentRecord {
  id: number;
  planName: string;
  transactionRef: string | null;
  cost: number;
  method: string | null;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELED";
  note: string | null;
  createdAt: string;
  payerEmail: string | null;
  employerName: string | null;
}

export interface AdminEmployerRecord {
  id: number;
  companyName: string;
  email: string;
  industry: string;
  createdAt: string;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  logo: string | null;
  banner: string | null;
  address: string;
  companyWebsite: string;
  description: string;
  rejectionReason?: string | null;
}

export interface AdminUserRecord {
  id: number;
  email: string;
  displayName: string;
  createdAt: string;
  active: boolean;
  banned?: boolean | null;
  roles?: Array<"SEEKER" | "EMPLOYER" | "ADMIN">;
}

export interface AdminIndustryRecord {
  id: number;
  name: string;
  jobCount: number;
  createdAt: string;
}

export interface AdminAuditRecord {
  id: number;
  actionType: string;
  entityName: string;
  recordId: number;
  eventTime: string;
  actorUserId: number | null;
  actorEmail: string | null;
}

export interface AdminDashboardSummary {
  totalRevenue: number;
  totalUsers: number;
  activeJobs: number;
  pendingEmployers: number;
  monthlyRevenue: Array<{ label: string; value: number }>;
  industryBreakdown: Array<{ label: string; value: number }>;
  pendingEmployersList: Array<{
    id: number;
    companyName: string;
    email: string;
    industry: string;
    createdAt: string;
  }>;
}
