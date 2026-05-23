# 📊 Antigravity Admin Panel

A premium, modern, and interactive administrator dashboard built with React, TypeScript, and Tailwind CSS. Featuring dynamic charts, settings panel, recent activity streams, custom data tables, and an integrated AI Assistant powered by Gemini.

---

## 🌟 Preview

![Admin Panel Preview](./images/admin%20panel.png)

---

## 🚀 Features

- **💡 AI Assistant**: An interactive AI chat assistant directly in your dashboard to help query insights, manage workflows, and get instant suggestions.
- **📈 Rich Analytics**: Dynamic, responsive data visualizations using Recharts representing monthly metrics, revenue streams, and performance stats.
- **🗂️ Interactive Data Table**: Comprehensive table component with search, filtering, and sorting capabilities for handling large datasets.
- **⚙️ Settings Interface**: Highly custom settings configurations for managing user profiles, theme toggles, system notifications, and security protocols.
- **🔔 Real-time Activity Log**: Chronological activity feed tracking user actions, security alerts, and system updates.
- **⚡ Modern Design System**: Built with glassmorphism, responsive grid layouts, and micro-animations via Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with [Vite 8](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📥 Getting Started

### ⚙️ Setup & Execution

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Build the application for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── public/                 # Static public assets
├── images/                 # Project documentation screenshots
│   └── admin panel.png     # Dashboard preview screenshot
├── src/
│   ├── assets/             # Images, fonts, and styling assets
│   ├── components/         # Reusable dashboard UI widgets
│   │   ├── AIAssistant.tsx # Interactive AI chat component
│   │   ├── ChartsSection.tsx # Recharts visualization layouts
│   │   ├── DataTable.tsx   # Sortable and searchable grid data
│   │   ├── RecentActivity.tsx # Log activity flow list
│   │   ├── SettingsUI.tsx  # User & system options screen
│   │   ├── Sidebar.tsx     # Collapsible navigation drawer
│   │   ├── StatCards.tsx   # Metric overview panels
│   │   └── Topbar.tsx      # App header with notification panel
│   ├── context/            # React global context providers
│   ├── utils/              # Helper functions & utility files
│   ├── App.tsx             # Root template & layout orchestration
│   ├── index.css           # Global custom stylesheet
│   └── main.tsx            # React application entrypoint
```
