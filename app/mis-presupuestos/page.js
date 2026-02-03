'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllBudgets, deleteBudget } from '@/lib/storage';
import { formatCurrency } from '@/lib/calculations';
import { sendBudgetViaWhatsApp } from '@/lib/whatsapp';
import styles from './page.module.css';

export default function MisPresupuestosPage() {
    const [budgets, setBudgets] = useState([]);
    const [selectedBudgets, setSelectedBudgets] = useState([]);

    useEffect(() => {
        loadBudgets();
    }, []);

    const loadBudgets = () => {
        const allBudgets = getAllBudgets();
        // Ordenar por fecha más reciente
        allBudgets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBudgets(allBudgets);
    };

    const handleDelete = (id) => {
        console.log('[DELETE] Attempting to delete budget:', id);
        if (confirm('¿Estás seguro de eliminar este presupuesto?')) {
            console.log('[DELETE] User confirmed deletion');
            deleteBudget(id);
            loadBudgets();
            setSelectedBudgets(prev => prev.filter(budgetId => budgetId !== id));
            console.log('[DELETE] Budget deleted and list reloaded');
        } else {
            console.log('[DELETE] User cancelled deletion');
        }
    };

    const toggleSelectBudget = (id) => {
        setSelectedBudgets(prev =>
            prev.includes(id)
                ? prev.filter(budgetId => budgetId !== id)
                : [...prev, id]
        );
    };

    const handleSendWhatsApp = (budget) => {
        sendBudgetViaWhatsApp(budget);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const comparisonMode = selectedBudgets.length >= 2;
    const budgetsToCompare = budgets.filter(b => selectedBudgets.includes(b.id));

    return (
        <div className={styles.presupuestosPage}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Mis Presupuestos</h1>
                        <p className={styles.pageSubtitle}>
                            {budgets.length === 0
                                ? 'No tienes presupuestos guardados'
                                : `Tienes ${budgets.length} presupuesto${budgets.length !== 1 ? 's' : ''} guardado${budgets.length !== 1 ? 's' : ''}`
                            }
                        </p>
                    </div>

                    <Link href="/calculadora" className="btn btn-primary">
                        ➕ Nuevo Presupuesto
                    </Link>
                </div>

                {budgets.length > 0 && (
                    <div className={styles.toolbar}>
                        <p className={styles.toolbarText}>
                            {comparisonMode
                                ? `${selectedBudgets.length} presupuestos seleccionados para comparar`
                                : 'Selecciona 2 o más presupuestos para comparar'
                            }
                        </p>

                        {selectedBudgets.length > 0 && (
                            <button
                                className="btn btn-outline"
                                onClick={() => setSelectedBudgets([])}
                                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                                Limpiar Selección
                            </button>
                        )}
                    </div>
                )}

                {budgets.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📋</div>
                        <h2>No hay presupuestos guardados</h2>
                        <p>Comienza creando tu primer presupuesto en la calculadora</p>
                        <Link href="/calculadora" className="btn btn-primary">
                            Ir a la Calculadora
                        </Link>
                    </div>
                ) : comparisonMode ? (
                    <div className={styles.comparisonView}>
                        <h2 className={styles.comparisonTitle}>Comparación de Presupuestos</h2>
                        <div className={styles.comparisonGrid}>
                            {budgetsToCompare.map(budget => (
                                <div key={budget.id} className={styles.comparisonCard}>
                                    <div className={styles.comparisonHeader}>
                                        <h3>{budget.name}</h3>
                                        <button
                                            className={styles.deselectButton}
                                            onClick={() => toggleSelectBudget(budget.id)}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <p className={styles.comparisonDate}>
                                        {formatDate(budget.createdAt)}
                                    </p>

                                    <div className={styles.comparisonItems}>
                                        <h4>Servicios ({budget.items.length})</h4>
                                        <ul>
                                            {budget.items.map((item, idx) => (
                                                <li key={idx}>
                                                    {item.serviceName} - {item.quantity} {item.unit}
                                                    <span className={styles.itemPrice}>
                                                        {formatCurrency(item.subtotal)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.comparisonTotal}>
                                        <span>TOTAL:</span>
                                        <span>{formatCurrency(budget.total)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.budgetsGrid}>
                        {budgets.map(budget => (
                            <div
                                key={budget.id}
                                className={`${styles.budgetCard} ${selectedBudgets.includes(budget.id) ? styles.budgetCardSelected : ''}`}
                            >
                                <div className={styles.budgetCardHeader}>
                                    <div>
                                        <h3 className={styles.budgetName}>{budget.name}</h3>
                                        <p className={styles.budgetDate}>
                                            {formatDate(budget.createdAt)}
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={selectedBudgets.includes(budget.id)}
                                        onChange={() => toggleSelectBudget(budget.id)}
                                        className={styles.checkbox}
                                        title="Seleccionar para comparar"
                                    />
                                </div>

                                <div className={styles.budgetItems}>
                                    <h4>Servicios</h4>
                                    <ul>
                                        {budget.items.map((item, idx) => (
                                            <li key={idx}>
                                                <span className={styles.itemName}>
                                                    {item.serviceName}
                                                </span>
                                                <span className={styles.itemQuantity}>
                                                    {item.quantity} {item.unit}
                                                </span>
                                                <span className={styles.itemPrice}>
                                                    {formatCurrency(item.subtotal)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.budgetTotal}>
                                    <span>Total:</span>
                                    <span className={styles.totalAmount}>
                                        {formatCurrency(budget.total)}
                                    </span>
                                </div>

                                <div className={styles.budgetActions}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleSendWhatsApp(budget)}
                                        style={{ flex: 1, fontSize: '0.9rem', padding: '0.6rem' }}
                                    >
                                        💬 WhatsApp
                                    </button>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => handleDelete(budget.id)}
                                        style={{
                                            flex: 1,
                                            fontSize: '0.9rem',
                                            padding: '0.6rem',
                                            borderColor: 'var(--error)',
                                            color: 'var(--error)'
                                        }}
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
