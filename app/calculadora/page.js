'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllServices } from '@/lib/services';
import { calculateBudgetItem, calculateTotalBudget, formatCurrency, generateId } from '@/lib/calculations';
import { saveBudget } from '@/lib/storage';
import { sendBudgetViaWhatsApp } from '@/lib/whatsapp';
import styles from './page.module.css';

export default function CalculadoraPage() {
    const searchParams = useSearchParams();
    const preselectedServiceId = searchParams.get('service');

    const services = getAllServices();

    // Estado del formulario
    const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || '');
    const [quantity, setQuantity] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});

    // Estado del presupuesto
    const [budgetItems, setBudgetItems] = useState([]);
    const [budgetName, setBudgetName] = useState('');
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const selectedService = services.find(s => s.id === selectedServiceId);

    // Calcular precio en tiempo real
    const currentItemCalculation = selectedService && quantity > 0
        ? calculateBudgetItem(
            selectedService,
            parseFloat(quantity),
            Object.entries(selectedOptions).map(([id, value]) => {
                const option = selectedService.options.find(o => o.id === id);
                if (!option) return null;
                const choice = option.choices.find(c => c.value === value);
                return { id, value, label: choice?.label || value };
            }).filter(Boolean)
        )
        : null;

    const handleOptionChange = (optionId, value) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionId]: value
        }));
    };

    const handleAddToBudget = () => {
        if (!selectedService || !quantity || quantity <= 0) {
            alert('Por favor completa todos los campos');
            return;
        }

        const calculation = calculateBudgetItem(
            selectedService,
            parseFloat(quantity),
            Object.entries(selectedOptions).map(([id, value]) => {
                const option = selectedService.options.find(o => o.id === id);
                const choice = option.choices.find(c => c.value === value);
                return { id, value, label: choice?.label || value };
            }).filter(Boolean)
        );

        const newItem = {
            id: generateId(),
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            quantity: parseFloat(quantity),
            unit: selectedService.unit,
            options: Object.entries(selectedOptions).map(([id, value]) => {
                const option = selectedService.options.find(o => o.id === id);
                const choice = option.choices.find(c => c.value === value);
                return { id, value, label: choice?.label || value };
            }).filter(Boolean),
            ...calculation
        };

        setBudgetItems(prev => [...prev, newItem]);

        // Limpiar formulario
        setQuantity('');
        setSelectedOptions({});
        setSelectedServiceId('');
    };

    const handleRemoveItem = (itemId) => {
        setBudgetItems(prev => prev.filter(item => item.id !== itemId));
    };

    const totalBudget = calculateTotalBudget(budgetItems);

    const handleSaveBudget = () => {
        if (budgetItems.length === 0) {
            alert('Agrega al menos un servicio al presupuesto');
            return;
        }
        setShowSaveDialog(true);
    };

    const confirmSaveBudget = () => {
        const budget = {
            id: generateId(),
            name: budgetName || `Presupuesto ${new Date().toLocaleDateString()}`,
            items: budgetItems,
            total: totalBudget,
            createdAt: new Date().toISOString()
        };

        const success = saveBudget(budget);

        if (success) {
            setSaveMessage('✅ Presupuesto guardado exitosamente');
            setTimeout(() => {
                setShowSaveDialog(false);
                setSaveMessage('');
                setBudgetName('');
            }, 2000);
        } else {
            setSaveMessage('❌ Error al guardar presupuesto');
        }
    };

    const handleSendWhatsApp = () => {
        if (budgetItems.length === 0) {
            alert('Agrega al menos un servicio al presupuesto');
            return;
        }

        const budget = {
            name: budgetName || 'Mi Presupuesto',
            items: budgetItems,
            total: totalBudget
        };

        sendBudgetViaWhatsApp(budget);
    };

    return (
        <div className={styles.calculadoraPage}>
            <div className="container">
                <h1 className={styles.pageTitle}>Calculadora de Presupuestos</h1>
                <p className={styles.pageSubtitle}>
                    Selecciona servicios, ingresa cantidades y obtén tu presupuesto personalizado
                </p>

                <div className={styles.calculatorGrid}>
                    {/* Formulario de agregar servicio */}
                    <div className={styles.formSection}>
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Agregar Servicio</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Seleccionar Servicio</label>
                                <select
                                    className={styles.select}
                                    value={selectedServiceId}
                                    onChange={(e) => {
                                        setSelectedServiceId(e.target.value);
                                        setSelectedOptions({});
                                        setQuantity('');
                                    }}
                                >
                                    <option value="">-- Selecciona un servicio --</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>
                                            {service.icon} {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedService && (
                                <>
                                    <div className={styles.serviceInfo}>
                                        <div className={styles.serviceInfoIcon}>{selectedService.icon}</div>
                                        <div>
                                            <h3>{selectedService.name}</h3>
                                            <p>{selectedService.description}</p>
                                            <p className={styles.basePrice}>
                                                Precio base: {formatCurrency(selectedService.pricePerUnit)} / {selectedService.unit}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>
                                            Cantidad ({selectedService.unit})
                                        </label>
                                        <input
                                            type="number"
                                            className={styles.input}
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            placeholder={`Ingresa la cantidad en ${selectedService.unit}`}
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    {selectedService.options && selectedService.options.map(option => (
                                        <div key={option.id} className={styles.formGroup}>
                                            <label className={styles.label}>{option.name}</label>
                                            <select
                                                className={styles.select}
                                                value={selectedOptions[option.id] || ''}
                                                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                            >
                                                <option value="">-- Selecciona una opción --</option>
                                                {option.choices.map(choice => (
                                                    <option key={choice.value} value={choice.value}>
                                                        {choice.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}

                                    {currentItemCalculation && (
                                        <div className={styles.preview}>
                                            <h4>Vista Previa</h4>
                                            <div className={styles.previewGrid}>
                                                <div>
                                                    <span className={styles.previewLabel}>Materiales:</span>
                                                    <span className={styles.previewValue}>
                                                        {formatCurrency(currentItemCalculation.materialCost)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className={styles.previewLabel}>Mano de obra:</span>
                                                    <span className={styles.previewValue}>
                                                        {formatCurrency(currentItemCalculation.laborCost)}
                                                    </span>
                                                </div>
                                                <div className={styles.previewTotal}>
                                                    <span className={styles.previewLabel}>Subtotal:</span>
                                                    <span className={styles.previewValue}>
                                                        {formatCurrency(currentItemCalculation.subtotal)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAddToBudget}
                                        style={{ width: '100%', marginTop: '1rem' }}
                                    >
                                        ➕ Agregar al Presupuesto
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Resumen del presupuesto */}
                    <div className={styles.summarySection}>
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Resumen del Presupuesto</h2>

                            {budgetItems.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>📋 No hay servicios agregados</p>
                                    <p>Comienza agregando un servicio al presupuesto</p>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.budgetItems}>
                                        {budgetItems.map(item => (
                                            <div key={item.id} className={styles.budgetItem}>
                                                <div className={styles.itemHeader}>
                                                    <h4>{item.serviceName}</h4>
                                                    <button
                                                        className={styles.removeButton}
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        title="Eliminar"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>

                                                <p className={styles.itemQuantity}>
                                                    {item.quantity} {item.unit}
                                                </p>

                                                {item.options.length > 0 && (
                                                    <p className={styles.itemOptions}>
                                                        {item.options.map(opt => opt.label).join(', ')}
                                                    </p>
                                                )}

                                                <div className={styles.itemCosts}>
                                                    <div>
                                                        <span>Materiales:</span>
                                                        <span>{formatCurrency(item.materialCost)}</span>
                                                    </div>
                                                    <div>
                                                        <span>M. de obra:</span>
                                                        <span>{formatCurrency(item.laborCost)}</span>
                                                    </div>
                                                    <div className={styles.itemSubtotal}>
                                                        <span>Subtotal:</span>
                                                        <span>{formatCurrency(item.subtotal)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.totalSection}>
                                        <div className={styles.totalRow}>
                                            <span className={styles.totalLabel}>TOTAL:</span>
                                            <span className={styles.totalAmount}>
                                                {formatCurrency(totalBudget)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.actions}>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={handleSaveBudget}
                                            style={{ width: '100%' }}
                                        >
                                            💾 Guardar Presupuesto
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={handleSendWhatsApp}
                                            style={{ width: '100%', background: '#25D366' }}
                                        >
                                            💬 Enviar por WhatsApp
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de guardar */}
            {showSaveDialog && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Guardar Presupuesto</h3>

                        {saveMessage ? (
                            <p className={styles.saveMessage}>{saveMessage}</p>
                        ) : (
                            <>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Nombre del presupuesto (opcional)</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={budgetName}
                                        onChange={(e) => setBudgetName(e.target.value)}
                                        placeholder="Ej: Refacción Baño"
                                        maxLength={50}
                                    />
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => {
                                            setShowSaveDialog(false);
                                            setBudgetName('');
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={confirmSaveBudget}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
