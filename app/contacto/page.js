'use client';

import { useState } from 'react';
import { contactViaWhatsApp } from '@/lib/whatsapp';
import styles from './page.module.css';

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // En una aplicación real, aquí enviarías el formulario a un backend
        // Por ahora, solo mostramos mensaje de éxito
        setSubmitted(true);

        // Reset después de 3 segundos
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
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
                                        <p>+54 9 11 1234-5678</p>
                                        <a
                                            href="tel:+5491112345678"
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
                                            onClick={contactViaWhatsApp}
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
                                        <p>info@construcciones.com</p>
                                        <a
                                            href="mailto:info@construcciones.com"
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
                                        <p>Buenos Aires, Argentina</p>
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
                                        onClick={contactViaWhatsApp}
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
            </div>
        </div>
    );
}
