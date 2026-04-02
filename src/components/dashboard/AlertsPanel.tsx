import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";

interface Alert {
  type: "warning" | "danger" | "info";
  message: string;
}

const AlertsPanel = () => {
  const { transactions, totalExpenses, budget } = useFinance();

  const alerts = useMemo(() => {
    const result: Alert[] = [];

    // High spending this week
    const weekAgo = new Date(Date.now() - 7 * 86400000);
    const weekExpenses = transactions
      .filter(t => t.type === "expense" && new Date(t.date) >= weekAgo)
      .reduce((s, t) => s + t.amount, 0);
    if (weekExpenses > budget * 0.4) {
      result.push({ type: "warning", message: `High spending detected this week: $${weekExpenses.toFixed(0)}` });
    }

    // Multiple large transactions in a day
    const dayMap = new Map<string, number>();
    transactions.filter(t => t.type === "expense" && t.amount > 100).forEach(t => {
      dayMap.set(t.date, (dayMap.get(t.date) || 0) + 1);
    });
    dayMap.forEach((count, date) => {
      if (count >= 2) {
        result.push({
          type: "danger",
          message: `${count} large transactions on ${new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        });
      }
    });

    // Budget warning
    if (totalExpenses > budget) {
      result.push({ type: "danger", message: "Monthly budget has been exceeded!" });
    } else if (totalExpenses > budget * 0.9) {
      result.push({ type: "warning", message: "You've used over 90% of your monthly budget" });
    }

    if (result.length === 0) {
      result.push({ type: "info", message: "No alerts — your spending looks healthy!" });
    }

    return result;
  }, [transactions, totalExpenses, budget]);

  const iconMap = { warning: AlertTriangle, danger: AlertCircle, info: Info };
  const colorMap = {
    warning: "text-warning bg-warning/10 border-warning/20",
    danger: "text-expense bg-expense/10 border-expense/20",
    info: "text-primary bg-primary/10 border-primary/20",
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-lg font-semibold mb-3">Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const Icon = iconMap[alert.type];
          return (
            <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs ${colorMap[alert.type]}`}>
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{alert.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;
