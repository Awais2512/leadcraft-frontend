import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs/Jobs";
import JobDetail from "./pages/Jobs/JobDetail";
import ProposalEditor from "./pages/Proposals/ProposalEditor";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import TopNav from "./components/TopNav";

export default function App() {
  return (
    <div className="min-h-full">
      <Routes>
        {/* Public */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TopNav />
              <div className="mx-auto max-w-6xl px-4 py-6">
                <Dashboard />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <TopNav />
              <div className="mx-auto max-w-6xl px-4 py-6">
                <Jobs />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <TopNav />
              <div className="mx-auto max-w-6xl px-4 py-6">
                <JobDetail />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/proposals/:id"
          element={
            <ProtectedRoute>
              <TopNav />
              <div className="mx-auto max-w-4xl px-4 py-6">
                <ProposalEditor />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <TopNav />
              <div className="mx-auto max-w-3xl px-4 py-6">
                <Profile />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
