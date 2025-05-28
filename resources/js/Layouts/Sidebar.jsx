import { Link, usePage } from '@inertiajs/react';

// Helper para determinar si la ruta está activa
function isActive(href) {
    return window.location.pathname === href;
}

function Sidebar({ isMobile = false, onClose = () => {} }) {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth?.user;

    const navClass = (href) =>
        `d-block px-4 py-3 text-white text-decoration-none mb-2 rounded sidebar-link${isActive(href) ? ' active-sidebar-link' : ''}`;

    const sidebarClass = `${isMobile ? 'd-lg-none' : 'd-none d-lg-block'} position-fixed bg-success text-white`;
    const sidebarStyle = {
        width: isMobile ? '100%' : '300px',
        zIndex: isMobile ? 1040 : 1020,
        top: 0,
        left: 0,
        height: '100vh',
        overflowY: 'auto',
        boxShadow: isMobile ? '2px 0 16px rgba(0,0,0,0.06)' : 'none'
    };

    return (
        <div className={sidebarClass} style={sidebarStyle}>
            {/* Logo grande y pegado arriba */}
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '5px 20px 12px 20px',
                background: 'inherit',
                position: 'sticky',
                top: 0,
                left: 0,
                zIndex: 999,
                boxSizing: 'border-box'
            }}>
                <img 
                    src="/images/logo.png" 
                    alt="FootballSocial Logo" 
                    style={{ width: '72px', height: '72px', marginRight: '16px', objectFit: 'contain' }}
                />
                <span className="h3 mb-0 fw-bold d-none d-md-block" style={{lineHeight: '1'}}>FootballSocial</span>
            </div>

            {/* Menú con iconos */}
            <div className="p-4 pt-2">
                <nav>
                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/"
                                className={navClass('/')}
                                onClick={onClose}
                            >
                                <i className="bi bi-house-door-fill me-3"></i> Inicio
                            </Link>
                            <Link
                                href="/login"
                                className={navClass('/login')}
                                onClick={onClose}
                            >
                                <i className="bi bi-box-arrow-in-right me-3"></i> Iniciar sesión
                            </Link>
                            <Link
                                href="/register"
                                className={navClass('/register')}
                                onClick={onClose}
                            >
                                <i className="bi bi-person-plus-fill me-3"></i> Registrarse
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/dashboard"
                                className={navClass('/dashboard')}
                                onClick={onClose}
                            >
                                <i className="bi bi-house-fill me-3"></i> Inicio
                            </Link>
                            <Link
                                href="/profile"
                                className={navClass('/profile')}
                                onClick={onClose}
                            >
                                <i className="bi bi-person-circle me-3"></i> Perfil
                            </Link>
                            <Link
                                href="/coaches"
                                className={navClass('/coaches')}
                                onClick={onClose}
                            >
                                <i className="bi bi-person-badge-fill me-3"></i> Ver Entrenadores
                            </Link>
                            <Link
                                href="/players"
                                className={navClass('/players')}
                                onClick={onClose}
                            >
                                <i className="bi bi-people-fill me-3"></i> Ver Jugadores
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            {/* CSS para el botón activo y el hover */}
            <style>{`
                .active-sidebar-link {
                    background: #14532d !important;
                    color: #fff !important;
                    font-weight: bold;
                    border-left: 5px solid #28a745;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                    border-radius: 12px;
                    transition: all 0.15s;
                }
                .sidebar-link:hover {
                    background: #187246;
                    color: #fff;
                }
                .sidebar-link i {
                    font-size: 1.5rem;
                    vertical-align: middle;
                }
            `}</style>
        </div>
    );
}

export default Sidebar;
