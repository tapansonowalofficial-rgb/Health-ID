import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import MyHealth from "./pages/MyHealth";
import Records from "./pages/Records";
import Appointments from "./pages/Appointments";
import AIAssistantDashboard from "./pages/AIAssistantDashboard";
import Medications from "./pages/Medications";
import EmergencyProfile from "./pages/EmergencyProfile";
import Settings from "./pages/Settings";
import EmailVerification from "./pages/EmailVerification";
import NotFound from "./pages/NotFound";
import WhatIsHealthId from "./pages/WhatIsHealthId";
import HealthIdVsAbha from "./pages/HealthIdVsAbha";
import AIHealthMonitoring from "./pages/AIHealthMonitoring";
import DataSecurity from "./pages/DataSecurity";
import ForDoctors from "./pages/ForDoctors";
import HealthCard from "./pages/HealthCard";
import HealthView from "./pages/HealthView";
import Emergency from "./pages/Emergency";
import Pricing from "./pages/Pricing";
import Compliance from "./pages/Compliance";
import AIHealthBrain from "./pages/AIHealthBrain";
import { ProtectedRoute } from "@/lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/my-health" element={<ProtectedRoute><MyHealth /></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistantDashboard /></ProtectedRoute>} />
            <Route path="/medications" element={<ProtectedRoute><Medications /></ProtectedRoute>} />
            <Route path="/emergency-profile" element={<ProtectedRoute><EmergencyProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/health-card" element={<HealthCard />} />
            <Route path="/health-view/:token" element={<HealthView />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/what-is-health-id" element={<WhatIsHealthId />} />
            <Route path="/health-id-vs-abha" element={<HealthIdVsAbha />} />
            <Route path="/ai-health-monitoring" element={<AIHealthMonitoring />} />
            <Route path="/data-security" element={<DataSecurity />} />
            <Route path="/for-doctors" element={<ForDoctors />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/ai-health" element={<AIHealthBrain />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
