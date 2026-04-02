import { useFinance } from "@/context/FinanceContext";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const BudgetTracker = () => {
  const { budget, setBudget, totalExpenses, role } = useFinance();
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(String(budget));

  const pct = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;
  const isOver = totalExpenses > budget;
  const isNear = pct >= 80 && !isOver;

  const handleSave = () => {
    const val = Number(input);
    if (val > 0) setBudget(val);
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Monthly Budget</h3>
        {role === "admin" && !editing && (
          <button onClick={() => { setInput(String(budget)); setEditing(true); }} className="text-xs text-primary hover:underline">
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div className="flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Budget Amount ($)</Label>
            <Input type="number" value={input} onChange={e => setInput(e.target.value)} className="h-8" min="1" />
          </div>
          <button onClick={handleSave} className="text-xs text-primary font-medium px-3 py-2 hover:underline">Save</button>
        </div>
      ) : (
        <>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">
              {formatCurrency(totalExpenses)} of {formatCurrency(budget)}
            </span>
            <span className={`text-sm font-semibold ${isOver ? "text-expense" : isNear ? "text-warning" : "text-income"}`}>
              {pct.toFixed(0)}%
            </span>
          </div>
          <Progress
            value={pct}
            className={`h-2.5 ${isOver ? "[&>div]:bg-expense" : isNear ? "[&>div]:bg-warning" : "[&>div]:bg-income"}`}
          />
          {isOver && (
            <div className="flex items-center gap-2 text-xs text-expense bg-expense/10 p-2 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Budget exceeded by {formatCurrency(totalExpenses - budget)}
            </div>
          )}
          {isNear && !isOver && (
            <div className="flex items-center gap-2 text-xs text-warning bg-warning/10 p-2 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Approaching budget limit
            </div>
          )}
          {!isNear && !isOver && (
            <div className="flex items-center gap-2 text-xs text-income bg-income/10 p-2 rounded-lg">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              On track — {formatCurrency(budget - totalExpenses)} remaining
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetTracker;
