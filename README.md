# MediaSphere AI – Smart OOH Media Planning & Buying SaaS Platform

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary%20Commercial-red.svg)](LICENSE)
[![Copyright](https://img.shields.io/badge/Copyright-2026%20Pushkar-blue.svg)](https://github.com/pushka2006)
[![Status: Closed Source](https://img.shields.io/badge/Access-Strictly%20Confidential-orange.svg)](LICENSE.md)

> [!CAUTION]
> **PROPRIETARY & ALL RIGHTS RESERVED**  
> This software is the exclusive intellectual property of **Pushkar ([@pushka2006](https://github.com/pushka2006))**. Unauthorized copying, cloning, downloading, modifying, running, or distribution is strictly prohibited. Violators will be assessed a mandatory **$1,000 USD liquidated damages fine** (payable in 30 days) and face immediate **criminal charges** and civil prosecution.

MediaSphere AI is an enterprise SaaS platform for OOH (Out-of-Home) media agencies managing **OOH Media Planning, Media Buying, Billboard Management, Mall Media, Retail Branding, Transit Media, Experiential Marketing, Brand Activations, Client CRM, Vendor Management, Inventory, Finance, and AI Recommendations**.

![MediaSphere AI Dashboard](https://raw.githubusercontent.com/pushka2006/mediasphere/main/public/dashboard-preview.png)

---

## 🌟 Key Features

- 📊 **Enterprise Dashboard**: Real-time KPIs, revenue trend area charts, campaign status donut charts, media type revenue breakdown, city-wise revenue distribution, live activity feed & stats ribbon.
- 🤖 **AI Media Planner**: Machine recommendation engine for media mix allocation (OOH + Mall + Digital Screens), location scoring, ROI prediction & budget optimization.
- 🗺️ **GIS Interactive Map**: Leaflet spatial view with dark tiles, city filters, media type filters, heatmaps, and interactive location pin cards.
- 👥 **Client CRM**: Manage corporate clients, lead pipeline, contracts, segmentations (Enterprise, Mid-Market, SME) & revenue history.
- 📢 **Campaign Management**: Table view & Kanban board views with status tracking, budget allocations, dates, and actual reach metrics.
- 🏙️ **OOH Media Inventory**: Support for Billboards, Unipoles, Gantries, Bus Shelters, Metro Panels, Airport Media, Railway & Digital Screens with traffic counts and lighting specs.
- 🏢 **Mall Media & Retail Branding**: Central Atriums, Escalators, Food Courts, LED Walls, Store Window Wraps, Shelf Branding, POSM, Glow Signs & Photo verification.
- 🎪 **Experiential Marketing & Activations**: Roadshows, Mall Activations, College Fest Sampling, QR Lead Collection & 3D Anamorphic billboard tracking.
- 💳 **Finance & Billing**: Client invoicing with 18% GST calculation, vendor purchase orders, payment tracking, collection efficiency & net profit margins.
- 📦 **Inventory Stock Management**: Track Flex, Vinyl, LED lights, MS Frames, ACP Sheets, printing materials & warehouse stock with low stock alerts.
- 👥 **Users & Role-Based Access Control (RBAC)**: Roles for Admin, Campaign Manager, Media Planner, Media Buyer, Finance Manager, Vendor, Installation Team, Creative Team, Client & Super Admin.

---

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling & UI**: Tailwind CSS, Glassmorphism design tokens, Custom UI
- **Animations**: Framer Motion, CSS Keyframes
- **Data Visualization**: Recharts (Area, Donut, Bar charts)
- **Maps**: Leaflet & React-Leaflet
- **ORM & Database**: Prisma ORM with SQLite (easily configurable to PostgreSQL)
- **Icons**: Lucide React

---

## 🚀 Quick Start Setup

### Prerequisites
- Node.js >= 18.x
- npm / yarn / pnpm

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/pushka2006/mediasphere.git
cd mediasphere

# Install dependencies
npm install
```

### 2. Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the platform.

---

## 📂 Project Architecture

```
mediasphere/
├── prisma/
│   └── schema.prisma              # Complete database schema (Users, Clients, Campaigns, Inventory, Invoices)
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/         # Executive Dashboard
│   │   │   ├── clients/           # Client CRM
│   │   │   ├── campaigns/         # Campaign Management
│   │   │   ├── ooh-media/         # OOH Media Inventory
│   │   │   ├── ai-planner/        # AI Recommendation Engine
│   │   │   ├── media-buying/      # Media Buying & Negotiation
│   │   │   ├── mall-media/        # Mall Media
│   │   │   ├── retail-branding/   # Retail Branding
│   │   │   ├── activations/       # Brand Activations
│   │   │   ├── experiential/      # Experiential & 3D Anamorphic
│   │   │   ├── vendors/           # Vendor Directory
│   │   │   ├── inventory/         # Stock Inventory
│   │   │   ├── finance/           # Invoicing & GST
│   │   │   ├── analytics/         # Reports & Analytics
│   │   │   ├── documents/         # Proposals & Quotations
│   │   │   ├── users/             # RBAC User Management
│   │   │   └── settings/          # System Settings
│   │   └── api/                   # REST API Endpoints
│   ├── components/
│   │   ├── layout/                # Sidebar & Header
│   │   └── dashboard/             # Dashboard Widgets & Charts
│   ├── lib/
│   │   ├── utils.ts               # Formatting & Helper utilities
│   │   └── mockData.ts            # Enterprise mock datasets
│   └── styles/
│       └── globals.css            # Dark mode glassmorphism styles
└── tailwind.config.ts             # MediaSphere luxury design system tokens
```

---

## 📜 Proprietary Commercial License & Legal Terms

Copyright &copy; 2026 **Pushkar** ([@pushka2006](https://github.com/pushka2006)). All Rights Reserved.

This software is **strictly proprietary and closed-source**. No part of this repository or its compiled output may be copied, cloned, reproduced, redistributed, sublicensed, hosted, or modified without prior written authorization signed directly by **Pushkar**.

### Key Legal Provisions:
1. **Exclusive Modification Rights**: Only the author (Pushkar) retains the legal power to alter or license this project. Any third-party tampering is void.
2. **Non-Removability**: License files and copyright headers cannot be stripped or altered under any circumstances.
3. **Retroactive Scope**: Applies to all past, present, and future downloads or clones; all prior implied access is expressly revoked.
4. **Mandatory Fine & Criminal Action**:
   - **$1,000 USD Liquidated Damages** per violation / unauthorized instance.
   - **Payment Period**: Payable within **thirty (30) calendar days (1 month)** of violation notice.
   - **Criminal Escalation**: Unpaid violations are immediately escalated for criminal prosecution under 17 U.S.C. § 506 and Indian Copyright Act 1957 Section 63.

For authorized commercial licensing or permission, contact: **Pushkar** ([@pushka2006](https://github.com/pushka2006)).
See full legal agreement in [LICENSE](LICENSE) and [LICENSE.md](LICENSE.md).
