import { Head, Link } from '@inertiajs/react';

export default function Coaches({ coaches }) {
    if (!coaches || !coaches.data) {
        return <div className="container py-5 text-center text-danger">No se han podido cargar los entrenadores.</div>;
    }

    return (
        <>
            <Head title="Entrenadores" />
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="h1 fw-bold text-success">Entrenadores Registrados</h2>
                    <p className="text-muted">Descubre entrenadores calificados disponibles en la plataforma.</p>
                </div>

                <div className="row">
                    {coaches.data.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-muted">No hay entrenadores registrados.</p>
                        </div>
                    ) : (
                        coaches.data.map(coach => (
                            <div className="col-md-4 mb-4" key={coach.id}>
                                <div className="card shadow-sm h-100">
                                    {coach.profile_photo_url ? (
                                        <img
                                            src={coach.profile_photo_url}
                                            alt={`${coach.name} ${coach.last_name}`}
                                            className="card-img-top"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center" style={{ height: '250px', background: '#f0f0f0' }}>
                                            <i className="bi bi-person-badge" style={{ fontSize: '4rem', color: '#bbb' }}></i>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link
                                                href={`/users/${coach.id}`}
                                                className="text-decoration-none fw-bold text-info"
                                                style={{ fontSize: '1.2rem' }}
                                            >
                                                {coach.name} {coach.last_name}
                                            </Link>
                                        </h5>
                                        {coach.team_managed && (
                                            <p className="mb-1"><strong>Equipo:</strong> {coach.team_managed}</p>
                                        )}
                                        <p className="mb-1"><strong>Licencia:</strong> {coach.coaching_license}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Paginación */}
                {coaches.links && (
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            {coaches.links.map((link, idx) => (
                                <li
                                    key={idx}
                                    className={`page-item${link.active ? ' active' : ''}${!link.url ? ' disabled' : ''}`}
                                >
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            className="page-link"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            className="page-link"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
}
