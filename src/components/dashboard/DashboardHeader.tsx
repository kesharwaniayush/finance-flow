import { useFinance } from "@/context/FinanceContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AddTransactionDialog from "./AddTransactionDialog";
import { useRef } from "react";

const accentOptions = [
  { value: "blue", label: "Blue", color: "bg-[hsl(221,83%,53%)]" },
  { value: "purple", label: "Purple", color: "bg-[hsl(280,67%,60%)]" },
  { value: "green", label: "Green", color: "bg-[hsl(142,71%,45%)]" },
  { value: "orange", label: "Orange", color: "bg-[hsl(24,95%,53%)]" },
];

const DashboardHeader = () => {
  const { role, setRole, transactions, isDark, toggleTheme, accentColor, setAccentColor, importTransactions } = useFinance();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportCSV = () => {
    const headers = "Date,Description,Category,Type,Amount\n";
    const rows = transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.csv";
    a.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.json";
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        if (file.name.endsWith(".json")) {
          const data = JSON.parse(text);
          if (Array.isArray(data)) {
            importTransactions(data.map((d: any) => ({
              date: d.date, description: d.description, amount: Number(d.amount),
              category: d.category, type: d.type,
            })));
          }
        } else {
          // CSV
          const lines = text.split("\n").slice(1).filter(l => l.trim());
          const txns = lines.map(line => {
            const parts = line.match(/(".*?"|[^,]+)/g) || [];
            return {
              date: parts[0]?.trim() || "",
              description: (parts[1] || "").replace(/"/g, "").trim(),
              category: (parts[2] || "").trim(),
              type: (parts[3] || "expense").trim() as "income" | "expense",
              amount: Number(parts[4]) || 0,
            };
          }).filter(t => t.date && t.amount > 0);
          importTransactions(txns);
        }
      } catch { /* ignore parse errors */ }
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Finance Dashboard</h1>
        <p className="text-muted-foreground text-sm">Track your income, expenses, and insights</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme}>
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Palette className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2" align="end">
            <p className="text-xs font-medium mb-2">Accent Color</p>
            <div className="flex gap-2">
              {accentOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAccentColor(opt.value)}
                  className={`w-7 h-7 rounded-full ${opt.color} transition-all ${accentColor === opt.value ? "ring-2 ring-offset-2 ring-foreground/30" : "hover:scale-110"}`}
                  title={opt.label}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Select value={role} onValueChange={v => setRole(v as "viewer" | "admin")}>
          <SelectTrigger className="w-[110px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        {role === "admin" && <AddTransactionDialog />}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Download className="w-4 h-4" /> Export
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-36 p-1" align="end">
            <button onClick={exportCSV} className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted rounded">CSV</button>
            <button onClick={exportJSON} className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted rounded">JSON</button>
          </PopoverContent>
        </Popover>
        {role === "admin" && (
          <>
            <input ref={fileRef} type="file" accept=".csv,.json" className="hidden" onChange={handleImport} />
            <Button variant="outline" size="sm" className="h-9 gap-1.5" onClick={() => fileRef.current?.click()}>
              <Upload className="w-4 h-4" /> Import
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
