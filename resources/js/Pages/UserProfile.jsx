import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function UserProfile({ user }) {
    const [copied, setCopied] = useState({ email: false, phone: false });

    if (!user) {
        return (
            <div className="container py-5 text-center text-danger">
                No se ha encontrado el usuario.
            </div>
        );
    }

    const handleCopy = (text, field) => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(prev => ({ ...prev, [field]: true }));
            setTimeout(() => setCopied(prev => ({ ...prev, [field]: false })), 1200);
        });
    };

    return (
        <>
            <Head title={`Perfil de ${user.name} ${user.last_name}`} />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-8 col-xxl-7">
                        <div className="card shadow-lg rounded-4 px-4 py-4">
                            <div className="d-flex flex-column align-items-center mb-4">
                                {user.profile_photo_url ? (
                                    <img
                                        src={user.profile_photo_url}
                                        alt={`${user.name} ${user.last_name}`}
                                        style={{
                                            width: '170px',
                                            height: '170px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            border: '4px solid #eee',
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-light"
                                        style={{
                                            width: '170px',
                                            height: '170px',
                                            borderRadius: '50%',
                                            border: '4px solid #eee'
                                        }}
                                    >
                                        <i className="bi bi-person-circle" style={{ fontSize: '6rem', color: '#bbb' }}></i>
                                    </div>
                                )}
                                <h2 className="mt-4 mb-1 fw-bold text-center">
                                    {user.name} {user.last_name}
                                </h2>
                                <span className={`badge mb-3 ${user.type === 'coach' ? 'bg-info' : 'bg-success'} fs-6`}>
                                    {user.type === 'coach' ? 'Entrenador' : 'Jugador'}
                                </span>
                            </div>
                            <hr className="mb-4" />
                            {/* Email y Teléfono, cada uno en su fila */}
                            <div className="mb-4">
                                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-2 gap-2">
                                    <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
                                        <i className="bi bi-envelope-at me-2" style={{ fontSize: 18 }}></i>
                                        <strong className="me-1">Email:</strong>
                                        <span className="text-truncate" style={{ maxWidth: '240px' }}>{user.email}</span>
                                    </div>
                                    {user.email && (
                                        <button
                                            className="btn btn-outline-secondary btn-sm ms-md-2"
                                            style={{ borderRadius: "50%" }}
                                            onClick={() => handleCopy(user.email, 'email')}
                                            title="Copiar email"
                                        >
                                            <i className={`bi ${copied.email ? 'bi-clipboard-check text-success' : 'bi-clipboard'}`} style={{ fontSize: '1.25rem' }}></i>
                                        </button>
                                    )}
                                    {copied.email && (
                                        <span className="ms-2 text-success small">Copiado</span>
                                    )}
                                </div>
                                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                                    <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
                                        <i className="bi bi-telephone me-2" style={{ fontSize: 18 }}></i>
                                        <strong className="me-1">Teléfono:</strong>
                                        <span className="text-truncate" style={{ maxWidth: '240px' }}>{user.phone}</span>
                                    </div>
                                    {user.phone && (
                                        <button
                                            className="btn btn-outline-secondary btn-sm ms-md-2"
                                            style={{ borderRadius: "50%" }}
                                            onClick={() => handleCopy(user.phone, 'phone')}
                                            title="Copiar teléfono"
                                        >
                                            <i className={`bi ${copied.phone ? 'bi-clipboard-check text-success' : 'bi-clipboard'}`} style={{ fontSize: '1.25rem' }}></i>
                                        </button>
                                    )}
                                    {copied.phone && (
                                        <span className="ms-2 text-success small">Copiado</span>
                                    )}
                                </div>
                            </div>
                            {/* Resto de datos */}
                            <div className="ps-1">
                                {user.type === 'coach' && (
                                    <>
                                        {user.team_managed && (
                                            <p className="mb-2">
                                                <i className="bi bi-people me-2"></i>
                                                <strong>Equipo que dirige:</strong> {user.team_managed}
                                            </p>
                                        )}
                                        <p className="mb-2">
                                            <i className="bi bi-mortarboard me-2"></i>
                                            <strong>Licencia:</strong> {user.coaching_license}
                                        </p>
                                    </>
                                )}
                                {user.type === 'player' && (
                                    <>
                                        <p className="mb-2">
                                            <i className="bi bi-person-badge me-2"></i>
                                            <strong>Posición:</strong> {user.position}
                                        </p>
                                        <p className="mb-2">
                                            <i className="bi bi-people me-2"></i>
                                            <strong>Equipo actual:</strong> {user.current_team}
                                        </p>
                                    </>
                                )}
                                {user.bio && (
                                    <div className="mt-3">
                                        <i className="bi bi-file-person me-2"></i>
                                        <strong>Biografía:</strong>
                                        <p className="mt-1 ms-4 text-muted">{user.bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
