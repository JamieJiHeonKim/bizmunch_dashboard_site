# Biz MuncH Dashboard Frontend

A comprehensive management dashboard for the Biz MuncH restaurant discount platform. This admin/manager interface enables real-time control of companies, restaurants, menus, discounts, and user accounts - all syncing instantly to the consumer-facing mobile app via MongoDB.

**BizMuncH URL:** [bizmunch-url](https://bizmunch.com/home)

**Backend Repository:** [bizmunch-backend](https://github.com/JamieJiHeonKim/bizmunch_dashboard_services)

### Application Workflow

1. **Login as Admin**
   - Navigate to `/admin/signin`
   - Enter your admin credentials
   - System redirects to Companies page

2. **Create a Company**
   - Click "Add Company" button
   - Upload company logo
   - Enter company name and manager email
   - Company appears instantly in the list

3. **Add a Restaurant**
   - Go to Restaurants tab
   - Click "Add Restaurant"
   - Set restaurant name, location, category (Asian, Fastfood, Café, etc.)
   - Upload restaurant logo
   - Assign a manager

4. **Upload Menu Items**
   - Click on a restaurant to view details
   - Click "Add Menu Item"
   - Upload food photo, set name, price, discount percentage
   - Menu item syncs to MongoDB → Mobile app users see it immediately

5. **Manage Users**
   - Go to Users tab
   - Create manager accounts assigned to specific companies
   - View all users (managers + employees) with filter options
   - Edit or delete user accounts

---

## Technologies Used

### Frontend Stack
- **React 18** - Modern UI with functional components and hooks
- **React Router v6** - Client-side routing with role-based protection
- **Redux Toolkit** - State management for auth and global data
- **Redux Persist** - Persist auth state to sessionStorage
- **Axios** - HTTP client with interceptors for API calls
- **Material-UI (MUI)** - Icon system and some UI components
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Pre-built Tailwind components (modals, buttons, spinners)

### Data Visualization
- **Chart.js + react-chartjs-2** - Line and bar charts for analytics
- **Recharts** - Complex data visualizations for manager dashboard

### Form Handling & Validation
- **React Hot Toast** - Toast notifications for CRUD feedback
- **React Datepicker** - Date range pickers for transaction filtering

### Deployment & DevOps
- **Docker** - Multi-stage containerized builds
- **Railway** - Cloud deployment platform
- **Nixpacks** - Railway's build system configuration
- **Serve** - Static file server for production builds

---

## System Architecture

### Design Rationale

This architecture was built to support **role-based access control**, **real-time data synchronization**, and **scalable operations** for a restaurant discount platform.

**Key Design Decisions:**

1. **Decoupled Frontend/Backend (REST API)**
   - **Why:** Allows dashboard and mobile app to share the same backend, enabling consistent business logic and data access
   - **Usage:** Dashboard admins update restaurants → Backend validates and writes to MongoDB → Mobile app users see changes in real-time

2. **Role-Based Architecture (Admin/Manager/Employee)**
   - **Why:** Different user types need different access levels and workflows (admins manage everything, managers handle their restaurants, employees track transactions)
   - **Usage:** JWT tokens contain role claims; frontend routes and backend endpoints enforce role-based permissions

3. **Redux + Redux Persist for Auth State**
   - **Why:** User role determines entire UI experience; must persist across page refreshes; needed globally across 30+ components
   - **Usage:** After login, Redux stores user object (email, role, token); Redux Persist saves to sessionStorage; protected routes check role before rendering

4. **Centralized API Layer**
   - **Why:** Single source of truth for backend URL, consistent error handling, automatic token injection
   - **Usage:** All API calls go through `services/api.jsx`; Axios interceptors add Bearer tokens to every request

5. **Modal-Based CRUD Operations**
   - **Why:** Keeps UI clean, allows multiple operations without page navigation, better UX than full-page forms
   - **Usage:** Every entity (company, restaurant, menu, user) has Create/Edit/Delete/View modals triggered by button clicks

6. **Real-Time MongoDB Integration**
   - **Why:** Dashboard changes must reflect instantly in mobile app; no batch processing or caching delays
   - **Usage:** Admin uploads menu photo → Backend saves to MongoDB → Mobile app queries same collection → Users see new menu item immediately

**Real-World Usage:**
- Admin creates restaurant → Uploads 10 menu items with photos → Sets 20% discount on all items → Manager logs in → Sees analytics dashboard with transaction history → Employee redeems discount via mobile app barcode → Manager records transaction in dashboard → Profit charts update in real-time

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐     │
│  │  Admin Web   │   │ Manager Web  │   │  Mobile App  │     │
│  │  Dashboard   │   │  Dashboard   │   │  (React      │     │
│  │   (React)    │   │   (React)    │   │  Native)     │     │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTPS (JWT Bearer Token)
┌────────────────────────────┼────────────────────────────────┐
│                  Railway (Dashboard Frontend)               │
│  ┌────────────────────────────────────────────────────┐     │
│  │            React SPA (Static Build)                │     │
│  │  • Role-based Routing  • Redux Store               │     │
│  │  • Protected Routes    • Modal Components          │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────────────────┬────────────────────────────────┘
                             │ REST API (Axios)
┌────────────────────────────┼────────────────────────────────┐
│                  Backend API Server (Node.js)               │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Express.js REST API                   │     │
│  │  • JWT Authentication  • Role Middleware           │     │
│  │  • File Upload (Multer) • Business Logic           │     │
│  │  • Image Storage       • Data Validation           │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────────────────┬────────────────────────────────┘
                             │ Mongoose ODM
                    ┌────────▼────────┐
                    │    MongoDB      │
                    │    Database     │
                    │                 │
                    │ Collections:    │
                    │ • users         │
                    │ • companies     │
                    │ • restaurants   │
                    │ • menus         │
                    │ • transactions  │
                    │ • notifications │
                    └─────────────────┘
```

### Frontend Architecture

```
src/
├── app.jsx                 # Root routing and role-based navigation
│
├── layout/                 # Layout wrappers with sidebars
│   ├── Admin.jsx           # Admin layout with sidebar and nav
│   ├── Manager.jsx         # Manager layout with sidebar and nav
│   └── Employee.jsx        # Employee layout with sidebar and nav
│
├── pages/                  # Route-level components
│   ├── Home/               # Public landing page
│   │   ├── Homepage.jsx
│   │   └── Homepage.css
│   │
│   ├── Admin/              # Admin-only pages
│   │   ├── Sign.jsx        # Admin login
│   │   ├── companies.jsx   # Company list and management
│   │   ├── company_details.jsx
│   │   ├── restaurants.jsx # Restaurant list
│   │   ├── restaurant_details.jsx
│   │   ├── user.jsx        # User management (managers + employees)
│   │   └── notifications.jsx
│   │
│   ├── Manager/            # Manager-only pages
│   │   ├── Signin.jsx
│   │   ├── dashboard.jsx   # Analytics, charts, transactions
│   │   ├── user.jsx        # Employee management for their company
│   │   └── notifications.jsx
│   │
│   └── Employee/           # Employee-only pages
│       ├── Signin.jsx
│       ├── Signup.jsx
│       ├── dashboard.jsx
│       ├── settings.jsx
│       └── notifications.jsx
│
├── components/             # Reusable UI components
│   ├── modals/
│   │   ├── admin/          # Admin CRUD modals
│   │   │   ├── Create_Company.jsx
│   │   │   ├── Edit_Company.jsx
│   │   │   ├── Delete_Company.jsx
│   │   │   ├── View_Company.jsx
│   │   │   ├── Create_Restaurant.jsx
│   │   │   ├── Create_Menu.jsx
│   │   │   ├── Create_Manager.jsx
│   │   │   └── ...
│   │   │
│   │   └── manager/        # Manager CRUD modals
│   │       ├── Create_Transaction.jsx
│   │       ├── Edit_User.jsx
│   │       └── ...
│   │
│   ├── Admin/
│   │   └── PopularProducts.jsx
│   ├── Manager/
│   │   ├── Sidebar.jsx
│   │   ├── Popular_Products.jsx
│   │   └── Recent_Transaction.jsx
│   ├── Employee/
│   │   └── Sidebar.jsx
│   │
│   ├── sidebar.jsx         # Shared sidebar component
│   ├── Profile_Btn.jsx     # Profile dropdown
│   ├── Profit_Chart.jsx    # Chart.js wrapper
│   ├── Company_Picker.jsx  # Company dropdown
│   ├── Date_Picker.jsx     # Date range selector
│   ├── input.jsx           # Custom input component
│   └── Modal_Header.jsx    # Reusable modal header
│
├── services/
│   ├── api.jsx             # Centralized API calls (all endpoints here)
│   ├── function.jsx        # Utility functions
│   └── profit_calculator.jsx # Business logic for analytics
│
├── redux/                  # State management
│   ├── store.js            # Redux store configuration
│   └── states/
│       └── user.js         # User slice (auth state)
│
└── assets/                 # Static assets
    ├── backgroundImage.jpg
    ├── bizmunch-icon-grey.png
    ├── bizmunch-icon-white.png
    └── ...
```

### Data Flow

1. **Authentication Flow**
   ```
   Login Form → Axios POST /users/auth/login → Backend Validates → 
   JWT Token Generated → Redux Store (user object) → Redux Persist (sessionStorage) → 
   Protected Route Checks Role → Redirect to Role-Specific Dashboard
   ```

2. **CRUD Operation Flow (Example: Create Restaurant)**
   ```
   Admin Clicks "Add Restaurant" → Modal Opens → 
   Admin Fills Form (name, logo, manager) → Submit → 
   Axios POST /users/dashboard/restaurants with FormData → 
   Backend Saves to MongoDB (restaurants collection) → 
   Success Response → Redux Update (optional) → 
   Toast Notification → Modal Closes → Parent Component Refetches Data → 
   UI Updates → Mobile App Queries Same MongoDB → Users See New Restaurant
   ```

3. **Image Upload Flow**
   ```
   Admin Selects Image → FileReader Previews → 
   FormData Appends File → Axios POST with multipart/form-data → 
   Backend Multer Middleware → Saves to Disk/S3 → 
   Returns Image URL → MongoDB Stores URL → 
   Frontend Displays Image via <img src={url} />
   ```

4. **Role-Based Access Control**
   ```
   User Logs In → Backend Returns JWT with Role Claim (admin/manager/employee) → 
   Redux Stores User Object → 
   React Router Checks Role Before Rendering Route → 
   Layout Component Checks Role → 
   Sidebar Shows Role-Specific Menu Items → 
   API Requests Include Bearer Token → 
   Backend Middleware Validates Token → 
   Checks Role for Endpoint Access → 
   Returns Data or 403 Forbidden
   ```

### Key Design Patterns

- **Centralized API Layer:** All API calls in `services/api.jsx` with Axios interceptors
- **Protected Routes:** Layout components enforce auth checks and role-based redirects
- **Modal Composition:** CRUD operations isolated in modal components with local state
- **Optimistic UI Updates:** Show toast immediately, refetch data in background
- **Prop Drilling Mitigation:** Redux for auth state, props for parent-child data flow
- **Component Reusability:** Shared components (sidebar, input, modal header) used across roles

---

## Features

### Admin Portal (Fully Functional)
- **Company Management:** Create, edit, delete, view restaurant groups with logos
- **Restaurant Management:** Add locations, set categories, upload logos, assign managers
- **Menu Management:** Upload menu item photos, set prices and discount percentages
- **User Management:** Create manager accounts, view all users, edit/delete accounts
- **Notifications:** Send platform-wide announcements *(in progress)*

### Manager Portal (Partially Complete)
- **Analytics Dashboard:** Profit charts, popular products, transaction history
- **Employee Management:** Create employee accounts, edit/delete for their company
- **Transaction Recording:** Log discount redemptions with barcode scanning
- **Date Filtering:** Filter transactions by custom date ranges

### Employee Portal (Not Yet Started)
- **Personal Dashboard:** View assigned restaurants and discounts
- **Settings:** Update profile, change password
- **Notifications:** Receive messages from admins

### Cross-Cutting Features
- **Role-Based Access Control:** JWT tokens with role claims
- **Real-Time Sync:** MongoDB changes reflect instantly in mobile app
- **Image Upload:** Restaurant logos and menu photos
- **Responsive Design:** Desktop and tablet support with Tailwind breakpoints

---

## Installation & Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running (see backend repo)
- MongoDB instance

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/bizmunch-dashboard-site.git
cd bizmunch-dashboard-site

# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
REACT_APP_SERVER_URL=http://localhost:5000

# Start development server
npm start

# Open http://localhost:3000
```

### Production Build

```bash
# Build the app
npm run build

# Serve locally (optional)
npx serve -s build
```

---

## Deployment

### Railway Deployment

This project is configured for Railway with `nixpacks.toml`:

```toml
[phases.setup]
nixPkgs = ['nodejs-18_x']

[phases.install]
cmds = ['npm ci']

[phases.build]
cmds = ['npm run build']

[start]
cmd = 'npx serve -s build -l $PORT'

[variables]
GENERATE_SOURCEMAP = 'false'
NODE_OPTIONS = '--max_old_space_size=4096'
```

**Deploy Steps:**
1. Push code to GitHub
2. Connect repository to Railway
3. Set environment variables:
   ```
   REACT_APP_SERVER_URL=https://your-backend.railway.app
   ```
4. Railway auto-builds and deploys
5. Access your dashboard at the generated Railway URL

### Docker Deployment

```bash
# Build the Docker image
docker build -t bizmunch-dashboard .

# Run the container
docker run -p 3000:3000 bizmunch-dashboard
```

**Dockerfile Structure:**
- Stage 1: Node.js 18 Alpine → Install dependencies → Build React app
- Stage 2: Serve static files with `serve` on port 3000

---

## API Integration

All API calls are centralized in `src/services/api.jsx`. The frontend communicates with the backend via REST API.

### Authentication Endpoints
```javascript
PUT  /users/auth/login              // Login (returns JWT)
POST /users/auth/register           // Register new user
PUT  /users/auth/password/change    // Change password
PUT  /users/auth/profile/update     // Update profile
```

### Admin Endpoints
```javascript
GET  /users/dashboard/companies                    // List all companies
POST /users/dashboard/companies                    // Create company
PUT  /users/dashboard/companies/:id                // Update company
DELETE /users/dashboard/companies/:id              // Delete company

GET  /users/dashboard/restaurants                  // List all restaurants
POST /users/dashboard/restaurants                  // Create restaurant
PUT  /users/dashboard/restaurants/:id              // Update restaurant
DELETE /users/dashboard/restaurants/:id            // Delete restaurant
GET  /users/dashboard/restaurant/:id/details       // Get restaurant details

POST /users/dashboard/menu/:restaurantId           // Add menu item
PUT  /users/dashboard/restaurant/menu/:restaurantId/:menuId  // Update menu
DELETE /users/dashboard/restaurant/menu/:restaurantId/:menuId // Delete menu

GET  /users/dashboard/users                        // List all users
POST /users/dashboard/managers                     // Create manager
PUT  /users/dashboard/user/:id                     // Update user
DELETE /users/dashboard/user/:id                   // Delete user

GET  /users/dashboard/notifications                // Get all notifications
POST /users/dashboard/notifications                // Create notification
```

### Manager Endpoints
```javascript
GET  /users/dashboard/employees            // List employees for manager's company
POST /users/dashboard/employees            // Create employee
PUT  /users/dashboard/employees/:id        // Update employee
DELETE /users/dashboard/employees/:id      // Delete employee

GET  /users/dashboard/transactions         // List transactions
POST /users/dashboard/transactions         // Create transaction

GET  /users/dashboard/popularproducts      // Get popular product stats
GET  /users/dashboard/companyNotifications // Get company-specific notifications
```

### Request/Response Format

**Authentication Header:**
```javascript
Authorization: Bearer <JWT_TOKEN>
```

**Example Request (Create Restaurant):**
```javascript
POST /users/dashboard/restaurants
Content-Type: multipart/form-data

FormData:
  name: "Downtown Burgers"
  location: "123 Main St, City"
  category: "Fastfood"
  managerName: "John Doe"
  managerEmail: "john@example.com"
  logo: <File>
```

**Example Response:**
```json
{
  "status": 201,
  "message": "Restaurant created successfully",
  "data": {
    "_id": "60d5ec49f1b2c8b1f8e4e1a1",
    "name": "Downtown Burgers",
    "location": "123 Main St, City",
    "category": "Fastfood",
    "logo": "https://backend.com/uploads/logo-123.png"
  }
}
```

---

## What I Learned

### Technical Skills Gained

**State Management at Scale**
- Managed auth state, company lists, restaurant data, menu items, and transactions across 30+ components
- Learned when to use Redux (global auth) vs. local state (modal forms) vs. props (parent-child)
- Implemented Redux Persist to survive page refreshes without re-login

**Role-Based Access Control**
- Built three completely separate user experiences in one codebase
- Learned to abstract layout components and use React Router's nested routes
- Implemented JWT token validation and role-based redirects

**API Design & Integration**
- Centralized all API calls in `services/api.jsx` for maintainability
- Used Axios interceptors to automatically inject Bearer tokens
- Handled multipart/form-data for image uploads vs. JSON for other requests
- Implemented proper error handling with user-friendly toast notifications

**Docker & Cloud Deployment**
- First experience with multi-stage Docker builds for production optimization
- Learned Railway's Nixpacks build system and environment variable management
- Debugged production-only bugs (missing dependencies, environment config issues)

**Component Architecture**
- Initially struggled with prop drilling, then learned when to lift state up
- Built reusable modal components for all CRUD operations
- Implemented optimistic UI updates for better UX

### Challenges Overcome

**Babel Dependency Hell**
- React Scripts 5.0.1 has a peer dependency issue with `@babel/plugin-proposal-private-property-in-object`
- Production builds failed on Railway until explicitly adding it to `dependencies`
- Solution: Added babel plugin to package.json and updated package-lock.json

**Token Management**
- Initially used localStorage, but had issues with tokens persisting across tabs
- Switched to sessionStorage with Redux Persist for better session isolation
- Learned the difference between stateless JWT auth and session-based auth

**Image Upload Complexity**
- Handling multipart/form-data required FormData API and different Content-Type headers
- Let browser set Content-Type automatically (don't manually set it with FormData)
- Backend needed Multer middleware to parse file uploads

**Timezone Bugs**
- Frontend, backend, and MongoDB had different timezone handling
- Transactions appeared on wrong dates in analytics
- Fixed with date-fns and explicit UTC conversions

**Modal State Management**
- Modals shared state in weird ways when using DaisyUI's dialog system
- Solution: Each modal manages its own local state and resets on close
- Pass `refresh()` callback from parent to refetch data after CRUD operations

### If I Built This Again

**TypeScript from Day 1**
- Would use TypeScript to catch shape mismatches between API responses and component props
- Too many runtime errors from passing wrong data shapes

**React Query Instead of Redux for API State**
- Redux is overkill when just caching server data
- React Query has built-in caching, refetching, and loading states
- Would keep Redux only for global UI state (theme, sidebar open/closed)

**Single UI Library**
- Mixing MUI and DaisyUI caused styling conflicts and bundle size bloat
- Next time: pick one library (probably shadcn/ui + Tailwind)

**Testing from the Start**
- No tests written due to time constraints
- Would add Jest + React Testing Library for critical paths (auth, CRUD flows)
- At minimum: unit tests for utility functions, integration tests for API calls

**Better Error Boundaries**
- Currently, a bad API response can crash the whole app
- Would add error boundaries with fallback UIs for graceful degradation

**Accessibility**
- Didn't consider keyboard navigation, focus management, or screen readers
- Would use ARIA labels, semantic HTML, and test with keyboard-only navigation

---

## Color Palette

The brand uses a warm, inviting color scheme:
- **Primary Orange:** `#F58549`
- **Light Orange/Cream:** `#FCDFCF`, `#FDECE2`
- **Text Gray:** `#667085`, `#101828`
- **Border Gray:** `#D9D9D9`

---

## License

MIT License - See LICENSE file for details

---

**Note:** This is the dashboard frontend only. The backend API and React Native mobile app are in separate repositories.
