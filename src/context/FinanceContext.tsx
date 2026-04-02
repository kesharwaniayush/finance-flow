import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { Transaction, mockTransactions, TransactionType } from "@/data/mockData";

type Role = "viewer" | "admin";
type DateRange = "7d" | "30d" | "all" | "custom";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  typeFilter: TransactionType | "all";
  setTypeFilter: (f: TransactionType | "all") => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  amountMin: string;
  setAmountMin: (v: string) => void;
  amountMax: string;
  setAmountMax: (v: string) => void;
  dateRange: DateRange;
  setDateRange: (r: DateRange) => void;
  customDateFrom: string;
  setCustomDateFrom: (d: string) => void;
  customDateTo: string;
  setCustomDateTo: (d: string) => void;
  sortField: "date" | "amount";
  setSortField: (f: "date" | "amount") => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (d: "asc" | "desc") => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  importTransactions: (txns: Omit<Transaction, "id">[]) => void;
  filteredTransactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  previousIncome: number;
  previousExpenses: number;
  budget: number;
  setBudget: (b: number) => void;
  isDark: boolean;
  toggleTheme: () => void;
  accentColor: string;
  setAccentColor: (c: string) => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};

const getDateCutoff = (range: DateRange, customFrom: string, customTo: string): { from: Date | null; to: Date | null } => {
  const now = new Date();
  switch (range) {
    case "7d": return { from: new Date(now.getTime() - 7 * 86400000), to: now };
    case "30d": return { from: new Date(now.getTime() - 30 * 86400000), to: now };
    case "custom": return { from: customFrom ? new Date(customFrom) : null, to: customTo ? new Date(customTo + "T23:59:59") : null };
    default: return { from: null, to: null };
  }
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("finance-transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  const [role, setRoleState] = useState<Role>(() => (localStorage.getItem("finance-role") as Role) || "admin");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [customDateFrom, setCustomDateFrom] = useState("");
  const [customDateTo, setCustomDateTo] = useState("");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [budget, setBudgetState] = useState<number>(() => {
    const saved = localStorage.getItem("finance-budget");
    return saved ? Number(saved) : 3500;
  });
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("finance-theme");
    return saved === "dark";
  });
  const [accentColor, setAccentColorState] = useState(() => localStorage.getItem("finance-accent") || "blue");

  const setRole = (r: Role) => { setRoleState(r); localStorage.setItem("finance-role", r); };
  const setBudget = (b: number) => { setBudgetState(b); localStorage.setItem("finance-budget", String(b)); };
  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem("finance-theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };
  const setAccentColor = (c: string) => {
    setAccentColorState(c);
    localStorage.setItem("finance-accent", c);
    // Apply accent via CSS custom property overrides
    const accents: Record<string, string> = {
      blue: "221 83% 53%",
      purple: "280 67% 60%",
      green: "142 71% 45%",
      orange: "24 95% 53%",
    };
    document.documentElement.style.setProperty("--primary", accents[c] || accents.blue);
    document.documentElement.style.setProperty("--accent", accents[c] || accents.blue);
    document.documentElement.style.setProperty("--ring", accents[c] || accents.blue);
  };

  // Initialize theme on mount
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    if (accentColor !== "blue") {
      setAccentColor(accentColor); // apply saved accent
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = (txns: Transaction[]) => {
    setTransactions(txns);
    localStorage.setItem("finance-transactions", JSON.stringify(txns));
  };

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions(prev => {
      const next = [{ ...t, id: crypto.randomUUID() }, ...prev];
      localStorage.setItem("finance-transactions", JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => {
      const next = prev.filter(t => t.id !== id);
      localStorage.setItem("finance-transactions", JSON.stringify(next));
      return next;
    });
  }, []);

  const editTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...updates } : t);
      localStorage.setItem("finance-transactions", JSON.stringify(next));
      return next;
    });
  }, []);

  const importTransactions = useCallback((txns: Omit<Transaction, "id">[]) => {
    setTransactions(prev => {
      const newTxns = txns.map(t => ({ ...t, id: crypto.randomUUID() }));
      const next = [...newTxns, ...prev];
      localStorage.setItem("finance-transactions", JSON.stringify(next));
      return next;
    });
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    const { from, to } = getDateCutoff(dateRange, customDateFrom, customDateTo);
    if (from) result = result.filter(t => new Date(t.date) >= from);
    if (to) result = result.filter(t => new Date(t.date) <= to);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.amount.toString().includes(q)
      );
    }
    if (typeFilter !== "all") result = result.filter(t => t.type === typeFilter);
    if (categoryFilter !== "all") result = result.filter(t => t.category === categoryFilter);
    if (amountMin) result = result.filter(t => t.amount >= Number(amountMin));
    if (amountMax) result = result.filter(t => t.amount <= Number(amountMax));
    result.sort((a, b) => {
      const mult = sortDirection === "asc" ? 1 : -1;
      if (sortField === "date") return mult * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mult * (a.amount - b.amount);
    });
    return result;
  }, [transactions, searchQuery, typeFilter, categoryFilter, amountMin, amountMax, dateRange, customDateFrom, customDateTo, sortField, sortDirection]);

  // Current month totals
  const totalIncome = useMemo(() =>
    transactions.filter(t => t.type === "income" && t.date.startsWith("2025-03")).reduce((s, t) => s + t.amount, 0),
    [transactions]);
  const totalExpenses = useMemo(() =>
    transactions.filter(t => t.type === "expense" && t.date.startsWith("2025-03")).reduce((s, t) => s + t.amount, 0),
    [transactions]);
  const totalBalance = totalIncome - totalExpenses;

  // Previous month for comparison
  const previousIncome = useMemo(() =>
    transactions.filter(t => t.type === "income" && t.date.startsWith("2025-02")).reduce((s, t) => s + t.amount, 0),
    [transactions]);
  const previousExpenses = useMemo(() =>
    transactions.filter(t => t.type === "expense" && t.date.startsWith("2025-02")).reduce((s, t) => s + t.amount, 0),
    [transactions]);

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole, searchQuery, setSearchQuery,
      typeFilter, setTypeFilter, categoryFilter, setCategoryFilter,
      amountMin, setAmountMin, amountMax, setAmountMax,
      dateRange, setDateRange, customDateFrom, setCustomDateFrom,
      customDateTo, setCustomDateTo,
      sortField, setSortField, sortDirection, setSortDirection,
      addTransaction, deleteTransaction, editTransaction, importTransactions,
      filteredTransactions, totalIncome, totalExpenses, totalBalance,
      previousIncome, previousExpenses,
      budget, setBudget, isDark, toggleTheme, accentColor, setAccentColor,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
