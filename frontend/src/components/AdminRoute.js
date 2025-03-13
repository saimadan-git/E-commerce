import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Loader from "./Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  
  return (user && user.role === "admin") ? children : <Navigate to="/login" />;
};

export default AdminRoute;
