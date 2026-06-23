import Papa from 'papaparse';
import jsPDF from 'jspdf';
import { formatCurrency } from './constants';
import { summarize } from './finance';

export function exportTransactionsCsv(transactions) {
  const csv = Papa.unparse(transactions.map(({ id, type, amount, category, date, note }) => ({ id, type, amount, category, date, note })));
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = 'transactions.csv'; link.click(); URL.revokeObjectURL(url);
}
export function exportMonthlyPdf(transactions, month) {
  const doc = new jsPDF();
  const summary = summarize(transactions, month);
  doc.setFontSize(18); doc.text(`Financial Report - ${month}`, 14, 20);
  doc.setFontSize(12);
  doc.text(`Monthly Income: ${formatCurrency(summary.income)}`, 14, 36);
  doc.text(`Monthly Expenses: ${formatCurrency(summary.expenses)}`, 14, 46);
  doc.text(`Monthly Balance: ${formatCurrency(summary.balance)}`, 14, 56);
  doc.text(`Highest Spending Category: ${summary.highestCategory}`, 14, 66);
  doc.text('Category Breakdown:', 14, 82);
  Object.entries(summary.byCategory).forEach(([category, amount], index) => doc.text(`${category}: ${formatCurrency(amount)}`, 18, 94 + index * 10));
  doc.save(`financial-report-${month}.pdf`);
}
