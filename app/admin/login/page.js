'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.error || 'Email o contraseña incorrectos');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className="container">
                <div className={styles.loginCard}>
                    <h1 className={styles.loginTitle}>🔐 Panel Administrativo</h1>
                    <p className={styles.loginSubtitle}>
                        Ingresa tus credenciales para continuar
                    </p>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="admin@albanileria.com"
                                required
                                autoFocus
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={styles.input}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className={styles.error}>
                                ❌ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            disabled={loading}
                        >
                            {loading ? '⏳ Ingresando...' : '🔓 Ingresar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
