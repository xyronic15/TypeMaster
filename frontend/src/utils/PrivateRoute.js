import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Component wrapper used to make sure that the user is logged in when entering a page
const PrivateRoute = ({ children }) => {
  let { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
