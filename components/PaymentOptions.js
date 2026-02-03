'use client';

import styles from './PaymentOptions.module.css';

export default function PaymentOptions({ totalAmount = 0 }) {
    // Calcular descuento por efectivo según monto
    const calculateCashDiscount = (amount) => {
        if (amount === 0) return { percentage: 0, saved: 0 };

        // Convertir cantidad en m² estimado (asumiendo $35000/m² promedio)
        const estimatedM2 = amount / 35000;

        let percentage = 0;
        if (estimatedM2 < 20) {
            percentage = 10; // 8-10% -> usamos 10%
        } else if (estimatedM2 >= 20 && estimatedM2 <= 50) {
            percentage = 15; // 12-18% -> usamos 15%
        } else {
            percentage = 22; // 20-25% -> usamos 22%
        }

        const saved = (amount * percentage) / 100;
        return { percentage, saved };
    };

    const discount = calculateCashDiscount(totalAmount);

    return (
        <div className={styles.paymentOptions}>
            <h3 className={styles.title}>💳 Opciones de Pago</h3>

            <div className={styles.optionsGrid}>
                {/* Efectivo con descuento */}
                <div className={`${styles.option} ${styles.featured}`}>
                    <div className={styles.badge}>🔥 MÁS AHORRO</div>
                    <div className={styles.optionIcon}>💵</div>
                    <h4>Efectivo</h4>
                    <p className={styles.discount}>
                        Hasta <strong>{discount.percentage}% OFF</strong>
                    </p>
                    {totalAmount > 0 && (
                        <p className={styles.savings}>
                            ¡Ahorrás ${discount.saved.toLocaleString('es-AR')}!
                        </p>
                    )}
                    <ul className={styles.benefits}>
                        <li>✓ Descuento agresivo</li>
                        <li>✓ Sin comisiones</li>
                        <li>✓ Precio final más bajo</li>
                    </ul>
                </div>

                {/* Mercado Pago */}
                <div className={styles.option}>
                    <div className={styles.optionIcon}>💳</div>
                    <h4>Mercado Pago</h4>
                    <p className={styles.installments}>3-6 cuotas sin interés</p>
                    <ul className={styles.benefits}>
                        <li>✓ Cuotas flexibles</li>
                        <li>✓ Seguro y rápido</li>
                        <li>✓ Puntos Mercado Libre</li>
                    </ul>
                </div>

                {/* Transferencia */}
                <div className={styles.option}>
                    <div className={styles.optionIcon}>🏦</div>
                    <h4>Transferencia</h4>
                    <p className={styles.installments}>Descuento moderado 5%</p>
                    <ul className={styles.benefits}>
                        <li>✓ Rápido y seguro</li>
                        <li>✓ Sin comisiones</li>
                        <li>✓ Comprobante al instante</li>
                    </ul>
                </div>
            </div>

            <div className={styles.disclaimer}>
                <p>
                    💡 <strong>Los descuentos más grandes son en efectivo.</strong> Precios 2026 actualizados.
                    Factura opcional para total transparencia.
                </p>
            </div>
        </div>
    );
}
