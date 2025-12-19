import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardHome from './pages/app/DashboardHome';

function App() {
  return (
    <BrowserRouter>
      {/* Proveedor de Autenticación envuelve toda la app */}
      <AuthProvider>
        {/* Notificaciones globales */}
        <Toaster position="top-right" />

        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Rutas Privadas (Protegidas) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            {/* Aquí agregaremos más rutas privadas luego: /dashboard/espacios, etc. */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;