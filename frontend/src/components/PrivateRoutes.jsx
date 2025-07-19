import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const PrivateRoutes = ({ children, requiredRole, setShowLogin }) => {
  const { user, loading } = useSelector((state) => state.userInfo);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowLogin?.(true);
      setShowFallback(true);
    }

    if (!loading && user && requiredRole && user.role !== requiredRole) {
      setShowFallback(true);
    }
  }, [loading, user, requiredRole, setShowLogin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-52">
        <SyncLoader color="#2563eb" size={15} />
      </div>
    );
  }

  if (showFallback) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
