import { useEffect, useMemo, useState } from 'react';
import { subscribeBudgets, subscribeTransactions } from '../services/firestoreService';
import { currentMonth } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

export function useFinanceData() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) return undefined;
    setLoading(true);
    const unsubTransactions = subscribeTransactions(user.uid, (data) => { setTransactions(data); setLoading(false); });
    const unsubBudgets = subscribeBudgets(user.uid, setBudgets);
    return () => { unsubTransactions(); unsubBudgets(); };
  }, [user]);
  return useMemo(() => ({ transactions, budgets, loading, month: currentMonth() }), [transactions, budgets, loading]);
}
