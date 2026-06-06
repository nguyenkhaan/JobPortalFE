import { privateApi, publicApi, unwrap } from "../api/api";

export const PaymentService = {
  getPlans: async () => {
    const response = await publicApi.get("/plans");
    return unwrap<
      Array<{
        id: number;
        name: string;
        price: number;
        priority: number;
        duration: number;
        maxJobPostsPerMonth: number;
      }>
    >(response);
  },

  getMyPayments: async () => {
    const response = await privateApi.get("/payments");
    return unwrap<
      Array<{
        id: number;
        planName: string;
        transactionRef: string | null;
        cost: number;
        status: string;
        method: string | null;
        createdAt: string;
      }>
    >(response);
  },

  createPayment: async (payload: {
    planName: string;
    cost: number;
    note?: string;
  }) => {
    const response = await privateApi.post("/payments", payload);
    return unwrap<{
      id: number;
      checkoutUrl?: string;
      qrCode?: string;
      accountName?: string;
      accountNumber?: string;
      bin?: string;
      transactionRef?: string | null;
      cost: number;
      planName: string;
      status: string;
    }>(response);
  },
};
