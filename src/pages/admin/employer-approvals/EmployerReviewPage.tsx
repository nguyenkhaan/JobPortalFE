import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MapPin,
  Globe,
  FileText,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import RejectReasonModal from "./components/RejectReasonModal";
import { type EmployerProfile } from "./components/types";
import { AdminService } from "../../../services/adminService";

export default function EmployerReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-employer-detail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await AdminService.getEmployerById(Number(id));
      const mapped: EmployerProfile = {
        id: String(response.id),
        companyName: response.companyName,
        email: response.email,
        industry: response.industry,
        registrationDate: new Date(response.createdAt).toLocaleString(),
        status:
          response.approvalStatus === "APPROVED"
            ? "Approved"
            : response.approvalStatus === "REJECTED"
              ? "Rejected"
              : "Pending",
        logoUrl: response.logo || "https://ui-avatars.com/api/?name=Company",
        bannerUrl: response.banner || "",
        address: response.address,
        website: response.companyWebsite,
        businessLicenseUrl: null,
        description: response.description,
      };
      return mapped;
    },
  });

  const updateApprovalMutation = useMutation({
    mutationFn: (payload: {
      approvalStatus: "APPROVED" | "REJECTED";
      rejectionReason?: string;
    }) =>
      AdminService.updateEmployerApproval(Number(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-employers"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-summary"] });
      navigate("/admin/employer-approvals");
    },
    onError: () => {
      toast.error("Failed to update employer approval");
    },
  });

  const handleApprove = () => {
    updateApprovalMutation.mutate({ approvalStatus: "APPROVED" });
  };

  const handleReject = (reason: string) => {
    setIsModalOpen(false);
    updateApprovalMutation.mutate({
      approvalStatus: "REJECTED",
      rejectionReason: reason,
    });
  };

  if (isLoading || !data) {
    return <div className="py-20 text-center text-gray-500">Loading employer profile...</div>;
  }

  return (
    <div className="animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/admin/employer-approvals")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Approvals
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-md hover:bg-red-50 transition-colors shadow-sm"
          >
            <XCircle size={18} /> Reject Profile
          </button>
          <button
            onClick={handleApprove}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 transition-colors shadow-sm shadow-green-100"
          >
            <CheckCircle2 size={18} /> Approve Profile
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-64 w-full relative bg-gray-100">
          <img
            src={data.bannerUrl}
            alt="Company Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8 relative z-10">
            <div className="w-32 h-32 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0">
              <img
                src={data.logoUrl}
                alt={data.companyName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pb-2 text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {data.companyName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 justify-center sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <Building2 size={16} /> {data.industry}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} /> {data.address}
                </span>
                <a
                  href={data.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-blue-600 hover:underline"
                >
                  <Globe size={16} /> {data.website}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                  Company Description
                </h3>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line p-6 bg-gray-50 rounded-xl border border-gray-100">
                  {data.description}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="p-6 border border-gray-100 rounded-xl bg-white space-y-4">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Registration Info
                </h3>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                    Account Email
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {data.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                    Registered At
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {data.registrationDate}
                  </p>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl bg-blue-50/50">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Business Document
                </h3>
                {data.businessLicenseUrl ? (
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">
                          Business_License.pdf
                        </p>
                        <p className="text-xs text-gray-500">2.4 MB</p>
                      </div>
                    </div>
                    <a
                      href={data.businessLicenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No business license uploaded.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RejectReasonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReject}
        companyName={data.companyName}
      />
    </div>
  );
}
