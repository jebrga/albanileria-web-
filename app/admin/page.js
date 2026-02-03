'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('config');
    const [config, setConfig] = useState({});
    const [services, setServices] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [comments, setComments] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    // Verificar sesión
    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const res = await fetch('/api/admin/session');
            const data = await res.json();

            if (!data.authenticated) {
                router.push('/admin/login');
                return;
            }

            setUser(data.user);
            setLoading(false);
            fetchData();
        } catch (error) {
            console.error('Session check error:', error);
            router.push('/admin/login');
        }
    };

    const fetchData = async () => {
        try {
            const [configRes, servicesRes, discountsRes, commentsRes] = await Promise.all([
                fetch('/api/config'),
                fetch('/api/services'),
                fetch('/api/discounts'),
                fetch('/api/comments')
            ]);

            const configData = await configRes.json();
            const servicesData = await servicesRes.json();
            const discountsData = await discountsRes.json();
            const commentsData = await commentsRes.json();

            setConfig(configData);
            setServices(servicesData);
            setDiscounts(discountsData);
            setComments(commentsData.filter(c => !c.isApproved)); // Solo pendientes
            setDataLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setDataLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleConfigUpdate = async (key, value) => {
        try {
            const res = await fetch('/api/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });

            if (res.ok) {
                setConfig({ ...config, [key]: value });
                alert('✅ Configuración actualizada');
            }
        } catch (error) {
            alert('❌ Error al actualizar');
        }
    };

    if (loading || dataLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Cargando panel...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className={styles.adminPage}>
            <div className="container">
                <div className={styles.adminHeader}>
                    <div>
                        <h1 className={styles.adminTitle}>🔧 Panel Administrativo</h1>
                        <p className={styles.adminSubtitle}>
                            Bienvenido, {user.email}
                        </p>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline">
                        🚪 Cerrar Sesión
                    </button>
                </div>

                {/* Tabs de navegación */}
                <div className={styles.tabs}>
                    <button
                        className={activeTab === 'config' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('config')}
                    >
                        ⚙️ Configuración
                    </button>
                    <button
                        className={activeTab === 'services' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('services')}
                    >
                        🛠️ Servicios
                    </button>
                    <button
                        className={activeTab === 'discounts' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('discounts')}
                    >
                        💰 Descuentos
                    </button>
                    <button
                        className={activeTab === 'comments' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('comments')}
                    >
                        💬 Comentarios {comments.length > 0 && `(${comments.length})`}
                    </button>
                </div>

                {/* Contenido según tab */}
                <div className={styles.tabContent}>
                    {activeTab === 'config' && (
                        <ConfigSection config={config} onUpdate={handleConfigUpdate} />
                    )}
                    {activeTab === 'services' && (
                        <ServicesSection services={services} onRefresh={fetchData} />
                    )}
                    {activeTab === 'discounts' && (
                        <DiscountsSection discounts={discounts} onRefresh={fetchData} />
                    )}
                    {activeTab === 'comments' && (
                        <CommentsSection comments={comments} onRefresh={fetchData} />
                    )}
                </div>
            </div>
        </div>
    );
}

// Sección de Configuración
function ConfigSection({ config, onUpdate }) {
    const [formData, setFormData] = useState({
        phone: config.phone || '',
        email: config.email || '',
        zone: config.zone || '',
        company_name: config.company_name || ''
    });

    useEffect(() => {
        setFormData({
            phone: config.phone || '',
            email: config.email || '',
            zone: config.zone || '',
            company_name: config.company_name || ''
        });
    }, [config]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('[CONFIG] Submitting form', { formData, config });

        let updateCount = 0;
        for (const [key, value] of Object.entries(formData)) {
            // Solo actualizar campos que tengan valor y sean diferentes al actual
            const currentValue = config[key] || '';
            const newValue = value || '';

            console.log(`[CONFIG] Checking ${key}:`, { current: currentValue, new: newValue });

            if (newValue && newValue !== currentValue) {
                console.log(`[CONFIG] Updating ${key} from "${currentValue}" to "${newValue}"`);
                await onUpdate(key, newValue);
                updateCount++;
            }
        }

        if (updateCount === 0) {
            alert('ℹ️ No hay cambios para guardar');
        }
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>⚙️ Configuración General</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label>📱 Teléfono / WhatsApp</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="5491161234567"
                            className={styles.input}
                        />
                        <small>Formato: 5491161234567 (sin espacios ni símbolos)</small>
                    </div>

                    <div className={styles.formGroup}>
                        <label>📧 Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="ezequielgauna@albanileria.com"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>📍 Zona de Trabajo</label>
                        <input
                            type="text"
                            value={formData.zone}
                            onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                            placeholder="GBA Norte (Los Polvorines, Grand Bourg)"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>🏢 Nombre de Empresa</label>
                        <input
                            type="text"
                            value={formData.company_name}
                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                            placeholder="Trabajos de Albañilería - Ezequiel Gauna"
                            className={styles.input}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    💾 Guardar Cambios
                </button>
            </form>
        </div>
    );
}

// Sección de Servicios
function ServicesSection({ services, onRefresh }) {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleEdit = (service) => {
        setEditingId(service.id);
        setEditData(service);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/services/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            });

            if (res.ok) {
                alert('✅ Servicio actualizado');
                setEditingId(null);
                onRefresh();
            }
        } catch (error) {
            alert('❌ Error al actualizar');
        }
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>🛠️ Gestión de Servicios y Precios</h2>

            <div className={styles.servicesTable}>
                {services.map(service => (
                    <div key={service.id} className={styles.serviceCard}>
                        {editingId === service.id ? (
                            // Modo edición
                            <div className={styles.editForm}>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className={styles.input}
                                />
                                <input
                                    type="number"
                                    value={editData.pricePerUnit}
                                    onChange={(e) => setEditData({ ...editData, pricePerUnit: parseFloat(e.target.value) })}
                                    className={styles.input}
                                    placeholder="Precio por m²"
                                />
                                <input
                                    type="number"
                                    value={editData.laborCost}
                                    onChange={(e) => setEditData({ ...editData, laborCost: parseFloat(e.target.value) })}
                                    className={styles.input}
                                    placeholder="Costo mano de obra"
                                />
                                <div className={styles.editActions}>
                                    <button onClick={handleSave} className="btn btn-primary">
                                        ✅ Guardar
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="btn btn-outline">
                                        ❌ Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Modo vista
                            <>
                                <div className={styles.serviceInfo}>
                                    <h3>{service.icon} {service.name}</h3>
                                    <p className={styles.servicePrices}>
                                        💵 Precio: <strong>${service.pricePerUnit.toLocaleString()}/{service.unit}</strong>
                                        <br />
                                        👷 Mano de obra: <strong>${service.laborCost.toLocaleString()}</strong>
                                    </p>
                                </div>
                                <button onClick={() => handleEdit(service)} className="btn btn-outline">
                                    ✏️ Editar
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Sección de Descuentos
function DiscountsSection({ discounts, onRefresh }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>💰 Descuentos en Efectivo</h2>

            <div className={styles.infoBox}>
                <p>
                    💡 Los descuentos se aplican automáticamente cuando el cliente calcule un presupuesto,
                    según el tamaño de la obra (m²).
                </p>
            </div>

            <div className={styles.discountsList}>
                {discounts.map(discount => (
                    <div key={discount.id} className={styles.discountCard}>
                        <div className={styles.discountHeader}>
                            <h3>{discount.description}</h3>
                            <span className={styles.discountBadge}>
                                {discount.percent}% OFF
                            </span>
                        </div>
                        <p className={styles.discountRange}>
                            📏 Rango: {discount.minArea || 0}m² - {discount.maxArea || '∞'}m²
                        </p>
                        <div className={styles.discountToggle}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={discount.isActive}
                                    onChange={() => {/* Implementar toggle */ }}
                                />
                                {discount.isActive ? '✅ Activo' : '❌ Inactivo'}
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.infoBox} style={{ marginTop: '2rem' }}>
                <h4>📝 Mensaje Automático para WhatsApp:</h4>
                <pre className={styles.codeBlock}>
                    "¿Confirmamos descuentos del 8-10% en efectivo según el trabajo?"
                </pre>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Este mensaje se incluirá automáticamente al enviar presupuestos por WhatsApp.
                </p>
            </div>
        </div>
    );
}

// Sección de Comentarios
function CommentsSection({ comments, onRefresh }) {
    const handleApprove = async (id) => {
        try {
            const res = await fetch(`/api/comments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isApproved: true })
            });

            if (res.ok) {
                alert('✅ Comentario aprobado');
                onRefresh();
            }
        } catch (error) {
            alert('❌ Error al aprobar');
        }
    };

    const handleReject = async (id) => {
        if (!confirm('¿Eliminar este comentario?')) return;

        try {
            const res = await fetch(`/api/comments/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                alert('✅ Comentario eliminado');
                onRefresh();
            }
        } catch (error) {
            alert('❌ Error al eliminar');
        }
    };

    if (comments.length === 0) {
        return (
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>💬 Moderación de Comentarios</h2>
                <div className={styles.emptyState}>
                    <p>✅ No hay comentarios pendientes de moderación</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                💬 Comentarios Pendientes ({comments.length})
            </h2>

            <div className={styles.commentsList}>
                {comments.map(comment => (
                    <div key={comment.id} className={styles.commentCard}>
                        <div className={styles.commentHeader}>
                            <strong>{comment.name}</strong>
                            <span className={styles.commentRating}>
                                {'⭐'.repeat(comment.rating)}
                            </span>
                        </div>
                        <p className={styles.commentService}>
                            Servicio: {comment.service}
                        </p>
                        <p className={styles.commentText}>
                            "{comment.comment}"
                        </p>
                        <div className={styles.commentActions}>
                            <button
                                onClick={() => handleApprove(comment.id)}
                                className="btn btn-primary"
                            >
                                ✅ Aprobar
                            </button>
                            <button
                                onClick={() => handleReject(comment.id)}
                                className="btn btn-outline"
                                style={{ borderColor: '#DC2626', color: '#DC2626' }}
                            >
                                ❌ Rechazar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
