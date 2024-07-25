// src/App.js
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ROUTES } from "./router/routes";
import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage";
import { ProtectedRoute } from "./protected-route/ProtectedRoute";
import { ExpensesPage } from "./pages/ExpensesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { RaportsPage } from "./pages/RaportsPage";

function App() {
  return (
    <Routes>
      <Route
        path={ROUTES.dashboard}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      <Route path={ROUTES.auth} element={<AuthPage />} />
      <Route
        path={ROUTES.expenses}
        element={
          <ProtectedRoute>
            <ExpensesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.settings}
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.raports}
        element={
          <ProtectedRoute>
            <RaportsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
