<p align="center">
  <img src="/public/banner.png" width="100%" alt="finance Dashboard Preview Banner"/>
</p>

<h1 align="center">Finance Dashboard </h1>


<div align="center">

<a href="#">
  <img src="https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel" />
</a>
<a href="#">
  <img src="https://img.shields.io/badge/React-black?style=for-the-badge&logo=react&logoColor=61DAFB" />
</a>

</div>


# Finance Dashboard UI

A modern fintech-inspired dashboard built using React.js to track financial activity, analyze spending patterns, and manage transactions through a clean and interactive interface.

---

## Overview

FinSight is a frontend-focused finance dashboard that simulates real-world financial tracking applications. It provides users with a clear overview of income, expenses, and balance along with actionable insights.

The project focuses on **component-based architecture, efficient state management, and user-centric UI/UX design**.

---
## Tech Stack

###  Frontend
<p>
  <img src="https://skillicons.dev/icons?i=react,ts,js" />
</p>

### Styling
<p>
  <img src="https://skillicons.dev/icons?i=tailwind,css" />
</p>


### State Management
<p>
  <img src="https://skillicons.dev/icons?i=react" />
</p>


### Tools & Utilities
<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode" />
</p>

---

## Features

- **Dashboard Overview:** Total Balance, Income, Expenses with trend indicators  
- **Charts:** Line chart (time-based trends) + Pie chart (category breakdown)  
- **Transactions:** Search, filter, sort, running balance  
- **Role-Based UI:**  
  - Viewer → Read-only  
  - Admin → Add/Edit/Delete transactions  
- **Insights:** Highest spending category, monthly comparison  
- **Advanced Features:** Budget tracking, date range filtering, alerts  
- **Enhancements:** Dark mode, local storage, export CSV/JSON, animations  

---

##  Architecture

> Clean separation of concerns with scalable state and reusable components.

flowchart TD
    A[User Interface] --> B[React Components]

    B --> C[Dashboard]
    B --> D[Transactions]
    B --> E[Insights]
    B --> F[Reusable UI]

    C --> G[Charts (Recharts)]
    D --> H[Transaction Table]
    E --> I[Analytics Logic]

    B --> J[Context API]

    J --> K[Transactions State]
    J --> L[User Role]
    J --> M[Filters/Search]
    J --> N[Theme State]

    K --> O[Local Storage]
    L --> O
    M --> O
    N --> O

    O --> J

## Detailed Implementation

### Component Architecture
The application follows a modular component-based structure where each feature is split into reusable and maintainable components:

- **Dashboard Components** → Summary cards, charts, and financial overview  
- **Transaction Components** → Table, filters, search, and transaction actions  
- **Insights Components** → Analytics, trends, and observations  
- **Reusable UI Components** → Buttons, modals, cards, inputs  

This structure ensures scalability and separation of concerns.

---

### State Management Flow
Global state is managed using **React Context API**, keeping the application simple yet scalable.

Key states:
- `transactions` → Stores all financial records  
- `role` → Determines Viewer/Admin access  
- `filters` → Manages search, category, and date filters  
- `theme` → Handles dark/light mode  

Flow:
- User interaction updates state → Context updates → UI re-renders dynamically  

---

### Data Handling & Persistence
- Mock data is used for initial rendering  
- All user interactions (add/edit/delete transactions) update local state  
- Data is persisted using **localStorage**:
  - Transactions  
  - Selected role  
  - Theme preference  

This ensures data remains available after page refresh.

---

### Data Visualization Logic
- **Line Chart:** Displays financial trends over time (income vs expenses)  
- **Pie Chart:** Represents category-wise spending distribution  
- **Bar Chart (optional):** Monthly comparison  

Charts dynamically update based on filters and selected date range.

---

###  Role-Based UI Logic
The application simulates role-based access:

- **Viewer:**
  - Can only view data  
  - No modification access  

- **Admin:**
  - Can add, edit, and delete transactions  
  - Access to action buttons and modal forms  

Conditional rendering ensures UI changes based on role.

---

###  Filtering & Search Logic
- Real-time search based on category or amount  
- Multi-filter support:
  - Type (Income/Expense)  
  - Category  
  - Date range  
- Filtering is applied before rendering the transaction list  

---

###  Performance Considerations
- Efficient state updates using React hooks  
- Avoided unnecessary re-renders with proper state separation  
- Reusable components reduce duplication  

---

###  UI/UX Design Decisions
- Used a **fintech-inspired color system** (green for income, red for expenses)  
- Maintained consistent spacing and typography  
- Focused on readability and quick data interpretation  
- Added subtle animations for better interaction feedback  

---

###  Responsiveness Strategy
- Grid-based layouts for flexibility  
- Responsive charts and tables  
- Mobile-friendly transaction view (scrollable table)  

---

###  Scalability Considerations
- Easily extendable to backend integration (REST API / Firebase)  
- Can integrate authentication for real RBAC  
- Supports adding more analytics modules  

---

## Project Structure & Setup

###  Detailed Project Structure

The project follows a modular and scalable architecture to ensure clean code organization, reusability, and easy maintenance.
```
src/
 ├── components/        # Reusable and feature-based UI components
 │    ├── Dashboard/    # Summary cards, charts, financial overview
 │    ├── Transactions/ # Transaction table, filters, search, actions
 │    ├── Insights/     # Analytics, trends, and insights
 │    ├── UI/           # Common UI elements (buttons, modals, inputs)
 │
 ├── pages/             # Application pages/routes
 │    └── Home.tsx      # Main dashboard page
 │
 ├── context/           # Global state management (Context API)
 │    └── AppContext.tsx
 │
 ├── data/              # Mock/static data
 │    └── mockData.ts
 │
 ├── utils/             # Helper functions (calculations, filters, etc.)
 │    └── helpers.ts
 │
 ├── hooks/             # Custom React hooks (optional)
 │
 ├── styles/            # Global styles (if used)
 │
 ├── App.tsx            # Root component
 └── main.tsx           # Entry point (React DOM render)
 ```

 ## Getting Started

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v16 or above)
- npm or yarn
- Git

---

### Installation
 ### 1. Clone the repository
```bash
git clone https://github.com/kesharwaniayush/finance-flow.git
cd finance-flow
```

### 2. Install frontend dependencies
```
npm install
```

### 3. start the development server
```
npm run dev
```
## 🙏 Acknowledgement

I would like to thank the team for providing this assignment opportunity, which allowed me to demonstrate my frontend development skills and approach to building scalable user interfaces.

This project was built as part of an evaluation process and helped me strengthen my understanding of:

- Component-based architecture in React  
- State management and UI logic  
- Data visualization and dashboard design  
- Creating clean, responsive, and user-friendly interfaces  

I also acknowledge the open-source community and resources that helped in building this project, including:

- React ecosystem  
- Recharts for data visualization  
- Tailwind CSS for styling  
- Various UI/UX inspirations from modern fintech dashboards  

---

> This project reflects my approach to problem-solving, design thinking, and frontend engineering best practices.
