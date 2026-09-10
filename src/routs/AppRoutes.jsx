import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'

import Dashboard from '../pages/Dashboard'
import ExecutiveQA from '../pages/ExecutiveQA'
import KnowledgeSearch from '../pages/KnowledgeSearch'
import ScenarioBuilder from '../pages/ScenarioBuilder'
import Briefings from '../pages/Briefings'
import DecisionsActions from '../pages/DecisionsActions'
import Recommendations from '../pages/Recommendations'
import ReportsAnalytics from '../pages/ReportsAnalytics'
import Notifications from '../pages/Notifications'
import UsersRoles from '../pages/UsersRoles'
import AuditLogs from '../pages/AuditLogs'
import Settings from '../pages/Settings'

import AppLayout from '../componets/layout/AppLayout.jsx'
import ProtectedRoute from '../componets/ProtectedRoute'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

const AppRoutes = () => {
  return (
    <Routes>

      {/* ============================= */}
      {/* PUBLIC ROUTES */}
      {/* ============================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
      {/* ============================= */}
      {/* PROTECTED APPLICATION ROUTES */}
      {/* ============================= */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >

        {/* Default route */}
        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* Knowledge Search */}
        <Route
          path="knowledge-search"
          element={<KnowledgeSearch />}
        />

        {/* Executive Q&A */}
        <Route
          path="executive-qa"
          element={<ExecutiveQA />}
        />

        {/* Scenario Builder */}
        <Route
          path="scenario-builder"
          element={<ScenarioBuilder />}
        />

        {/* Briefings */}
        <Route
          path="briefings"
          element={<Briefings />}
        />

        {/* Decisions & Actions */}
        <Route
          path="decisions-actions"
          element={<DecisionsActions />}
        />

        {/* Recommendations */}
        <Route
          path="recommendations"
          element={<Recommendations />}
        />

        {/* Reports & Analytics */}
        <Route
          path="reports"
          element={<ReportsAnalytics />}
        />

        {/* Notifications */}
        <Route
          path="notifications"
          element={<Notifications />}
        />

        {/* Users & Roles */}
        <Route
          path="users"
          element={<UsersRoles />}
        />

        {/* Audit Logs */}
        <Route
          path="audit-logs"
          element={<AuditLogs />}
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>

      {/* ============================= */}
      {/* INVALID URL */}
      {/* ============================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  )
}

export default AppRoutes