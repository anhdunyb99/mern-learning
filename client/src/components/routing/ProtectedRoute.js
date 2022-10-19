import React from "react";
import { Navigate, Route ,Outlet} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Spinner from "react-bootstrap/esm/Spinner";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  console.log(authLoading,isAuthenticated);
  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
    return isAuthenticated ? children  : <Navigate to="/login" />;
  
};

export default ProtectedRoute;
