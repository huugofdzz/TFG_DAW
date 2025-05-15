import { Link, usePage } from '@inertiajs/react';

function Sidebar({ isMobile = false, onClose = () => {} }) {
    const { props } = usePage();
    const isLoggedIn = props.auth?.user;

    return (
        <div className={`${isMobile ? 'd-lg-none' : 'd-none d-lg-block'} position-fixed h-100 bg-success text-white`} 
             style={{
                 width: isMobile ? '100%' : '300px',
                 zIndex: isMobile ? 1040 : 1020,
                 top: isMobile ? '56px' : 0,
                 left: 0,
                 overflowY: 'auto'
             }}>
            <div className="p-4">
                {/* Logo */}
                <div className="d-flex align-items-center mb-3">
                    <div>
                        <img 
                            src="/images/logo.png" 
                            alt="FootballSocial Logo" 
                            style={{ width: '60px', height: '60px' }}
                        />
                    </div>
                    <h1 className="h4 mb-0 fw-bold">FootballSocial</h1>
                </div>

                {/* Menú Principal */}
                <nav>
                    <Link 
                        href="/" 
                        className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                        activeClassName="bg-white text-success"
                        onClick={onClose}
                    >
                        <i className="bi bi-house-door me-3"></i> Inicio
                    </Link>
                    
                    <Link 
                        href="/search" 
                        className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                        activeClassName="bg-white text-success"
                        onClick={onClose}
                    >
                        <i className="bi bi-search me-3"></i> Buscar
                    </Link>

                    {isLoggedIn && (
                        <>
                            <Link 
                                href="/profile" 
                                className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                                activeClassName="bg-white text-success"
                                onClick={onClose}
                            >
                                <i className="bi bi-person me-3"></i> Perfil
                            </Link>
                            <Link 
                                href="/dashboard" 
                                className="d-block px-4 py-3 text-white text-decoration-none mb-2 rounded hover-bg-white-10"
                                activeClassName="bg-white text-success"
                                onClick={onClose}
                            >
                                <i className="bi bi-speedometer2 me-3"></i> Dashboard
                            </Link>
                        </>
                    )}
                </nav>

                {/* Menú adicional para usuarios logueados */}
                {isLoggedIn && (
                    <div className="mt-5 pt-3 border-top border-white-10">
                        <h6 className="px-4 mb-3 text-white-50">MI EQUIPO</h6>
                        <Link 
                            href="/team" 
                            className="d-block px-4 py-2 text-white text-decoration-none mb-1 rounded hover-bg-white-10"
                            onClick={onClose}
                        >
                            <i className="bi bi-people me-3"></i> Mi equipo
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Sidebar;