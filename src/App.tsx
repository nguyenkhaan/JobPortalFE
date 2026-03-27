import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import EmployerSetupLayout from "./layouts/EmployerSetupLayout";
import EmployerLayout from "./layouts/EmployerLayout";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CompanyInfo from "./pages/Employer/AccountSetup/CompanyInfo";
import FoundingInfo from "./pages/Employer/AccountSetup/FoundingInfo";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/home", element: <Home /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/employer/setup",
    element: <EmployerSetupLayout />,
    children: [
      { path: "company", element: <CompanyInfo /> },
      { path: "founding", element: <FoundingInfo /> },
      // { path: "social", element: <SocialProfile /> },
      // { path: "contact", element: <Contact /> },
      // { path: "success", element: <SetupSuccess /> },
    ],
  },
  {
    element: <EmployerLayout />,
    children: [],
  },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />;
    </>
  );
}
