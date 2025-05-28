import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function UserSearch({ users, query }) {
    const [search, setSearch] = useState(query || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get('/search', { q: search });
    };

    return (
        <>
            <Head title="Buscar usuarios" />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form className="mb-4 d-flex" onSubmit={handleSubmit}>
                            <input
                                type="search"
                                className="form-control form-control-lg"
                                placeholder="Buscar por nombre de usuario"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                autoFocus
                            />
                            <button type="submit" className="btn btn-success btn-lg ms-2">
                                <i className="bi bi-search"></i>
                            </button>
                        </form>
                        {users && users.length > 0 ? (
                            <div className="list-group">
                                {users.map(user => (
                                    <Link
                                        key={user.id}
                                        href={`/users/${user.id}`}
                                        className="list-group-item list-group-item-action d-flex align-items-center"
                                    >
                                        {user.profile_photo_url ? (
                                            <img
                                                src={user.profile_photo_url}
                                                alt={user.username}
                                                className="rounded-circle me-3"
                                                style={{ width: 48, height: 48, objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <i className="bi bi-person-circle me-3" style={{ fontSize: 32, color: '#bbb' }}></i>
                                        )}
                                        <div>
                                            <span className="fw-bold">{user.name} {user.last_name}</span>
                                            <br />
                                            <span className="text-muted">@{user.username}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : query ? (
                            <div className="alert alert-warning text-center">
                                No se encontraron usuarios con ese nombre de usuario.
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}
