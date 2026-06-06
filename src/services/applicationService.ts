import { privateApi, unwrap, unwrapPage } from "../api/api";
import type {
  ApplicationStatus,
  JobApplication,
  JobApplicationDetail,
} from "../types/application";

export const ApplicationService = {
  getApplications: async (params: { jobPostId?: number; offset?: number; limit?: number } = {}) => {
    const response = await privateApi.get("/job-application", {
      params: {
        jobPostId: params.jobPostId,
        offset: params.offset ?? 0,
        limit: params.limit ?? 50,
      },
    });
    return unwrapPage<JobApplication>(response);
  },

  getApplicationById: async (id: number): Promise<JobApplicationDetail> => {
    const response = await privateApi.get(`/job-application/${id}`);
    return unwrap<JobApplicationDetail>(response);
  },

  updateStatus: async (id: number, status: ApplicationStatus) => {
    const response = await privateApi.patch(`/job-application/${id}`, {
      status,
    });

    return unwrap(response);
  },

  deleteApplication: async (id: number) => {
    const response = await privateApi.delete(`/job-application/${id}`);

    return unwrap(response);
  },
};
