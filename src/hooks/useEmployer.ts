import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EmployerService } from "../services/employerService";
import { type ApiError } from "../api/api";
import type { EmployerProfile, JobResponse } from "../types/employer";

export const useSetupEmployer = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => EmployerService.setupProfile(formData),
    onSuccess: () => {
      toast.success("Employer profile created successfully!");
      navigate("/employer/setup/success");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const message =
        apiError.response?.data?.message || "Failed to setup profile.";
      toast.error(message);
    },
  });
};

export interface EmployerProfilePageData {
  profile: EmployerProfile;
  jobs: JobResponse[];
}

export const useEmployerProfilePageData = () => {
  return useQuery<EmployerProfilePageData>({
    queryKey: ["employerProfilePage"],
    queryFn: async () => {
      const profile = await EmployerService.getProfile();

      const jobs = (await EmployerService.getRecentJobs({ limit: 20 })).items;

      return { profile, jobs };
    },
  });
};
