import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layouts/Layout";
import 'bootstrap-icons/font/bootstrap-icons.css';


createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const pagePath = `./Pages/${name}.jsx`;
    
    // Verificar si la página existe
    if (!pages[pagePath]) {
      throw new Error(`Page not found: ${pagePath}`);
    }

    // Obtener el módulo de la página
    const page = pages[pagePath];
    
    // Asignar layout por defecto si no tiene uno
    if (page.default && !page.default.layout) {
      page.default.layout = (page) => <Layout>{page}</Layout>;
    }
    
    return page;
  },
  
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});