import { Lightbulb, TrendingUp, BarChart3 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";
import { monthlyData } from "@/data/mockData";

const Insights = () => {
  const { transactions, totalExpenses, totalIncome } = useFinance();

  const { topCategory, topAmount, monthComparison } = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter(t => t.type === "expense" && t.date.startsWith("2025-03"))
      .forEach(t => map.set(t.category, (map.get(t.category) || 0) + t.amount));

    let topCategory = "N/A";
    let topAmount = 0;
    map.forEach((v, k) => { if (v > topAmount) { topAmount = v; topCategory = k; } });

    const curr = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    const diff = ((curr.expenses - prev.expenses) / prev.expenses) * 100;
    return { topCategory, topAmount, monthComparison: diff };
  }, [transactions]);

  const insights = [
    {
      icon: Lightbulb,
      title: "Top Spending",
      message: `You spent the most on ${topCategory} this month — $${topAmount.toFixed(2)}.`,
      colorClass: "text-warning bg-warning/10",
    },
    {
      icon: BarChart3,
      title: "Monthly Comparison",
      message: `Expenses ${monthComparison > 0 ? "increased" : "decreased"} by ${Math.abs(monthComparison).toFixed(1)}% compared to last month.`,
      colorClass: monthComparison > 0 ? "text-expense bg-expense/10" : "text-income bg-income/10",
    },
    {
      icon: TrendingUp,
      title: "Savings Rate",
      message: `You saved ${totalIncome > 0 ? ((1 - totalExpenses / totalIncome) * 100).toFixed(0) : 0}% of your total income this period.`,
      colorClass: "text-primary bg-primary/10",
    },
  ];

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
      <div className="space-y-3">
        {insights.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
            <div className={`p-2 rounded-lg shrink-0 ${item.colorClass}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
