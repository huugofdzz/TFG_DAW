import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Sidebar Desktop */}
            <Sidebar />
            
            {/* Sidebar Mobile (solo visible cuando se activa) */}
            {isMobileMenuOpen && (
                <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Navbar */}
            <Navbar onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

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
export default Layout;