import { ReactNode, FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import axios from "axios";
import { setAuthData } from "../store/authSlice";
const API_URL = "http://localhost:5000";
interface AuthGuardProps {
  children: ReactNode;
  requiredRole: string; // SuperAdmin or Admin role ID
}

const ProtectedRoute: FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const userRoleId = useSelector((state: RootState) => state.auth.userRoleId);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && (!userRoleId || !userId)) {
      getUserByToken();
    }
  }, [token, userRoleId, userId, dispatch]);

  const getUserByToken = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/getuserbytoken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { _id, role_id } = response.data.data;
      if (_id && role_id) {
        dispatch(setAuthData({ userRoleId: role_id, userId: _id }));
      }
    } catch (error) {
      console.error("Error fetching user by token:", error);
    }
  };
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRoleId && userRoleId !== requiredRole) {
    return <Navigate to="*" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
