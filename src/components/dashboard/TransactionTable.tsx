import { Search, ArrowUpDown, Trash2, Filter, X } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { categories, categoryIcons } from "@/data/mockData";
import { useMemo } from "react";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-warning/30 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
};

const TransactionTable = () => {
  const {
    filteredTransactions, searchQuery, setSearchQuery,
    typeFilter, setTypeFilter, sortField, setSortField,
    sortDirection, setSortDirection, role, deleteTransaction,
    categoryFilter, setCategoryFilter,
    amountMin, setAmountMin, amountMax, setAmountMax,
    dateRange, setDateRange, customDateFrom, setCustomDateFrom,
    customDateTo, setCustomDateTo,
  } = useFinance();

  const toggleSort = (field: "date" | "amount") => {
    if (sortField === field) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDirection("desc"); }
  };

  const hasActiveFilters = categoryFilter !== "all" || amountMin || amountMax || dateRange !== "all";

  const clearFilters = () => {
    setCategoryFilter("all");
    setAmountMin("");
    setAmountMax("");
    setDateRange("all");
    setCustomDateFrom("");
    setCustomDateTo("");
  };

  // Running balance
  const withBalance = useMemo(() => {
    let bal = 0;
    // Sort by date ascending for running balance
    const sorted = [...filteredTransactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const balMap = new Map<string, number>();
    sorted.forEach(t => {
      bal += t.type === "income" ? t.amount : -t.amount;
      balMap.set(t.id, bal);
    });
    return balMap;
  }, [filteredTransactions]);

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Transactions</h3>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 h-9 w-full sm:w-48"
              />
            </div>
            <div className="flex gap-1">
              {(["all", "income", "expense"] as const).map(f => (
                <Button key={f} size="sm" variant={typeFilter === f ? "default" : "outline"} onClick={() => setTypeFilter(f)} className="capitalize text-xs h-9">
                  {f}
                </Button>
              ))}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1.5 relative">
                  <Filter className="w-3.5 h-3.5" /> Filters
                  {hasActiveFilters && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 space-y-3" align="end">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">Advanced Filters</p>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs gap-1">
                      <X className="w-3 h-3" /> Clear
                    </Button>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Date Range</Label>
                  <Select value={dateRange} onValueChange={v => setDateRange(v as any)}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  {dateRange === "custom" && (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Input type="date" value={customDateFrom} onChange={e => setCustomDateFrom(e.target.value)} className="h-8 text-xs" />
                      <Input type="date" value={customDateTo} onChange={e => setCustomDateTo(e.target.value)} className="h-8 text-xs" />
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(c => <SelectItem key={c} value={c}>{categoryIcons[c]} {c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Amount Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" placeholder="Min" value={amountMin} onChange={e => setAmountMin(e.target.value)} className="h-8 text-xs" />
                    <Input type="number" placeholder="Max" value={amountMax} onChange={e => setAmountMax(e.target.value)} className="h-8 text-xs" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                <button onClick={() => toggleSort("date")} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                  Date <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Description</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Category</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Type</th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                <button onClick={() => toggleSort("amount")} className="inline-flex items-center gap-1 hover:text-foreground transition-colors ml-auto">
                  Amount <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground">Balance</th>
              {role === "admin" && <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 7 : 6} className="text-center py-12 text-muted-foreground">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map(t => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2 whitespace-nowrap">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="py-3 px-2"><HighlightText text={t.description} query={searchQuery} /></td>
                  <td className="py-3 px-2">
                    <Badge variant="secondary" className="font-normal text-xs gap-1">
                      <span>{categoryIcons[t.category] || "📁"}</span>
                      <HighlightText text={t.category} query={searchQuery} />
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className={`text-xs ${t.type === "income" ? "text-income border-income/30" : "text-expense border-expense/30"}`}>
                      {t.type}
                    </Badge>
                  </td>
                  <td className={`py-3 px-2 text-right font-medium ${t.type === "income" ? "text-income" : "text-expense"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  <td className={`py-3 px-2 text-right font-medium text-muted-foreground`}>
                    {formatCurrency(withBalance.get(t.id) || 0)}
                  </td>
                  {role === "admin" && (
                    <td className="py-3 px-2 text-right">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteTransaction(t.id)}>
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-expense" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
