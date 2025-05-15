// resources/js/Pages/Auth/Login.jsx
import { useState } from 'react';
import { router, Link, Head } from '@inertiajs/react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/login', formData, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <>
            <Head title="Iniciar sesión" />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white text-center">
                                <h4 className="mb-0">Iniciar sesión en FootballSocial</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Correo electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="remember"
                                            id="remember"
                                            checked={formData.remember}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="remember">
                                            Recordarme
                                        </label>
                                    </div>

                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Ingresar
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <span>¿No tienes cuenta? </span>
                                        <Link href="/register" className="text-primary">Regístrate</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
