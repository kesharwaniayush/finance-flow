import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { monthlyData } from "@/data/mockData";

const BalanceChart = () => (
  <div className="glass-card rounded-xl p-5">
    <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => `$${v / 1000}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              fontSize: 13,
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
          />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="hsl(var(--income))" strokeWidth={2} dot={{ r: 4 }} name="Income" />
          <Line type="monotone" dataKey="expenses" stroke="hsl(var(--expense))" strokeWidth={2} dot={{ r: 4 }} name="Expenses" />
          <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="Balance" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BalanceChart;
