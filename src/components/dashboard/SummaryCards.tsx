import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses, previousIncome, previousExpenses } = useFinance();

  const prevBalance = previousIncome - previousExpenses;
  const pctChange = (curr: number, prev: number) => prev === 0 ? null : ((curr - prev) / prev) * 100;

  const cards = [
    {
      label: "Total Balance", value: totalBalance, icon: DollarSign,
      colorClass: "text-primary bg-primary/10",
      change: pctChange(totalBalance, prevBalance),
    },
    {
      label: "Total Income", value: totalIncome, icon: TrendingUp,
      colorClass: "text-income bg-income/10",
      change: pctChange(totalIncome, previousIncome),
    },
    {
      label: "Total Expenses", value: totalExpenses, icon: TrendingDown,
      colorClass: "text-expense bg-expense/10",
      change: pctChange(totalExpenses, previousExpenses),
      invertColor: true, // for expenses, going up is bad
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, colorClass, change, invertColor }) => {
        const isPositive = change !== null && change > 0;
        const trendColor = invertColor
          ? (isPositive ? "text-expense" : "text-income")
          : (isPositive ? "text-income" : "text-expense");

        return (
          <div key={label} className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`p-3 rounded-lg ${colorClass}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-semibold tracking-tight">{formatCurrency(value)}</p>
            </div>
            {change !== null && (
              <div className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
                {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {Math.abs(change).toFixed(1)}%
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
