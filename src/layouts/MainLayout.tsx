import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import BackToTop from "../components/home/BackToTop";

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
