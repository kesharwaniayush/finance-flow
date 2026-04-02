export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export const categoryIcons: Record<string, string> = {
  "Food & Dining": "🍔",
  "Rent & Housing": "🏠",
  "Travel": "🚗",
  "Shopping": "🛍️",
  "Entertainment": "🎬",
  "Utilities": "💡",
  "Healthcare": "🏥",
  "Salary": "💼",
  "Freelance": "💻",
  "Investments": "📈",
};

export const categories = Object.keys(categoryIcons);

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2025-03-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2025-03-02", description: "Apartment Rent", amount: 1400, category: "Rent & Housing", type: "expense" },
  { id: "3", date: "2025-03-03", description: "Grocery Store", amount: 87.50, category: "Food & Dining", type: "expense" },
  { id: "4", date: "2025-03-05", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "5", date: "2025-03-06", description: "Freelance Project", amount: 800, category: "Freelance", type: "income" },
  { id: "6", date: "2025-03-07", description: "Electric Bill", amount: 120, category: "Utilities", type: "expense" },
  { id: "7", date: "2025-03-08", description: "Restaurant Dinner", amount: 62.30, category: "Food & Dining", type: "expense" },
  { id: "8", date: "2025-03-10", description: "Flight Ticket", amount: 350, category: "Travel", type: "expense" },
  { id: "9", date: "2025-03-12", description: "New Shoes", amount: 95, category: "Shopping", type: "expense" },
  { id: "10", date: "2025-03-14", description: "Doctor Visit", amount: 200, category: "Healthcare", type: "expense" },
  { id: "11", date: "2025-03-15", description: "Investment Return", amount: 320, category: "Investments", type: "income" },
  { id: "12", date: "2025-03-17", description: "Coffee Shop", amount: 24.80, category: "Food & Dining", type: "expense" },
  { id: "13", date: "2025-03-19", description: "Internet Bill", amount: 65, category: "Utilities", type: "expense" },
  { id: "14", date: "2025-03-20", description: "Concert Tickets", amount: 150, category: "Entertainment", type: "expense" },
  { id: "15", date: "2025-03-22", description: "Freelance Bonus", amount: 450, category: "Freelance", type: "income" },
  { id: "16", date: "2025-03-24", description: "Supermarket", amount: 134.20, category: "Food & Dining", type: "expense" },
  { id: "17", date: "2025-03-25", description: "Uber Rides", amount: 42, category: "Travel", type: "expense" },
  { id: "18", date: "2025-03-27", description: "Clothing Store", amount: 210, category: "Shopping", type: "expense" },
  { id: "19", date: "2025-03-28", description: "Gas Bill", amount: 85, category: "Utilities", type: "expense" },
  { id: "20", date: "2025-03-30", description: "Dividend Payment", amount: 180, category: "Investments", type: "income" },
  // Extra historical data for richer filtering
  { id: "21", date: "2025-02-05", description: "February Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "22", date: "2025-02-10", description: "Feb Rent", amount: 1400, category: "Rent & Housing", type: "expense" },
  { id: "23", date: "2025-02-14", description: "Valentine Dinner", amount: 95, category: "Food & Dining", type: "expense" },
  { id: "24", date: "2025-02-18", description: "Gym Membership", amount: 50, category: "Healthcare", type: "expense" },
  { id: "25", date: "2025-02-20", description: "Side Project", amount: 700, category: "Freelance", type: "income" },
  { id: "26", date: "2025-02-25", description: "Electricity", amount: 110, category: "Utilities", type: "expense" },
  { id: "27", date: "2025-01-03", description: "January Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "28", date: "2025-01-08", description: "Jan Rent", amount: 1400, category: "Rent & Housing", type: "expense" },
  { id: "29", date: "2025-01-15", description: "Winter Jacket", amount: 180, category: "Shopping", type: "expense" },
  { id: "30", date: "2025-01-22", description: "Consulting Gig", amount: 1100, category: "Freelance", type: "income" },
];

export const monthlyData = [
  { month: "Oct", income: 5800, expenses: 3200, balance: 2600 },
  { month: "Nov", income: 6100, expenses: 3800, balance: 2300 },
  { month: "Dec", income: 5500, expenses: 4200, balance: 1300 },
  { month: "Jan", income: 6300, expenses: 3600, balance: 2700 },
  { month: "Feb", income: 5900, expenses: 3400, balance: 2500 },
  { month: "Mar", income: 6950, expenses: 3041.79, balance: 3908.21 },
];

// Daily spending data for heatmap (March 2025)
export const dailySpending: Record<string, number> = {
  "2025-03-01": 0, "2025-03-02": 1400, "2025-03-03": 87.5, "2025-03-04": 0,
  "2025-03-05": 15.99, "2025-03-06": 0, "2025-03-07": 120, "2025-03-08": 62.3,
  "2025-03-09": 0, "2025-03-10": 350, "2025-03-11": 0, "2025-03-12": 95,
  "2025-03-13": 0, "2025-03-14": 200, "2025-03-15": 0, "2025-03-16": 0,
  "2025-03-17": 24.8, "2025-03-18": 0, "2025-03-19": 65, "2025-03-20": 150,
  "2025-03-21": 0, "2025-03-22": 0, "2025-03-23": 0, "2025-03-24": 134.2,
  "2025-03-25": 42, "2025-03-26": 0, "2025-03-27": 210, "2025-03-28": 85,
  "2025-03-29": 0, "2025-03-30": 0, "2025-03-31": 0,
};
