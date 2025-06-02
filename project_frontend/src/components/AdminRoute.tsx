import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const isAdmin = user && JSON.parse(user).isAdmin;

  if (!token || !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
