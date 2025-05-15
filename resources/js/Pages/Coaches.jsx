import { Head } from '@inertiajs/react';

export default function Coaches({ coaches }) {
    return (
        <>
            <Head title="Entrenadores" />

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="h1 fw-bold text-success">Entrenadores Registrados</h2>
                    <p className="text-muted">Descubre entrenadores calificados disponibles en la plataforma.</p>
                </div>

                <div className="row">
                    {coaches.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-muted">No hay entrenadores registrados.</p>
                        </div>
                    ) : (
                        coaches.map(coach => (
                            <div className="col-md-4 mb-4" key={coach.id}>
                                <div className="card shadow-sm h-100">
                                    {coach.profilePhoto && (
                                        <img
                                            src={`/storage/${coach.profilePhoto}`}
                                            alt={`${coach.name} ${coach.lastName}`}
                                            className="card-img-top"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{coach.name} {coach.lastName}</h5>
                                        {coach.teamManaged && (
                                            <p className="mb-1"><strong>Equipo:</strong> {coach.teamManaged}</p>
                                        )}
                                        <p className="mb-1"><strong>Licencia:</strong> {coach.coachingLicense}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
