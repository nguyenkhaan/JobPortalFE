import { Outlet } from "react-router-dom";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-bg-white">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
