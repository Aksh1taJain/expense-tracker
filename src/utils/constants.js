export const CATEGORIES = ['Food', 'Shopping', 'Transport', 'Bills', 'Entertainment', 'Salary', 'Other'];
export const EXPENSE_CATEGORIES = CATEGORIES.filter((category) => category !== 'Salary');
export const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
export const currentMonth = () => new Date().toISOString().slice(0, 7);
