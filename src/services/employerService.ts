import { privateApi, unwrap, unwrapPage } from "../api/api";
import type { PageResult } from "../types/api";
import type { EmployerProfile, JobResponse } from "../types/employer";
import type { SavedCandidatesResponse } from "../types/savedCandidates";

export const EmployerService = {
  setupProfile: async (formData: FormData) => {
    return privateApi.post("/employer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getProfile: async (): Promise<EmployerProfile> => {
    const response = await privateApi.get("/employer");
    return unwrap<EmployerProfile>(response);
  },
  updateProfile: async (formData: FormData): Promise<EmployerProfile> => {
    const response = await privateApi.patch("/employer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return unwrap<EmployerProfile>(response);
  },
  getSubscription: async () => {
    const response = await privateApi.get("/employer/subscription");
    return unwrap<{
      currentPlan: string;
      amount: number;
      startedAt: string | null;
      expiresAt: string | null;
      canceled: boolean;
    }>(response);
  },
  getRecentJobs: async (
    params: { offset?: number; limit?: number } = {},
  ): Promise<PageResult<JobResponse>> => {
    const response = await privateApi.get("/jobpost", {
      params: {
        mine: true,
        offset: params.offset ?? 0,
        limit: params.limit ?? 20,
      },
    });
    return unwrapPage<JobResponse>(response);
  },
  getSavedCandidates: async (): Promise<SavedCandidatesResponse[]> => {
    const response = await privateApi.get("/saved-candidates");
    return unwrap<SavedCandidatesResponse[]>(response);
  },
};
