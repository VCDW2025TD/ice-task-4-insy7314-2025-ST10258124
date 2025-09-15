import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" state={{ message: "You must log in first" }} />;
  }
  return children;
};

export default ProtectedRoute;
