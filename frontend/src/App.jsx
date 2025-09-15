import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LogoutPage from "./pages/LogoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SecurityDemo from "./SecurityDemo";
function App() {
  return (
    <SecurityDemo>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </Layout>
      </Router>
    </SecurityDemo>
  );
}

export default App;
