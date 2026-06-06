import { publicApi, privateApi, unwrap, unwrapPage } from "../api/api";
import type { PageResult } from "../types/api";
import type { JobResponse } from "../types/employer";

export const JobService = {
  getJobs: async (params: {
    keyword?: string;
    offset?: number;
    limit?: number;
  }): Promise<PageResult<JobResponse>> => {
    const response = await publicApi.get("/jobpost", {
      params: {
        keyword: params.keyword,
        offset: params.offset ?? 0,
        limit: params.limit ?? 12,
      },
    });
    return unwrapPage<JobResponse>(response);
  },

  getJobById: async (id: number): Promise<JobResponse> => {
    const response = await publicApi.get(`/jobpost/${id}`);
    return unwrap<JobResponse>(response);
  },

  createJob: async (payload: Record<string, unknown>): Promise<JobResponse> => {
    const response = await privateApi.post("/jobpost", payload);
    return unwrap<JobResponse>(response);
  },

  updateJob: async (
    id: number,
    payload: Record<string, unknown>,
  ): Promise<JobResponse> => {
    const response = await privateApi.patch(`/jobpost/${id}`, payload);
    return unwrap<JobResponse>(response);
  },
};
