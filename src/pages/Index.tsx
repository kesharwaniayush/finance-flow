import { FinanceProvider } from "@/context/FinanceContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import TransactionTable from "@/components/dashboard/TransactionTable";
import Insights from "@/components/dashboard/Insights";
import BudgetTracker from "@/components/dashboard/BudgetTracker";
import MonthlyComparisonChart from "@/components/dashboard/MonthlyComparisonChart";
import ExpenseHeatmap from "@/components/dashboard/ExpenseHeatmap";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import FloatingAddButton from "@/components/dashboard/FloatingAddButton";

const Index = () => (
  <FinanceProvider>
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <DashboardHeader />
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <BalanceChart />
          </div>
          <div className="space-y-4">
            <BudgetTracker />
            <AlertsPanel />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MonthlyComparisonChart />
          <CategoryChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TransactionTable />
          </div>
          <div className="space-y-4">
            <Insights />
            <ExpenseHeatmap />
          </div>
        </div>
      </div>
      <FloatingAddButton />
    </div>
  </FinanceProvider>
);

export default Index;
