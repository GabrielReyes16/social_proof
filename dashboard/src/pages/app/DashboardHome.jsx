import { useAuth } from "../../context/AuthContext";
export default function DashboardHome() {
    const { logout, user } = useAuth();
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Hola, {user?.email}</h1>
            <p>Bienvenido a tu Dashboard privado.</p>
            <button onClick={logout} className="bg-red-500 text-white p-2 rounded mt-4">
                Cerrar Sesión
            </button>
        </div>
    )
}