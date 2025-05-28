import { Head, Link } from '@inertiajs/react';

export default function Players({ players }) {
    if (!players || !players.data) {
        return <div className="container py-5 text-center text-danger">No se han podido cargar los jugadores.</div>;
    }

    return (
        <>
            <Head title="Jugadores" />
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="h1 fw-bold text-success">Jugadores Registrados</h2>
                    <p className="text-muted">Explora los perfiles de jugadores disponibles en la plataforma.</p>
                </div>

                <div className="row">
                    {players.data.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-muted">No hay jugadores registrados.</p>
                        </div>
                    ) : (
                        players.data.map(player => (
                            <div className="col-md-4 mb-4" key={player.id}>
                                <div className="card shadow-sm h-100">
                                    {player.profile_photo_url ? (
                                        <img
                                            src={player.profile_photo_url}
                                            alt={`${player.name} ${player.last_name}`}
                                            className="card-img-top"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center" style={{ height: '250px', background: '#f0f0f0' }}>
                                            <i className="bi bi-person-fill" style={{ fontSize: '4rem', color: '#bbb' }}></i>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link
                                                href={`/users/${player.id}`}
                                                className="text-decoration-none fw-bold text-success"
                                                style={{ fontSize: '1.2rem' }}
                                            >
                                                {player.name} {player.last_name}
                                            </Link>
                                        </h5>
                                        <p className="mb-1"><strong>Posición:</strong> {player.position}</p>
                                        {player.current_team && (
                                            <p className="mb-1"><strong>Equipo actual:</strong> {player.current_team}</p>
                                        )}
                                        {player.bio && (
                                            <p className="text-muted small mt-2">{player.bio}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Paginación */}
                {players.links && (
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            {players.links.map((link, idx) => (
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
