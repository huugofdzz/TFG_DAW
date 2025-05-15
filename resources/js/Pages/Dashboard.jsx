import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    // Redirección si no está autenticado
    useEffect(() => {
        if (!auth.user) {
            router.visit('/login');
        }
    }, [auth.user]);

    if (!auth.user) {
        return null; // O un loader mientras redirige
    }

    return (
        <>
            <Head title="Dashboard - FootballSocial" />
            
            <div className="min-h-screen bg-gray-100">
                {/* Contenido principal */}
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {/* Bienvenida personalizada */}
                                <div className="text-center mb-12">
                                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                        ¡Bienvenido{auth.user.gender === 'female' ? 'a' : ''} a FootballSocial, {auth.user.name}!
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Conecta con otros apasionados del fútbol
                                    </p>
                                </div>

                                {/* Botones de navegación */}
                                <div className="flex flex-col sm:flex-row justify-center gap-8">
                                    <Link 
                                        href="/players"
                                        className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition transform hover:scale-105 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            Ver Jugadores
                                        </div>
                                    </Link>
                                    
                                    <Link 
                                        href="/coaches"
                                        className="px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition transform hover:scale-105 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Ver Entrenadores
                                        </div>
                                    </Link>
                                </div>

                                {/* Mensaje adicional */}
                                <div className="mt-12 text-center text-gray-500">
                                    <p>Selecciona una opción para comenzar a explorar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}