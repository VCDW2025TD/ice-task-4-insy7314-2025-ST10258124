import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const isLoggedIn = () => !!localStorage.getItem("token");

  return (
    <div>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        {isLoggedIn() ? (
          <>
            <Link to="/">Home</Link> |{" "}
            <Link to="/dashboard">Dashboard</Link> |{" "}
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link> |{" "}
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <main style={{ padding: "1rem" }}>{children}</main>
      <footer style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
        <small>SecureBlog &copy; 2025</small>
      </footer>
    </div>
  );
};

export default Layout;
