import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const playerPositions = [
        'Portero', 'Defensa central', 'Lateral derecho', 'Lateral izquierdo',
        'Mediocentro defensivo', 'Mediocentro', 'Mediocentro ofensivo',
        'Extremo derecho', 'Extremo izquierdo', 'Delantero centro'
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
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
        teamManaged: '',
        coachingLicense: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('player');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, files ? files[0] : value);
    };

    const handleUserTypeChange = (type) => {
        setUserType(type);
        setData('type', type);
        // Reset campos específicos al cambiar tipo
        if (type === 'player') {
            reset('teamManaged', 'coachingLicense');
        } else {
            reset('position', 'secondaryPosition', 'currentTeam', 'bio');
        }
    };

    const validateForm = () => {
        const validationErrors = {};
        
        if (data.password.length < 8) {
            validationErrors.password = "La contraseña debe tener al menos 8 caracteres";
        }
        
        if (data.password !== data.password_confirmation) {
            validationErrors.password_confirmation = "Las contraseñas no coinciden";
        }
        
        return validationErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            return; // Los errores se mostrarán automáticamente
        }

        post('/register', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Redirección manejada por el controlador
            },
            onError: () => {
                // Los errores del servidor se manejan automáticamente
            }
        });
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
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Selección de tipo de usuario */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">¿Eres jugador o entrenador?</label>
                                    <select 
                                        className="form-select"
                                        value={userType}
                                        onChange={(e) => handleUserTypeChange(e.target.value)}
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
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Apellido</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            name="lastName"
                                            value={data.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Nombre de usuario</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                            name="username"
                                            value={data.username}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Correo electrónico</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                                                value={data.password}
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
                                            value={data.password_confirmation}
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
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>

                                {/* Campos específicos para jugadores */}
                                {userType === 'player' && (
                                    <>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label">Posición principal</label>
                                                <select
                                                    className={`form-select ${errors.position ? 'is-invalid' : ''}`}
                                                    name="position"
                                                    value={data.position}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Selecciona tu posición</option>
                                                    {playerPositions.map(pos => (
                                                        <option key={pos} value={pos}>{pos}</option>
                                                    ))}
                                                </select>
                                                {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Posición secundaria (opcional)</label>
                                                <select
                                                    className={`form-select ${errors.secondaryPosition ? 'is-invalid' : ''}`}
                                                    name="secondaryPosition"
                                                    value={data.secondaryPosition}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">No tengo</option>
                                                    {playerPositions.map(pos => (
                                                        <option key={pos} value={pos}>{pos}</option>
                                                    ))}
                                                </select>
                                                {errors.secondaryPosition && <div className="invalid-feedback">{errors.secondaryPosition}</div>}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Equipo actual (opcional)</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.currentTeam ? 'is-invalid' : ''}`}
                                                name="currentTeam"
                                                value={data.currentTeam}
                                                onChange={handleChange}
                                            />
                                            {errors.currentTeam && <div className="invalid-feedback">{errors.currentTeam}</div>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Descripción breve</label>
                                            <textarea
                                                className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                                                name="bio"
                                                rows="3"
                                                value={data.bio}
                                                onChange={handleChange}
                                                placeholder="Describe tu estilo de juego, fortalezas, etc."
                                            ></textarea>
                                            {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
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
                                                className={`form-control ${errors.teamManaged ? 'is-invalid' : ''}`}
                                                name="teamManaged"
                                                value={data.teamManaged}
                                                onChange={handleChange}
                                            />
                                            {errors.teamManaged && <div className="invalid-feedback">{errors.teamManaged}</div>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Licencia de entrenador</label>
                                            <select
                                                className={`form-select ${errors.coachingLicense ? 'is-invalid' : ''}`}
                                                name="coachingLicense"
                                                value={data.coachingLicense}
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
                                            {errors.coachingLicense && <div className="invalid-feedback">{errors.coachingLicense}</div>}
                                        </div>
                                    </>
                                )}

                                {/* Foto de perfil */}
                                <div className="mb-4">
                                    <label className="form-label">Foto de perfil</label>
                                    <input
                                        type="file"
                                        className={`form-control ${errors.profilePhoto ? 'is-invalid' : ''}`}
                                        name="profilePhoto"
                                        onChange={handleChange}
                                        accept="image/*"
                                    />
                                    {errors.profilePhoto && <div className="invalid-feedback">{errors.profilePhoto}</div>}
                                    <small className="text-muted">Formatos aceptados: JPG, PNG (Máx. 2MB)</small>
                                </div>

                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-success btn-lg"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Registrando...
                                            </>
                                        ) : 'Registrarse'}
                                    </button>
                                </div>

                                <div className="mt-3 text-center">
                                    <span>¿Ya tienes cuenta? </span>
                                    <Link href="/login" className="text-success fw-bold">Inicia sesión</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}