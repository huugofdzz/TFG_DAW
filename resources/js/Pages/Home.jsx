import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    {/* Hero Section */}
                    <div className="mb-5 p-4 bg-light rounded-3 shadow-sm">
                        <h1 className="display-5 fw-bold mb-4 text-success">
                            Conectando Talentos del Fútbol
                        </h1>
                        <p className="lead mb-4">
                            FootballSocial es la plataforma que revoluciona cómo los jugadores y entrenadores se conectan
                        </p>
                    </div>

                    {/* Objetivos */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-6">
                            <div className="h-100 p-4 bg-white rounded-3 shadow-sm border border-success border-2">
                                <h3 className="text-success mb-3">
                                    <i className="bi bi-person-badge me-2"></i>
                                    Para Jugadores
                                </h3>
                                <p className="mb-0">
                                    Aumenta tu visibilidad y muestra tu talento a cientos de entrenadores y ojeadores. 
                                    Crea tu perfil con estadísticas, videos destacados y logros.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-4 bg-white rounded-3 shadow-sm border border-success border-2">
                                <h3 className="text-success mb-3">
                                    <i className="bi bi-clipboard-data me-2"></i>
                                    Para Entrenadores
                                </h3>
                                <p className="mb-0">
                                    Encuentra el talento que necesita tu equipo con nuestro sistema avanzado de búsqueda. 
                                    Filtra por posición, habilidades y estadísticas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Llamada a la acción */}
                    <div className="p-5 bg-success text-white rounded-3 shadow">
                        <h2 className="mb-4">¡Únete a nuestra comunidad futbolística!</h2>
                        <p className="mb-4 fs-5">
                            Regístrate ahora y comienza a conectar con oportunidades que impulsarán tu carrera deportiva.
                        </p>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                            <Link 
                                href="/register" 
                                className="btn btn-light btn-lg px-4 gap-3"
                            >
                                Crear Cuenta <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                            <Link 
                                href="/login" 
                                className="btn btn-outline-light btn-lg px-4"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>

                    {/* Beneficios adicionales */}
                    <div className="row mt-5 g-4">
                        <div className="col-md-4">
                            <div className="p-3 text-center">
                                <i className="bi bi-people-fill text-success fs-1 mb-3"></i>
                                <h4>Comunidad Activa</h4>
                                <p>Conecta con miles de jugadores y entrenadores</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 text-center">
                                <i className="bi bi-graph-up text-success fs-1 mb-3"></i>
                                <h4>Colaboraciones increibles</h4>
                                <p>Entrenadores y jugadores de la máxima élite, confian en nosotros</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 text-center">
                                <i className="bi bi-calendar-event text-success fs-1 mb-3"></i>
                                <h4>Visibilidad única</h4>
                                <p>Nunca antes era tan accesible mostrarte al mundo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}