import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import CurrentPlanCard from "./components/CurrentPlanCard";
import NextInvoiceCard from "./components/NextInvoiceCard";
import PlanBenefitsCard from "./components/PlanBenefitsCard";
import InvoicesTable, { type Invoice } from "./components/InvoicesTable";
import { EmployerService } from "../../../services/employerService";
import { PaymentService } from "../../../services/paymentService";

const ITEMS_PER_PAGE = 6;

export default function PlansBillingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: subscription } = useQuery({
    queryKey: ["employer-subscription"],
    queryFn: () => EmployerService.getSubscription(),
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["employer-payments"],
    queryFn: () => PaymentService.getMyPayments(),
  });

  const { data: plans = [] } = useQuery({
    queryKey: ["plans"],
    queryFn: () => PaymentService.getPlans(),
  });

  const createPaymentMutation = useMutation({
    mutationFn: () => {
      const currentPlanConfig = plans.find(
        (plan) => plan.name === subscription?.currentPlan,
      );

      if (!currentPlanConfig) {
        throw new Error("Current plan is unavailable");
      }

      return PaymentService.createPayment({
        planName: currentPlanConfig.name,
        cost: currentPlanConfig.price,
        note: `Renew ${currentPlanConfig.name} plan`,
      });
    },
    onSuccess: (payment) => {
      if (payment.checkoutUrl) {
        window.location.href = payment.checkoutUrl;
        return;
      }
      toast.success("Payment created successfully");
    },
    onError: () => {
      toast.error("Failed to create payment");
    },
  });

  const currentInvoices = useMemo(() => {
    const invoices: Invoice[] = payments.map((payment) => ({
      id: `#${payment.id}`,
      date: new Date(payment.createdAt).toLocaleString(),
      plan: payment.planName,
      amount: `$${payment.cost} USD`,
    }));

    return invoices.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [currentPage, payments]);

  const totalPages = Math.max(1, Math.ceil(payments.length / ITEMS_PER_PAGE));

  const currentPlan = {
    isActive: !subscription?.canceled,
    name: subscription?.currentPlan || "Free",
    description: "Your active employer subscription package.",
    amount: `$${subscription?.amount || 0} USD`,
    dueDate: subscription?.expiresAt
      ? new Date(subscription.expiresAt).toLocaleDateString()
      : "N/A",
    packageStarted: subscription?.startedAt
      ? new Date(subscription.startedAt).toLocaleDateString()
      : "N/A",
  };

  const handleChangePlan = () => toast.info("Redirecting to Pricing page...");

  const handleCancelPlan = () => {
    if (!currentPlan.isActive) {
      toast.info("Your plan is already canceled.");
      return;
    }

    const confirmCancel = window.confirm(
      `Are you sure you want to cancel your ${currentPlan.name} plan? You will lose access to premium features at the end of your billing cycle.`,
    );
    if (confirmCancel) {
      toast.info("Plan cancellation is not available yet.");
    }
  };

  const handlePayNow = () => {
    if (!currentPlan.isActive || !subscription) {
      toast.error("Cannot process payment for a canceled plan.");
      return;
    }
    createPaymentMutation.mutate();
  };

  const handleDownloadInvoice = (id: string) => {
    const invoice = currentInvoices.find((inv) => inv.id === id);
    if (!invoice) return;

    const dummyContent = `INVOICE RECEIPT\n\nInvoice ID: ${invoice.id}\nDate: ${invoice.date}\nPlan: ${invoice.plan}\nAmount Paid: ${invoice.amount}\n\nThank you for choosing our service!`;

    const blob = new Blob([dummyContent], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Invoice_${invoice.id.replace("#", "")}.pdf`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success(`Invoice ${id} downloaded successfully.`);
  };

  return (
    <div className="w-full max-w-360 mx-auto animate-in fade-in duration-500 pb-16">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="flex-1">
            <CurrentPlanCard
              planName={currentPlan.name}
              description={currentPlan.description}
              onChangePlan={handleChangePlan}
              onCancelPlan={handleCancelPlan}
            />
          </div>
          <div className="flex-1">
            <NextInvoiceCard
              amount={currentPlan.amount}
              dueDate={currentPlan.dueDate}
              packageStarted={currentPlan.packageStarted}
              onPayNow={handlePayNow}
            />
          </div>
        </div>

        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="flex-1">
            <PlanBenefitsCard />
          </div>
        </div>

        <div className="xl:col-span-12 mt-4">
          <InvoicesTable
            invoices={currentInvoices}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onDownload={handleDownloadInvoice}
          />
        </div>
      </div>
    </div>
  );
}
