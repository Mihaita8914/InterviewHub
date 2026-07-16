import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, requiredRole }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    Access denied. You do not have permission to view this page.
                </div>
            </div>
        );
    }

    return children;
}

export default ProtectedRoute;