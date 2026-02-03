'use client';

import { useState } from 'react';
import InfoModal from './InfoModal';
import styles from './MeasurementModal.module.css';

export default function MeasurementModal({ trigger }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <span onClick={() => setIsOpen(true)} className={styles.trigger}>
                {trigger}
            </span>

            <InfoModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="📏 ¿Cómo medir metros cuadrados (m²)?"
            >
                <div className={styles.content}>
                    <p className={styles.intro}>
                        <strong>Es más fácil de lo que parece.</strong> Te explicamos paso a paso:
                    </p>

                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepContent}>
                                <h4>Medí el largo</h4>
                                <p>Con una cinta métrica, medí el largo de la habitación o superficie. Ejemplo: 4 metros</p>
                            </div>
                        </div>

                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepContent}>
                                <h4>Medí el ancho</h4>
                                <p>Ahora medí el ancho (el lado perpendicular). Ejemplo: 3 metros</p>
                            </div>
                        </div>

                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepContent}>
                                <h4>Multiplicá</h4>
                                <p>Largo × Ancho = m²</p>
                                <p className={styles.example}>4m × 3m = <strong>12 m²</strong></p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.diagram}>
                        <div className={styles.room}>
                            <div className={styles.roomTop}>4 metros (largo)</div>
                            <div className={styles.roomSide}>3 metros (ancho)</div>
                            <div className={styles.roomCenter}>
                                <div className={styles.result}>12 m²</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.tips}>
                        <h4>💡 Consejos útiles</h4>
                        <ul>
                            <li>Si la forma no es rectangular, dividila en rectángulos más chicos y sumá</li>
                            <li>Para paredes: medí el alto × el largo</li>
                            <li>Siempre redondeá un poquito hacia arriba (por las dudas)</li>
                            <li>¿No estás seguro? Mandanos fotos por WhatsApp y te ayudamos gratis</li>
                        </ul>
                    </div>
                </div>
            </InfoModal>
        </>
    );
}
