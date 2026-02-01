// Funciones de cálculo de presupuestos

/**
 * Calcula el costo de un item de presupuesto considerando opciones seleccionadas
 * @param {Object} service - Servicio seleccionado
 * @param {number} quantity - Cantidad en unidades del servicio
 * @param {Array} selectedOptions - Array de opciones seleccionadas
 * @returns {Object} - Objeto con costos calculados
 */
export function calculateBudgetItem(service, quantity, selectedOptions = []) {
    let materialCost = service.materialCost;
    let laborCost = service.laborCost;

    // Aplicar modificadores de precio según opciones seleccionadas
    selectedOptions.forEach(selectedOption => {
        const optionDef = service.options.find(o => o.id === selectedOption.id);
        if (optionDef) {
            const choice = optionDef.choices.find(c => c.value === selectedOption.value);
            if (choice && choice.priceModifier) {
                materialCost *= choice.priceModifier;
                laborCost *= choice.priceModifier;
            }
        }
    });

    const totalMaterialCost = Math.round(materialCost * quantity);
    const totalLaborCost = Math.round(laborCost * quantity);
    const subtotal = totalMaterialCost + totalLaborCost;

    return {
        materialCost: totalMaterialCost,
        laborCost: totalLaborCost,
        subtotal,
        pricePerUnit: Math.round(materialCost + laborCost)
    };
}

/**
 * Calcula el total de un presupuesto sumando todos los items
 * @param {Array} items - Array de items del presupuesto
 * @returns {number} - Total del presupuesto
 */
export function calculateTotalBudget(items) {
    return items.reduce((total, item) => total + (item.subtotal || 0), 0);
}

/**
 * Formatea un número como moneda
 * @param {number} amount - Monto a formatear
 * @param {string} currency - Símbolo de moneda (default: $)
 * @returns {string} - Monto formateado
 */
export function formatCurrency(amount, currency = '$') {
    return `${currency}${amount.toLocaleString('es-AR')}`;
}

/**
 * Genera un ID único para presupuestos
 * @returns {string} - ID único
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
