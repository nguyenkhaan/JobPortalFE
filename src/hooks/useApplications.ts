import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApplicationService } from "../services/applicationService";
import type { ApplicationStatus } from "../types/application";

export const useApplications = (jobPostId?: number) => {
  return useQuery({
    queryKey: ["jobApplications", jobPostId],
    queryFn: async () => {
      const response = await ApplicationService.getApplications({ jobPostId });
      return response.items;
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ApplicationStatus }) =>
      ApplicationService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
    onError: () => {
      toast.error("Failed to update candidate status.");
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ApplicationService.deleteApplication(id),
    onSuccess: () => {
      toast.success("Application deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
    onError: () => {
      toast.error("Failed to delete application.");
    },
  });
};
