import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';
import CreateSpaceModal from '../../components/CreateSpaceModal';

export default function DashboardHome() {
    const [spaces, setSpaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // Load spaces on mount
    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async () => {
        try {
            const res = await api.get('/spaces');
            setSpaces(res.data);
        } catch (error) {
            console.error(error);
            toast.error('Error al cargar los espacios');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSpace = async ({ name, slug }) => {
        setIsCreating(true);
        try {
            const res = await api.post('/spaces', { name, slug });
            // Add new space to list (optimistic update)
            setSpaces([...spaces, res.data.space]);
            setIsModalOpen(false);
            toast.success('¡Espacio creado exitosamente!');
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.error || 'Error al crear el espacio';
            toast.error(msg);
        } finally {
            setIsCreating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-slate-400">Cargando espacios...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Mis Espacios</h1>
                    <p className="text-slate-400 mt-1">Gestiona tus espacios de testimonios</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Nuevo Espacio</span>
                </button>
            </div>

            {/* Content */}
            {spaces.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No tienes espacios aún</h3>
                    <p className="text-slate-400 text-center max-w-md mb-6">
                        Crea tu primer espacio para comenzar a recopilar testimonios de tus clientes
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Crear mi primer espacio</span>
                    </button>
                </div>
            ) : (
                /* Spaces grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spaces.map((space) => (
                        <div
                            key={space.id}
                            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-2xl p-6 transition-all duration-300"
                        >
                            {/* Space icon */}
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>

                            {/* Space info */}
                            <h3 className="text-lg font-semibold text-white mb-1">{space.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">/{space.slug}</p>

                            {/* Stats placeholder */}
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
                                <div className="flex items-center gap-1 text-sm text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <span>0 testimonios</span>
                                </div>
                            </div>

                            {/* Action button */}
                            <Link
                                to={`/dashboard/space/${space.id}`}
                                className="inline-flex items-center gap-2 w-full justify-center py-2.5 px-4 bg-slate-700/50 hover:bg-purple-600/20 text-slate-300 hover:text-purple-400 font-medium rounded-xl transition-all duration-200"
                            >
                                <span>Gestionar</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Space Modal */}
            <CreateSpaceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateSpace}
                isLoading={isCreating}
            />
        </div>
    );
}