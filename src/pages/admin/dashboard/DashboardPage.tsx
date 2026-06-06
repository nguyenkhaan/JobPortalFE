import { DollarSign, Users, Briefcase, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import IndustryPieChart from "./components/IndustryPieChart";
import PendingApprovalsList from "./components/PendingApprovalsList";
import { AdminService } from "../../../services/adminService";

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["admin-dashboard-summary"],
    queryFn: () => AdminService.getDashboardSummary(),
  });

  const revenueData =
    data?.monthlyRevenue.map((item) => ({
      name: item.label,
      revenue: item.value,
    })) || [];

  const industryData =
    data?.industryBreakdown.map((item) => ({
      name: item.label,
      value: item.value,
    })) || [];

  const pendingItems =
    data?.pendingEmployersList.map((item) => ({
      id: String(item.id),
      name: item.companyName,
      time: new Date(item.createdAt).toLocaleString(),
    })) || [];

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, Super Admin! Here's what's happening today.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Revenue"
          value={`$${(data?.totalRevenue || 0).toLocaleString()}`}
          icon={<DollarSign size={24} />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Users"
          value={data?.totalUsers || 0}
          icon={<Users size={24} />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Active Jobs"
          value={data?.activeJobs || 0}
          icon={<Briefcase size={24} />}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Employers"
          value={data?.pendingEmployers || 0}
          icon={<Building2 size={24} />}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div className="flex flex-col gap-6">
          <IndustryPieChart data={industryData} />

          <PendingApprovalsList items={pendingItems} />
        </div>
      </div>
    </div>
  );
}
