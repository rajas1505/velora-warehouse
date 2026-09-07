# VELORA – Warehouse Management System (WMS)

A modern, high-performance warehouse management application built with React, Vite, React Router, Tailwind CSS, and Lucide React. Designed to interface seamlessly with a PHP/MySQL REST backend.

---

## 🚀 Quick Start

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and set your backend PHP API URL:
```env
VITE_API_BASE_URL=http://localhost/velora/backend
```

*Note: If the backend API is unreachable or during local preview mode, VELORA automatically falls back to an interactive local state with persistent local storage so all features remain functional.*

### 3. Development Server
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build for Production

To compile static production assets:
```bash
npm run build
```

---

## 📡 Backend API Endpoints (PHP/MySQL)

The React frontend communicates with the following REST endpoints:

- **Dashboard:** `GET /api/dashboard.php`
- **Inventory:**
  - `GET /api/inventory.php`
  - `POST /api/inventory.php`
  - `PUT /api/inventory.php?id={id}`
  - `DELETE /api/inventory.php?id={id}`
- **Orders:**
  - `GET /api/orders.php`
  - `POST /api/orders.php`
  - `PUT /api/orders.php?id={id}`
  - `DELETE /api/orders.php?id={id}`
- **Contact:**
  - `GET /api/contact.php`
  - `POST /api/contact.php`
  - `DELETE /api/contact.php?id={id}`

---

## 🎨 Design System

- **Primary Canvas:** `#07111f`
- **Secondary Canvas:** `#0b1525`
- **Card Background:** `#182331`
- **Primary Accent:** `#238cff` (Bright Blue)
- **Secondary Accent:** `#46d5ff` (Electric Cyan)
- **Primary Buttons:** `linear-gradient(90deg, #238cff, #46d5ff)`
