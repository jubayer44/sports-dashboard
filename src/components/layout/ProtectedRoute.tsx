import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyJwt";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

type TUser = {
  email: string;
  exp: number;
  iat: number;
  role: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(selectCurrentToken);

  let user: TUser | null = null;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (role && role !== user?.role) {
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
