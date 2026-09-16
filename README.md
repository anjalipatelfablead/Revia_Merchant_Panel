# 🌟 Revia Merchant Suite

[![React](https://img.shields.io/badge/React-19.0-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-gold.svg)]()

> **Enterprise Venue Provisioning, Customer CRM & Pay-As-You-Go Credit System**

Revia Merchant Suite is a premium, pixel-perfect management panel designed for high-volume coffee roasteries, artisanal venues, and retail chains. It features dynamic loyalty program orchestration, NFC/QR point-of-sale redemption terminals, customer CRM, campaign builder with BOGO perks, and a pay-as-you-go credit wallet model.

---

## ✨ Key Features

### 💳 1. Pay-As-You-Go Wallet & Credit System
* **No Recurring Monthly Contracts**: Merchants pay only for active operations using wallet credits.
* **Credit-Gated Actions**:
  * `branch_setup` — 100 Credits
  * `staff_invite` — 20 Credits
  * `loyalty_setup` — 50 Credits
  * `campaign_creation` — 50 Credits
  * `qr_generation` — 10 Credits
  * `redemption_commission` — 5 Credits per settlement
* **Low Balance Guard**: Persistent banner alerts when balance falls below **300 credits**, featuring inline top-up modals and action-blocked prompts (`NotEnoughCreditModal`).
* **Transaction Ledger**: Full transaction audit history with filtering, sorting, pagination, and CSV exports.

### 🚀 2. Onboarding Orchestrator (4-Step Wizard)
* **Step 01 // Business Profile**: Business information & tenant profile setup.
* **Step 02 // Operations**: Category preferences & regional settings.
* **Step 03 // Physical Retail Profile**: Flagship outlet address, beacon verification (±1.2m accuracy), and register architecture selection (Counter, Salon, Express).
* **Step 04 // Review & Launch**: Configuration review and pay-as-you-go credit wallet initialization.

### 📣 3. Campaign Builder (5-Step Engine)
* **Step 01: Basics**: Campaign branding & type selection (Discount, BOGO, Visit, Stamp, Happy Hours).
* **Step 02: Audience**: Tier filtering (Obsidian VIP, Gold Reserve) and cohort reach estimation.
* **Step 03: Conditions & Rules**: Real-time evaluation rules with nested `AND / OR` condition blocks.
* **Step 04: Reward Def**: Reward definition specifying perks, discounts, cashback, points, or **Free Item BOGO**.
* **Step 05: Review & Publish**: Cost disclosure (50 credit fee), 8.4x ROI forecasts, and live Apple/Google Wallet passbook card preview.

### 📱 4. POS Redemption Terminal & QR Engine
* **Redemption Terminal**: High-speed reward scanning terminal with 5 credit settlement commission per redemption.
* **Dynamic QR Codes**: Batch generation of venue QR codes for counter stands and product assets.

### 🏬 5. Multi-Branch & Staff Governance
* Multi-outlet telemetry, operating hours, timezone alignment, and granular role-based access control (RBAC).

---

## 🛠️ Technology Stack

* **Framework**: React 19 + TypeScript 5.8
* **Build Tool**: Vite 6
* **Styling**: Tailwind CSS 4 + Custom Revia Luxury Design System (`#FAF8F5`, `#1A1615`, `#D4A753`, `#9E782F`)
* **Icons**: Lucide React Icons
* **UI Components**: Radix UI Primitives, Custom Badges & Modals

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anjalipatelfablead/Revia_Merchant_Panel.git
   cd Revia_Merchant_Panel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Verify TypeScript compilation**:
   ```bash
   npm run lint
   ```

---

## 📁 Project Structure

```text
Revia_Merchant_Panel/
├── index.html                   # HTML entry point with Revia brand favicon
├── public/
│   └── favicon.svg              # Revia gold gradient brand icon
├── src/
│   ├── App.tsx                  # Main app layout, routing, & viewport scroll controller
│   ├── context/
│   │   └── WalletContext.tsx    # Reactive credit wallet state & transaction ledger
│   ├── components/
│   │   ├── common/              # Buttons, badges, command palette
│   │   ├── layout/              # Sidebar drawer & Header navigation
│   │   └── wallet/              # LowBalanceBanner, AddCreditModal, NotEnoughCreditModal
│   ├── pages/                   # Application views (Dashboard, Campaigns, Billing, Onboarding, etc.)
│   ├── types/                   # TypeScript interface definitions (wallet, nav, mock data)
│   └── data/                    # Initial mock datasets (outlets, customers, audit logs)
└── package.json                 # Node package configuration & scripts
```

---

## 🛡️ Security & Compliance

* **SOC-2 Type II Certified Infrastructure**: Encrypted data telemetry.
* **PCI-DSS Level 1**: Compliant transaction billing standards.

---

## 📄 License

Proprietary © Revia Merchant Suite. All rights reserved.
