import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import EmployeeDashboard from '../pages/employee/EmployeeDashboard.jsx';
import MyGoals from '../pages/employee/MyGoals.jsx';
import CreateGoals from '../pages/employee/CreateGoals.jsx';
import QuarterlyCheckin from '../pages/employee/QuarterlyCheckin.jsx';
import EmployeeAnalytics from '../pages/employee/EmployeeAnalytics.jsx';

import ManagerDashboard from '../pages/manager/ManagerDashboard.jsx';
import Approvals from '../pages/manager/Approvals.jsx';
import ReviewCheckins from '../pages/manager/ReviewCheckins.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';

const Unauthorized = () => <div className="p-8 text-center text-red-500"><h2 className="text-3xl">401 - Unauthorized</h2></div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/goals" element={<MyGoals />} />
            <Route path="/employee/goals/create" element={<CreateGoals />} />
            <Route path="/employee/checkins" element={<QuarterlyCheckin />} />
            <Route path="/employee/analytics" element={<EmployeeAnalytics />} />
            
            <Route element={<ProtectedRoute allowedRoles={['Manager', 'Admin']} />}>
                <Route path="/manager/dashboard" element={<ManagerDashboard />} />
                <Route path="/manager/approvals" element={<Approvals />} />
                <Route path="/manager/checkins" element={<ReviewCheckins />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="/" element={<Navigate to="/employee/dashboard" replace />} />
        </Route>
      </Route>
      
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
