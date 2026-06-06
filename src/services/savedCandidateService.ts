import { privateApi, unwrap } from "../api/api";
import type { SavedCandidatesApiResult } from "../types/savedCandidates";

export const SavedCandidateServices = {
  getSavedCandidates: async () => {
    const response = await privateApi.get("/saved-candidates");
    return {
      success: true,
      message: "Saved candidates fetched successfully",
      data: unwrap(response),
    } as SavedCandidatesApiResult;
  },

  removeSavedCandidates: async (jobSeekerId: number) => {
    const response = await privateApi.delete(
      `/saved-candidates/${jobSeekerId}`
    );
    return unwrap(response);
  },
};
