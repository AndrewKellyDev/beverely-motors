import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = ({ children }) => {
  const { authed } = useSelector((state) => state.authReducer);
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
