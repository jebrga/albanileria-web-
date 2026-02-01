'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import configData from '@/data/config.json';
import styles from './page.module.css';

export default function AdminPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (password === configData.settings.adminPassword) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Contraseña incorrecta');
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.adminPage}>
                <div className="container">
                    <div className={styles.loginCard}>
                        <h1 className={styles.loginTitle}>Panel Administrativo</h1>
                        <p className={styles.loginSubtitle}>Ingresa la contraseña para continuar</p>

                        <form onSubmit={handleLogin} className={styles.loginForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="password" className={styles.label}>
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa la contraseña"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <div className={styles.error}>
                                    ❌ {error}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                🔓 Ingresar
                            </button>

                            <p className={styles.hint}>
                                💡 Contraseña por defecto: <code>admin123</code>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Panel Administrativo</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="btn btn-outline"
                    >
                        🔒 Cerrar Sesión
                    </button>
                </div>

                <div className={styles.dashboardGrid}>
                    <div
                        className={styles.dashboardCard}
                        onClick={() => router.push('/admin/servicios')}
                    >
                        <div className={styles.cardIcon}>🛠️</div>
                        <h2>Gestionar Servicios</h2>
                        <p>Agregar, editar o eliminar servicios disponibles</p>
                        <span className={styles.cardLink}>Ver servicios →</span>
                    </div>

                    <div
                        className={styles.dashboardCard}
                        onClick={() => router.push('/admin/precios')}
                    >
                        <div className={styles.cardIcon}>💰</div>
                        <h2>Actualizar Precios</h2>
                        <p>Modificar precios de servicios y opciones</p>
                        <span className={styles.cardLink}>Actualizar precios →</span>
                    </div>

                    <div className={styles.infoCard}>
                        <h3>Información del Sistema</h3>
                        <div className={styles.infoGrid}>
                            <div>
                                <span className={styles.infoLabel}>Empresa:</span>
                                <span>{configData.company.name}</span>
                            </div>
                            <div>
                                <span className={styles.infoLabel}>Moneda:</span>
                                <span>{configData.settings.currency}</span>
                            </div>
                            <div>
                                <span className={styles.infoLabel}>Teléfono:</span>
                                <span>{configData.company.phone}</span>
                            </div>
                            <div>
                                <span className={styles.infoLabel}>Email:</span>
                                <span>{configData.company.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.note}>
                    <p>
                        <strong>Nota:</strong> Este es un panel administrativo básico.
                        Los cambios realizados solo afectarán los datos en el archivo JSON local.
                        Para una solución de producción, se recomienda implementar una base de datos
                        y sistema de autenticación robusto.
                    </p>
                </div>
            </div>
        </div>
    );
}
