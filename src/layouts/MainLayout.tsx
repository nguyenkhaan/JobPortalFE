import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "../pages/home/components/Header";
import Footer from "../pages/home/components/Footer";
import BackToTop from "../pages/home/components/BackToTop";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-bg-white">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
      <BackToTop />
    </div>
  );
}
