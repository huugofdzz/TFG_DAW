import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Layout({ children }) {
    const { props } = usePage();
    const isLoggedIn = props.auth?.user;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Sidebar - Desktop */}
            <div className="d-none d-lg-block position-fixed h-100 bg-success text-white" style={{
                width: '300px',
                zIndex: 1020,
                top: 0,
                left: 0,
                overflowY: 'auto'
            }}>
                <div className="p-4">
                    {/* Logo */}
                    <div className="d-flex align-items-center mb-3 ">
                        <div>
                            <img 
                                src="/images/logo.png" 
                                alt="FootballSocial Logo" 
                                style={{ width: '60px', height: '60px' }}
                            />
                        </div>
                        <h1 className="h4 mb-0 fw-bold">FootballSocial</h1>
                    </div>

                    {/* Menú */}
                    <nav>
                        <Link 
                            href="/" 
                            className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                            activeClassName="bg-white text-success"
                        >
                            <i className="bi bi-house-door me-3"></i> Inicio
                        </Link>
                        <Link 
                            href="/search" 
                            className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                            activeClassName="bg-white text-success"
                        >
                            <i className="bi bi-search me-3"></i> Buscar
                        </Link>
                        <Link 
                            href={isLoggedIn ? '/profile' : '/login'} 
                            className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                            activeClassName="bg-white text-success"
                        >
                            <i className="bi bi-person me-3"></i> Perfil
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Sidebar - Mobile */}
            {isMobileMenuOpen && (
                <div className="d-lg-none position-fixed w-100 h-100 bg-success text-white" style={{
                    zIndex: 1040,
                    top: '56px',
                    left: 0
                }}>
                    <div className="p-4">
                        <nav>
                            <Link 
                                href="/" 
                                className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="bi bi-house-door me-3"></i> Inicio
                            </Link>
                            <Link 
                                href="/search" 
                                className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="bi bi-search me-3"></i> Buscar
                            </Link>
                            <Link 
                                href={isLoggedIn ? '/profile' : '/login'} 
                                className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="bi bi-person me-3"></i> Perfil
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

            {/* Navbar Superior */}
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
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                                <i className="bi bi-person-fill me-2"></i>
                                <span className="d-none d-md-inline">Mi Perfil</span>
                            </button>
                            
                            <ul className={`dropdown-menu dropdown-menu-end ${isProfileOpen ? 'show' : ''}`}
                                style={{ minWidth: '220px' }}>
                                {isLoggedIn ? (
                                    <>
                                        <li>
                                            <Link className="dropdown-item py-2" href="/profile">
                                                <i className="bi bi-person-circle me-2"></i> Ver perfil
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link className="dropdown-item py-2 text-danger" href="/logout">
                                                <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link className="dropdown-item py-2" href="/login">
                                                <i className="bi bi-box-arrow-in-right me-2"></i> Iniciar sesión
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item py-2" href="/Pages/Register">
                                                <i className="bi bi-person-plus me-2"></i> Registrarse
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido Principal */}
            <main style={{
                marginLeft: '300px',
                marginTop: '80px',
                padding: '2rem',
                minHeight: 'calc(100vh - 80px)'
            }}>
                {children}
            </main>
        </div>
    );
}