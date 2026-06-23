export function getMonthRows(transactions, month) { return transactions.filter((t) => (t.date || '').startsWith(month)); }
export function summarize(transactions, month) {
  const rows = month ? getMonthRows(transactions, month) : transactions;
  const income = rows.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const expenses = rows.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  const byCategory = rows.filter((t) => t.type === 'expense').reduce((acc, t) => ({ ...acc, [t.category]: (acc[t.category] || 0) + Number(t.amount) }), {});
  const highestCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No expenses yet';
  const largestExpense = rows.filter((t) => t.type === 'expense').sort((a, b) => Number(b.amount) - Number(a.amount))[0];
  return { rows, income, expenses, balance: income - expenses, savings: income - expenses, byCategory, highestCategory, largestExpense };
}
export function previousMonth(month) { const d = new Date(`${month}-01T00:00:00`); d.setMonth(d.getMonth() - 1); return d.toISOString().slice(0, 7); }
