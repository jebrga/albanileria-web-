// Funciones para trabajar con LocalStorage y gestión de presupuestos guardados

const BUDGETS_KEY = 'albanileria_budgets';

/**
 * Guarda un presupuesto en LocalStorage
 * @param {Object} budget - Presupuesto a guardar
 * @returns {boolean} - true si se guardó exitosamente
 */
export function saveBudget(budget) {
    try {
        const budgets = getAllBudgets();

        // Verificar si ya existe un presupuesto con este ID
        const existingIndex = budgets.findIndex(b => b.id === budget.id);

        if (existingIndex >= 0) {
            // Actualizar presupuesto existente
            budgets[existingIndex] = {
                ...budget,
                updatedAt: new Date().toISOString()
            };
        } else {
            // Agregar nuevo presupuesto
            budgets.push({
                ...budget,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
        return true;
    } catch (error) {
        console.error('Error al guardar presupuesto:', error);
        return false;
    }
}

/**
 * Obtiene todos los presupuestos guardados
 * @returns {Array} - Array de presupuestos
 */
export function getAllBudgets() {
    try {
        const budgetsJson = localStorage.getItem(BUDGETS_KEY);
        return budgetsJson ? JSON.parse(budgetsJson) : [];
    } catch (error) {
        console.error('Error al obtener presupuestos:', error);
        return [];
    }
}

/**
 * Obtiene un presupuesto por su ID
 * @param {string} id - ID del presupuesto
 * @returns {Object|null} - Presupuesto o null si no existe
 */
export function getBudgetById(id) {
    const budgets = getAllBudgets();
    return budgets.find(b => b.id === id) || null;
}

/**
 * Elimina un presupuesto
 * @param {string} id - ID del presupuesto a eliminar
 * @returns {boolean} - true si se eliminó exitosamente
 */
export function deleteBudget(id) {
    try {
        const budgets = getAllBudgets();
        const filteredBudgets = budgets.filter(b => b.id !== id);
        localStorage.setItem(BUDGETS_KEY, JSON.stringify(filteredBudgets));
        return true;
    } catch (error) {
        console.error('Error al eliminar presupuesto:', error);
        return false;
    }
}

/**
 * Limpia todos los presupuestos (útil para testing)
 * @returns {boolean} - true si se limpió exitosamente
 */
export function clearAllBudgets() {
    try {
        localStorage.removeItem(BUDGETS_KEY);
        return true;
    } catch (error) {
        console.error('Error al limpiar presupuestos:', error);
        return false;
    }
}
