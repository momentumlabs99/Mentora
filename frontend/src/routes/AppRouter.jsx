import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../state/auth';
import AppShell from '../layouts/AppShell';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import OverviewPage from '../pages/OverviewPage';
import CoursesPage from '../pages/CoursesPage';
import StudentPage from '../pages/StudentPage';
import DonorPage from '../pages/DonorPage';
import NgoPage from '../pages/NgoPage';
import VerificationPage from '../pages/VerificationPage';

function Protected({ children }) {
  // Auth is intentionally not enforced so you can explore the UI
  // without needing a backend account.
  return children;
}

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/app' : '/app'} replace />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route
        path="/app"
        element={
          <Protected>
            <AppShell />
          </Protected>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="donor" element={<DonorPage />} />
        <Route path="ngo" element={<NgoPage />} />
        <Route path="verify" element={<VerificationPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;

