import { Head } from '@inertiajs/react';

export default function Players({ players }) {
    return (
        <>
            <Head title="Jugadores" />

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="h1 fw-bold text-success">Jugadores Registrados</h2>
                    <p className="text-muted">Explora los perfiles de jugadores disponibles en la plataforma.</p>
                </div>

                <div className="row">
                    {players.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-muted">No hay jugadores registrados.</p>
                        </div>
                    ) : (
                        players.map(player => (
                            <div className="col-md-4 mb-4" key={player.id}>
                                <div className="card shadow-sm h-100">
                                    {player.profilePhoto && (
                                        <img
                                            src={`/storage/${player.profilePhoto}`}
                                            alt={`${player.name} ${player.lastName}`}
                                            className="card-img-top"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{player.name} {player.lastName}</h5>
                                        <p className="mb-1"><strong>Posición:</strong> {player.position}</p>
                                        {player.currentTeam && (
                                            <p className="mb-1"><strong>Equipo actual:</strong> {player.currentTeam}</p>
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
            </div>
        </>
    );
}
