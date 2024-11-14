import { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole: string; // SuperAdmin or Admin role ID
}

const AuthGuard: FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const userRoleId = useSelector((state: RootState) => state.auth.userRoleId);

  if (!userRoleId) {
    return <Navigate to="/login" replace />;
  }

  if (userRoleId !== requiredRole) {
    return <Navigate to="*" replace />; // Redirect to a default page or unauthorized page
  }

  return <>{children}</>;
};

export default AuthGuard;
