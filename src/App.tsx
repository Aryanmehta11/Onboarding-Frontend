import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DevDashboard from "./pages/DevDashboard";
import NotFound from "./pages/NotFound";
import Users from "./pages/admin/Users";
import RolesTemplates from "./pages/admin/RolesTemplates";
import AdminProjects from "./pages/admin/Projects";
import AdminInternalDocs from "./pages/admin/InternalDocs";
import AdminKnowledgeGraph from "./pages/admin/KnowledgeGraph";
import AccessControl from "./pages/admin/AccessControl";
import Tasks from "./pages/dev/Tasks";
import DevProjects from "./pages/dev/Projects";
import DevKnowledgeGraph from "./pages/dev/KnowledgeGraph";
import DevInternalDocs from "./pages/dev/InternalDocs";
import MentorFeedback from "./pages/dev/MentorFeedback";

const queryClient = new QueryClient();

function Dashboard() {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }
  
  if (user?.role === 'dev') {
    return <DevDashboard />;
  }
  
  return <Navigate to="/login" replace />;
}

function RoleBasedRoute({ admin: Admin, dev: Dev }: { admin: any, dev: any }) {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Admin />;
  }
  
  if (user?.role === 'dev') {
    return <Dev />;
  }
  
  return <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Admin routes */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles-templates"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <RolesTemplates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute admin={AdminProjects} dev={DevProjects} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/docs"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute admin={AdminInternalDocs} dev={DevInternalDocs} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/knowledge-graph"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute admin={AdminKnowledgeGraph} dev={DevKnowledgeGraph} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/access-control"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AccessControl />
                </ProtectedRoute>
              }
            />
            {/* Dev routes */}
            <Route
              path="/tasks"
              element={
                <ProtectedRoute allowedRoles={['dev']}>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentor"
              element={
                <ProtectedRoute allowedRoles={['dev']}>
                  <MentorFeedback />
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
