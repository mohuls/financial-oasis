
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import Advances from "./components/Advances";
import FieldWorkerSalaries from "./components/FieldWorkerSalaries";
import OutstandingCustomers from "./components/OutstandingCustomers";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

// Protected Route Component with Sidebar
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:mr-[260px] p-6">{children}</div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/income"
              element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/advances"
              element={
                <ProtectedRoute>
                  <Advances />
                </ProtectedRoute>
              }
            />
            <Route
              path="/field-worker-salaries"
              element={
                <ProtectedRoute>
                  <FieldWorkerSalaries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/outstanding-customers"
              element={
                <ProtectedRoute>
                  <OutstandingCustomers />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
