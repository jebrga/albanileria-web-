'use client';

import { useState } from 'react';
import { useConfig } from '@/components/ConfigProvider';
import { openWhatsApp } from '@/lib/whatsapp';
import styles from './page.module.css';

export default function ContactoPage() {
    const { config } = useConfig();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleWhatsAppClick = () => {
        const message = '¡Hola! Me gustaría solicitar información sobre sus servicios de albañilería.';
        const encodedMessage = encodeURIComponent(message);
        const link = `https://wa.me/${config.phone}?text=${encodedMessage}`;
        openWhatsApp(link);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construir mensaje para WhatsApp con los datos del formulario
        const message = `*Nueva Consulta desde Web*\n\n` +
            `👤 Nombre: ${formData.name}\n` +
            `📧 Email: ${formData.email}\n` +
            `📱 Teléfono: ${formData.phone}\n\n` +
            `💬 Mensaje:\n${formData.message}`;

        const encodedMessage = encodeURIComponent(message);
        const link = `https://wa.me/${config.phone}?text=${encodedMessage}`;

        // Simular envío
        setSubmitted(true);
        setTimeout(() => {
            window.open(link, '_blank');
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 1500);
    };

    return (
        <div className={styles.contactoPage}>
            <div className="container">
                <h1 className={styles.pageTitle}>Contacto</h1>
                <p className={styles.pageSubtitle}>
                    ¿Tienes preguntas? Estamos aquí para ayudarte
                </p>

                <div className={styles.contactGrid}>
                    {/* Información de contacto */}
                    <div className={styles.infoSection}>
                        <div className={styles.infoCard}>
                            <h2 className={styles.infoTitle}>Información de Contacto</h2>

                            <div className={styles.infoItems}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>📞</div>
                                    <div>
                                        <h3>Teléfono</h3>
                                        <p>{config.phone.replace(/(\d{2})(\d{1})(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3 $4-$5')}</p>
                                        <a
                                            href={`tel:${config.phone}`}
                                            className={styles.infoLink}
                                        >
                                            Llamar ahora
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>💬</div>
                                    <div>
                                        <h3>WhatsApp</h3>
                                        <p>Respuesta inmediata</p>
                                        <button
                                            onClick={handleWhatsAppClick}
                                            className={styles.infoLink}
                                        >
                                            Abrir WhatsApp
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>📧</div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>{config.email}</p>
                                        <a
                                            href={`mailto:${config.email}`}
                                            className={styles.infoLink}
                                        >
                                            Enviar email
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>📍</div>
                                    <div>
                                        <h3>Ubicación</h3>
                                        <p>{config.zone}</p>
                                        <p className={styles.workingHours}>
                                            Lun - Vie: 8:00 - 18:00<br />
                                            Sáb: 9:00 - 13:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div className={styles.formSection}>
                        <div className={styles.formCard}>
                            <h2 className={styles.formTitle}>Envíanos un Mensaje</h2>

                            {submitted ? (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}>✅</div>
                                    <h3>¡Mensaje Enviado!</h3>
                                    <p>Te responderemos a la brevedad.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.label}>
                                            Nombre Completo *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={styles.input}
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Juan Pérez"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.label}>
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={styles.input}
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="juan@ejemplo.com"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone" className={styles.label}>
                                            Teléfono *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className={styles.input}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+54 9 11 1234-5678"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message" className={styles.label}>
                                            Mensaje *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className={styles.textarea}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            placeholder="Describe tu proyecto o consulta..."
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                        📤 Enviar Mensaje
                                    </button>

                                    <div className={styles.orDivider}>
                                        <span>O</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleWhatsAppClick}
                                        className="btn btn-secondary"
                                        style={{ width: '100%', background: '#25D366' }}
                                    >
                                        💬 Contactar por WhatsApp
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Google Maps Section */}
                <div className={styles.mapSection}>
                    <h2 className={styles.mapTitle}>📍 Área de Cobertura - GBA Norte</h2>
                    <p className={styles.mapSubtitle}>
                        Trabajamos en Los Polvorines, Grand Bourg, Tortuguitas, Pablo Nogués y zonas cercanas del GBA Norte
                    </p>
                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52478.89463539966!2d-58.71809668524482!3d-34.542932267939816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbd6e9c0aaaab%3A0x4fbb6e3b3e4c3e3e!2sAlbañilería%20Ezequiel%20Gauna%20-%20Los%20Polvorines!5e0!3m2!1ses-419!2sar!4v1738602519123!5m2!1ses-419!2sar"
                            width="100%"
                            height="450"
                            style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Albañilería Ezequiel Gauna - Los Polvorines, GBA Norte"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
