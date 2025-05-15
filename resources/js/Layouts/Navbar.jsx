import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
function Navbar({ onToggleMobileMenu }) {
    const { props } = usePage();
    const isLoggedIn = props.auth?.user;
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top" style={{
            left: '300px',
            width: 'calc(100% - 300px)',
            padding: '1rem 2rem',
            zIndex: 1030
        }}>
            <div className="container-fluid px-0">
                {/* Botón menú móvil */}
                <button 
                    className="navbar-toggler d-lg-none me-3" 
                    type="button"
                    onClick={onToggleMobileMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Barra de búsqueda */}
                <div className="d-flex align-items-center flex-grow-1" style={{ maxWidth: '500px' }}>
                    <div className="input-group">
                        <input 
                            type="search" 
                            className="form-control bg-light" 
                            placeholder="Buscar partidos, jugadores..." 
                            style={{ borderRadius: '20px 0 0 20px' }}
                        />
                        <button className="btn btn-light" type="button" style={{ borderRadius: '0 20px 20px 0' }}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                {/* Menú de perfil */}
                <div className="ms-auto d-flex align-items-center">
                    {isLoggedIn ? (
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255,255,255,0.3)'
                                }}
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <img 
                                    src={props.auth.user.profile_photo_url || '/images/default-avatar.png'} 
                                    alt="Perfil" 
                                    className="rounded-circle me-2" 
                                    width="28" 
                                    height="28"
                                />
                                <span className="d-none d-md-inline">{props.auth.user.name}</span>
                            </button>
                            
                            <ul className={`dropdown-menu dropdown-menu-end ${isProfileOpen ? 'show' : ''}`}
                                style={{ minWidth: '220px' }}>
                                <li>
                                    <Link className="dropdown-item py-2" href="/profile">
                                        <i className="bi bi-person-circle me-2"></i> Mi perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item py-2" href="/settings">
                                        <i className="bi bi-gear me-2"></i> Configuración
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link 
                                        className="dropdown-item py-2 text-danger" 
                                        href="/logout"
                                        method="post"
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link href="/login" className="btn btn-outline-light">
                                Iniciar sesión
                            </Link>
                            <Link href="/register" className="btn btn-light text-success">
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;