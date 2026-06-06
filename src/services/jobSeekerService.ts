import { privateApi, unwrap, unwrapPage } from "../api/api";
import type { JobSeekerProfile, ResumeRecord } from "../types/job-seeker";

export const JobSeekerService = {
  getProfile: async (): Promise<JobSeekerProfile> => {
    const response = await privateApi.get("/job-seeker");
    return unwrap<JobSeekerProfile>(response);
  },

  updateProfile: async (
    payload: Partial<JobSeekerProfile>,
  ): Promise<JobSeekerProfile> => {
    const response = await privateApi.patch("/job-seeker", payload);
    return unwrap<JobSeekerProfile>(response);
  },

  createProfile: async (
    payload: Partial<JobSeekerProfile>,
  ): Promise<JobSeekerProfile> => {
    const response = await privateApi.post("/job-seeker", payload);
    return unwrap<JobSeekerProfile>(response);
  },

  getResumes: async (): Promise<ResumeRecord[]> => {
    const response = await privateApi.get("/resumes/me");
    return unwrap<ResumeRecord[]>(response);
  },

  uploadResume: async (file: File, isDefault = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isDefault", String(isDefault));

    const response = await privateApi.post("/resumes/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return unwrap<ResumeRecord>(response);
  },

  setDefaultResume: async (resumeId: number) => {
    const response = await privateApi.patch(`/resumes/${resumeId}/default`);
    return unwrap(response);
  },

  deleteResume: async (resumeId: number) => {
    const response = await privateApi.delete(`/resumes/${resumeId}`);
    return unwrap(response);
  },

  discoverCandidates: async (params: { search?: string; offset?: number; limit?: number }) => {
    const response = await privateApi.get("/job-seeker/discover", { params });
    return unwrapPage<JobSeekerProfile>(response);
  },
};
