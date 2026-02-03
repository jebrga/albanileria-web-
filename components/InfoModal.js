'use client';

import { useEffect } from 'react';
import styles from './InfoModal.module.css';

export default function InfoModal({ isOpen, onClose, title, children, image }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                    ✕
                </button>

                {image && (
                    <div className={styles.modalImage}>
                        <img src={image} alt={title} />
                    </div>
                )}

                <div className={styles.modalContent}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <div className={styles.modalBody}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
