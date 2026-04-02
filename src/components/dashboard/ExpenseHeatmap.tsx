import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getColor = (amount: number, max: number) => {
  if (amount === 0) return "bg-muted";
  const intensity = Math.min(amount / max, 1);
  if (intensity < 0.25) return "bg-expense/20";
  if (intensity < 0.5) return "bg-expense/40";
  if (intensity < 0.75) return "bg-expense/60";
  return "bg-expense/90";
};

const ExpenseHeatmap = () => {
  const { transactions } = useFinance();

  const { cells, maxAmount } = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter(t => t.type === "expense" && t.date.startsWith("2025-03"))
      .forEach(t => map.set(t.date, (map.get(t.date) || 0) + t.amount));

    let maxAmount = 0;
    map.forEach(v => { if (v > maxAmount) maxAmount = v; });

    const cells: { date: string; day: number; amount: number; weekIndex: number }[] = [];
    for (let d = 1; d <= 31; d++) {
      const dateStr = `2025-03-${String(d).padStart(2, "0")}`;
      const dateObj = new Date(dateStr);
      const dayOfWeek = dateObj.getDay();
      const weekIndex = Math.floor((d + new Date("2025-03-01").getDay() - 1) / 7);
      cells.push({ date: dateStr, day: dayOfWeek, amount: map.get(dateStr) || 0, weekIndex });
    }
    return { cells, maxAmount };
  }, [transactions]);

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-lg font-semibold mb-4">Expense Heatmap — March 2025</h3>
      <div className="flex gap-1 mb-1">
        {DAYS.map(d => (
          <span key={d} className="w-8 text-[10px] text-muted-foreground text-center">{d}</span>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {Array.from({ length: 6 }, (_, weekIdx) => (
          <div key={weekIdx} className="flex gap-1">
            {Array.from({ length: 7 }, (_, dayIdx) => {
              const cell = cells.find(c => c.weekIndex === weekIdx && c.day === dayIdx);
              if (!cell) return <div key={dayIdx} className="w-8 h-8 rounded" />;
              return (
                <Tooltip key={dayIdx}>
                  <TooltipTrigger asChild>
                    <div className={`w-8 h-8 rounded cursor-default transition-colors ${getColor(cell.amount, maxAmount)} flex items-center justify-center`}>
                      <span className="text-[9px] text-foreground/60">{new Date(cell.date).getDate()}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    <p className="font-medium">{new Date(cell.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    <p>{cell.amount > 0 ? formatCurrency(cell.amount) : "No spending"}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-0.5">
          <div className="w-3 h-3 rounded bg-muted" />
          <div className="w-3 h-3 rounded bg-expense/20" />
          <div className="w-3 h-3 rounded bg-expense/40" />
          <div className="w-3 h-3 rounded bg-expense/60" />
          <div className="w-3 h-3 rounded bg-expense/90" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ExpenseHeatmap;
