import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    if (!user) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-muted fs-4">Cargando usuario...</div>
            </div>
        );
    }

    return (
        <>
            <Head title="Dashboard - FootballSocial" />
            
            <div className="min-vh-100 bg-gray-100" style={{ paddingTop: "60px" }}>
                {/* Mensaje de bienvenida */}
                <div className="py-5">
                    <div className="container">
                        <div className="bg-white shadow rounded p-5 mb-5">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bold mb-3">
                                    ¡Bienvenido{user.gender === 'female' ? 'a' : ''} a FootballSocial, {user.name}!
                                </h1>
                                <p className="lead text-secondary">
                                    Conecta con otros apasionados del fútbol
                                </p>
                            </div>
                            
                            {/* Bloque de botones vistosos */}
                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 mb-5">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg d-flex flex-column align-items-center justify-content-center shadow"
                                    style={{ minWidth: '180px', borderRadius: '20px' }}
                                    onClick={() => { /* Acción futura: Ver jugadores */ }}
                                >
                                    <i className="bi bi-people-fill mb-2" style={{ fontSize: "2.5rem" }}></i>
                                    <span>Ver Jugadores</span>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg d-flex flex-column align-items-center justify-content-center shadow"
                                    style={{ minWidth: '180px', borderRadius: '20px' }}
                                    onClick={() => { /* Acción futura: Ver entrenadores */ }}
                                >
                                    <i className="bi bi-person-badge-fill mb-2" style={{ fontSize: "2.5rem" }}></i>
                                    <span>Ver Entrenadores</span>
                                </button>
                            </div>

                            <div className="text-center text-muted mt-4">
                                <p>Selecciona una opción para comenzar a explorar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
