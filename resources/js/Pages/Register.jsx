import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Register() {
    const [userType, setUserType] = useState('player');
    const [formData, setFormData] = useState({
        type: 'player',
        name: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        position: '',
        secondaryPosition: '',
        currentTeam: '',
        bio: '',
        profilePhoto: null,
        // Campos específicos de entrenador
        teamManaged: '',
        coachingLicense: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const playerPositions = [
        'Portero', 'Defensa central', 'Lateral derecho', 'Lateral izquierdo',
        'Mediocentro defensivo', 'Mediocentro', 'Mediocentro ofensivo',
        'Extremo derecho', 'Extremo izquierdo', 'Delantero centro'
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres";
        }
        
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Las contraseñas no coinciden";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Aquí iría la lógica para enviar el formulario
            console.log('Datos enviados:', formData);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h2 className="h4 mb-0">Registro en FootballSocial</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Selección de tipo de usuario */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">¿Eres jugador o entrenador?</label>
                                    <select 
                                        className="form-select"
                                        value={userType}
                                        onChange={(e) => {
                                            setUserType(e.target.value);
                                            setFormData(prev => ({ ...prev, type: e.target.value }));
                                        }}
                                    >
                                        <option value="player">Jugador</option>
                                        <option value="coach">Entrenador</option>
                                    </select>
                                </div>

                                {/* Campos comunes */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Nombre de usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Correo electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Contraseña</label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                            </button>
                                            {errors.password && (
                                                <div className="invalid-feedback">{errors.password}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Confirmar Contraseña</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.password_confirmation && (
                                            <div className="invalid-feedback">{errors.password_confirmation}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Número de teléfono</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Campos específicos para jugadores */}
                                {userType === 'player' && (
                                    <>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label">Posición principal</label>
                                                <select
                                                    className="form-select"
                                                    name="position"
                                                    value={formData.position}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Selecciona tu posición</option>
                                                    {playerPositions.map(pos => (
                                                        <option key={pos} value={pos}>{pos}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Posición secundaria (opcional)</label>
                                                <select
                                                    className="form-select"
                                                    name="secondaryPosition"
                                                    value={formData.secondaryPosition}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">No tengo</option>
                                                    {playerPositions.map(pos => (
                                                        <option key={pos} value={pos}>{pos}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Equipo actual (opcional)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="currentTeam"
                                                value={formData.currentTeam}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Descripción breve</label>
                                            <textarea
                                                className="form-control"
                                                name="bio"
                                                rows="3"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                placeholder="Describe tu estilo de juego, fortalezas, etc."
                                            ></textarea>
                                        </div>
                                    </>
                                )}

                                {/* Campos específicos para entrenadores */}
                                {userType === 'coach' && (
                                    <>
                                        <div className="mb-4">
                                            <label className="form-label">Equipo que diriges (opcional)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="teamManaged"
                                                value={formData.teamManaged}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Licencia de entrenador</label>
                                            <select
                                                className="form-select"
                                                name="coachingLicense"
                                                value={formData.coachingLicense}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Selecciona tu licencia</option>
                                                <option value="UEFA A">UEFA A</option>
                                                <option value="UEFA B">UEFA B</option>
                                                <option value="UEFA C">UEFA C</option>
                                                <option value="Nacional">Nacional</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {/* Foto de perfil (común para ambos) */}
                                <div className="mb-4">
                                    <label className="form-label">Foto de perfil</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="profilePhoto"
                                        onChange={handleChange}
                                        accept="image/*"
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success btn-lg">
                                        Registrarse
                                    </button>
                                </div>

                                <div className="mt-3 text-center">
                                    <span>¿Ya tienes cuenta? </span>
                                    <Link href="/login" className="text-success">Inicia sesión</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}