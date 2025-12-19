import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Al cargar la app, verificar si hay sesión guardada
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                // Opcional: Podrías hacer una llamada a /me para validar el token real
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    // 2. Función de Login
    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });

            // Guardar en navegador
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            // Guardar en estado
            setUser(res.data.user);
            toast.success('¡Bienvenido de nuevo!');
            return true;
        } catch (error) {
            console.error(error);
            // Mensaje de error amigable
            const msg = error.response?.data?.error || 'Error al iniciar sesión';
            toast.error(msg);
            return false;
        }
    };

    // 3. Función de Logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Sesión cerrada');
    };

    // 4. Función de Registro
    const register = async (email, password) => {
        try {
            await api.post('/auth/register', { email, password });
            toast.success('Cuenta creada. ¡Ahora inicia sesión!');
            return true;
        } catch (error) {
            const msg = error.response?.data?.error || 'Error al registrarse';
            toast.error(msg);
            return false;
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user // true si user existe
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};