import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    // Si no está autenticado, redirigir a Login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si sí está, dejar pasar a las rutas hijas (Outlet)
    return <Outlet />;
};