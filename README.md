# Biz MuncH Dashboard Frontend

A comprehensive management dashboard for the Biz MuncH mobile app ecosystem.
This repo servers for enabling administrators and restaurant managers to control discount campaigns, menu items, user accounts, and real-time data that feeds directly into the customer-facing mobile application.

## Overview

Biz MuncH is a mobile app that connects users with exclusive discounts at local restaurants. Every week, users receive a curated selection of 10 restaurants with special offers, rotating every Monday at midnight. This dashboard serves as the central system of the entire operation. Dashboard is where admins create companies, onboard restaurants, upload menus, set discount percentages, and manage the entire user ecosystem.

**The problem this solves:** Restaurant partners need an easy way to manage their offerings, admins need oversight of the entire platform, and all changes need to reflect immediately in the mobile app. This dashboard bridges that gap with real-time MongoDB integration.

## System Architecture

### The Big Picture

```
Dashboard (React) ⟷ REST API ⟷ MongoDB ⟷ Mobile App (React Native)
```

This dashboard is the **admin/manager interface** for a larger ecosystem:
- **Frontend**: React-based SPA with role-based routing
- **Backend**: RESTful API (not in this repo) that handles authentication, data validation, and business logic
- **Database**: MongoDB for real-time data persistence
- **Mobile App**: Separate React Native app (not in this repo) that consumers use

All CRUD operations performed in this dashboard write directly to MongoDB, and the mobile app reads from the same database - meaning any menu update, discount change, or restaurant addition appears instantly for end users.

### Role-Based Architecture

The system supports three distinct user types with isolated workflows:

**Admin Portal:** (So far only Admin Portal is fully working)
- Manage all companies (restaurant groups) and individual restaurants
- Create manager accounts and assign them to companies
- Upload restaurant logos, menus, and set discount percentages
- Send platform-wide notifications (Not completed)
- View all users (managers and employees) across the system

**Manager Portal:** (Not yet completed)
- View dashboard analytics for their assigned restaurant(s)
- Manage employee accounts for their company
- Create transaction records when discounts are redeemed
- Track popular products and recent transaction history
- Receive company-specific notifications from admins

**Employee Portal:** (Not yet started)
- View personal dashboard
- Access notifications
- Manage account settings and password changes
- Browse available restaurant discounts (future feature)

## Tech Stack & Why I Chose Each

### Frontend Framework
**React 18** with functional components and hooks throughout. I went with React because:
- Component reusability (modals, forms, and layout wrappers are used across 20+ pages)
- Virtual DOM for efficient updates when admins are managing large datasets
- Strong ecosystem for the additional libraries I needed

### State Management
**Redux Toolkit + Redux Persist** for global state. Key decisions:
- User authentication state needs to persist across page refreshes
- Role based routing requires consistent access to user role
- Redux Persist saves to sessionStorage so tokens/user info survive F5

**Why Redux over Context API?** Initially tried Context, but with 15+ pages needing access to user state, prop drilling became a nightmare. Redux centralized it cleanly.

### Routing
**React Router v6** with protected route wrappers:
- Separate route trees for `/admin/*`, `/manager/*`, and `/employee/*`
- Programmatic navigation after login based on user role
- Nested layouts that wrap role-specific pages with their sidebar/nav

### UI Component Libraries
**Material-UI (MUI)** for icons and some components:
- Needed a consistent icon system (EditOutlined, DeleteOutline, Add, etc.)
- Used `@mui/material` components for a few complex inputs

**DaisyUI + Tailwind CSS** for styling:
- DaisyUI gave me modal components and loading spinners out of the box
- Tailwind for styling - way faster than writing custom CSS for every element
- This combo let me build responsive layouts quickly while maintaining consistency

### Forms & Date Handling
**React Datepicker** for date range selection:
- Managers need to filter transactions by date
- Custom styling to match the orange/cream brand palette

**React Hot Toast** for notifications:
- Clean, dismissible toast notifications for CRUD operations
- Better UX than native alerts

### HTTP Client
**Axios** for all API calls:
- Centralized configuration in `services/api.jsx`
- Interceptors for adding auth tokens to every request
- Better error handling than fetch

### Containerization
**Docker** with a multi-stage build:
- Stage 1: Install dependencies and build the React app
- Stage 2: Serve the build folder with `serve`
- Deployed on Railway with Nixpacks configuration for automatic builds

## Project Structure

```
src/
├── app.jsx                    # Root routing and role-based navigation
├── layout/                    # Layout wrappers with sidebars for each role
│   ├── Admin.jsx
│   ├── Manager.jsx
│   └── Employee.jsx
├── pages/                     # All page components, organized by role
│   ├── Admin/                 # Companies, restaurants, users, notifications
│   ├── Manager/               # Dashboard, transactions, user management
│   ├── Employee/              # Dashboard, settings, authentication
│   └── Home/                  # Public landing page
├── components/                # Reusable UI components
│   ├── modals/                # All modal dialogs (create, edit, delete, view)
│   ├── Admin/                 # Admin-specific components (PopularProducts)
│   ├── Manager/               # Manager-specific components (charts, tables)
│   └── Employee/              # Employee-specific components
├── services/
│   ├── api.jsx                # All API calls centralized here
│   ├── function.jsx           # Utility functions
│   └── profit_calculator.jsx  # Business logic for profit calculations
└── redux/                     # Redux store and user state slice
```

### Design Patterns I Used

**Centralized API Layer**: Every API call goes through `services/api.jsx`. Benefits:
- Single source of truth for the backend URL
- Token management in one place
- Easy to add interceptors or modify request structure

**Component Composition for Modals**: Every CRUD operation (Create, Edit, Delete, View) is its own modal component:
- Keeps page components clean
- Modals are triggered by `document.getElementById('modal_id').showModal()` (DaisyUI pattern)
- Each modal manages its own local state and loading states

**Protected Routes**: Layout components wrap pages and handle auth checks:
- If no token in sessionStorage, redirect to signin
- Role mismatch (e.g., manager trying to access `/admin`) redirects appropriately

**Optimistic UI Updates**: After create/edit/delete operations:
- Show success toast immediately
- Call `refresh()` function passed as prop to refetch data
- Gives snappy UX even with network latency

## Key Features

### For Admins
- **Company Management**: Create restaurant groups (e.g., "Downtown Burgers Inc"), upload logos, track number of restaurants per company
- **Restaurant Management**: Add individual locations, set categories (Asian, Fastfood, Café, Grill, etc.), upload logos, assign managers
- **Menu Management**: Upload menu item photos, set names, prices, and discount percentages - these appear in the mobile app instantly
- **User Management**: Create manager accounts, view all users (managers + employees), edit user details, delete accounts
- **Notifications**: Send platform-wide or company-specific announcements

### For Managers
- **Analytics Dashboard**: Profit charts, popular products, recent transactions
- **Employee Management**: Create employee accounts for their company, edit/delete employees
- **Transaction Recording**: Log when discounts are redeemed (barcode scanning integration)
- **Filtering & Search**: Date range pickers for transaction history

### For Employees
- **Personal Dashboard**: View assigned restaurants and available discounts
- **Settings Management**: Update profile info, change password
- **Notifications**: Receive messages from admins and managers

### Cross Features
- **Role Based Access Control**: JWT tokens with role claims, enforced on both frontend routing and backend API
- **Real-Time Data Sync**: All changes write to MongoDB and are immediately queryable by the mobile app
- **Image Upload**: Admins upload restaurant logos and menu item photos, stored on the backend and served via URL
- **Responsive Design**: Works on desktop and tablet (mobile-first design with Tailwind breakpoints)

## What I Learned

### Technical Skills Gained

**State Management at Scale**: Managing user auth state, company lists, restaurant data, menu items, and transaction history across 30+ components taught me when to use Redux (global auth) vs. local state (modal forms) vs. props (parent-child data flow).

**API Design Patterns**: Working with a RESTful backend taught me the importance of:
- Consistent request/response structures
- Proper HTTP methods (PUT for login felt weird but matched the backend)
- Token-based auth with Bearer tokens in headers
- Error handling and user feedback

**Role-Based Routing**: Building three completely separate user experiences in one codebase:
- Learned to abstract layout components
- Used React Router's nested routes effectively
- Implemented redirect logic based on user role after login

**Docker & Deployment**: First time using multi-stage Docker builds and deploying on Railway:
- Learned about Nixpacks (Railway's build system)
- Debugged missing dependencies in production vs. development
- Understood environment variables and build-time vs. runtime configs

**Component Architecture**: Struggled with prop drilling early on, then learned:
- When to lift state up vs. keep it local
- How to compose modals and pass refresh callbacks
- The power of render props and children patterns

### Challenges Overcome

**Babel Dependency Hell**: React Scripts 5.0.1 has a peer dependency issue with `@babel/plugin-proposal-private-property-in-object`. Took hours of Googling to find the fix (explicitly adding it to dependencies).

**Token Management**: Initially stored tokens in localStorage, but that persists across tabs in weird ways. Switched to sessionStorage for better security and session isolation.

**Image Uploads**: Handling multipart/form-data vs. JSON was tricky. Learned to use FormData and let the browser set Content-Type headers automatically.

**Date Filtering**: Timezone mismatches between frontend, backend, and MongoDB caused transactions to appear on the wrong day. Fixed with date-fns and explicit UTC conversions.

### If I Built This Again

**TypeScript**: Would absolutely use TypeScript from the start. The number of times I passed the wrong shape of data to a component or API call was embarrassing.

**React Query**: Instead of Redux for API state, I'd use React Query. Redux is overkill when you're just caching server data.

**Component Library Consistency**: Pick one library (MUI or DaisyUI + Tailwind), not both. Mixing them caused styling conflicts.

**Testing**: Would add Jest + React Testing Library for at least critical paths (login, CRUD operations).

**Better Error Boundaries**: Right now, if an API call fails badly, the whole app can crash. Would add proper error boundaries and fallback UIs.

**Accessibility**: Didn't think about keyboard navigation, screen readers, or ARIA labels until too late. Would bake accessibility in from the start next time.

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend API running (not included in this repo)
- MongoDB instance

### Environment Variables

Create a `.env` file in the root:

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`.

### Building for Production

```bash
# Create optimized production build
npm run build

# Serve the build locally (optional)
npx serve -s build
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t bizmunch-dashboard .

# Run the container
docker run -p 3000:3000 bizmunch-dashboard
```

## API Endpoints Used

All endpoints are in `src/services/api.jsx`. Key routes:

**Authentication:**
- `PUT /users/auth/login` - Login (returns JWT)
- `POST /users/auth/register` - Register new user
- `PUT /users/auth/password/change` - Change password

**Admin Endpoints:**
- `GET /users/dashboard/companies` - List all companies
- `POST /users/dashboard/companies` - Create company
- `GET /users/dashboard/restaurants` - List all restaurants
- `POST /users/dashboard/restaurants` - Create restaurant
- `POST /users/dashboard/menu/{restaurantId}` - Add menu item
- `GET /users/dashboard/users` - List all users
- `POST /users/dashboard/managers` - Create manager account

**Manager Endpoints:**
- `GET /users/dashboard/employees` - List employees for manager's company
- `POST /users/dashboard/transactions` - Create transaction record
- `GET /users/dashboard/transactions` - List transactions
- `GET /users/dashboard/popularproducts` - Get popular product stats

## License

This project is part of my portfolio. Feel free to look around, but please don't copy it wholesale for your own portfolio.

**Note**: This is the dashboard frontend only. The backend API and mobile app are separate repositories not included here.
