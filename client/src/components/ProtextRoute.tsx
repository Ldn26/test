import { Navigate } from "react-router-dom";
import useUserStore from "../store/store";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useUserStore();

  // If not logged in → redirect to login
  // if (!user) {
  //   return <Navigate to="/auth" replace />;
  // }

  // If adminOnly route and user isn’t admin → redirect home
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
