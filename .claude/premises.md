# Project Premises & Context

This document explains the foundational assumptions and context for SafeQuote project.

## Project Overview

**SafeQuote** is a web application helping parents find safe vehicles for teens by:
- Searching and filtering vehicles with real NHTSA crash test ratings
- Comparing insurance quotes based on vehicle safety
- Finding driver's education resources

**Current State**: Standalone React + Vite application
**Goal**: Migrate to WordPress Theme with Embedded React
**Timeline**: 4-5 weeks (5 phases)
**Hosting**: Single unified WordPress server ($10-30/month)

## Why This Migration?

Customer requirements:
- ✅ Easier to maintain (one platform, not multiple services)
- ✅ Cost-effective (single hosting vs. dual services)
- ✅ Content management capabilities (WordPress admin)
- ✅ Preserve existing React app (90% of code stays the same)

## Migration Approach: WordPress Theme + Embedded React

### What This Means

```
WordPress Installation (safequote.local)
├── wp-content/themes/safequote-theme/
│   ├── functions.php          (Enqueue React build files)
│   ├── index.php              (Mount React app)
│   └── react-app/             (Entire React application)
│       ├── src/
│       ├── package.json
│       └── vite.config.js
```

React is **built** into a static bundle, then **served** by WordPress like any static asset.

### Why NOT Other Approaches?

| Approach | Why Rejected |
|----------|-------------|
| **Headless WordPress** | More expensive ($30-70/mo), added complexity (CORS, separate deployments) |
| **Full PHP Rewrite** | Throws away React investment, slower to develop (8-12 weeks), worse UX (page reloads) |
| **Gutenberg Blocks** | Major refactoring needed, doesn't suit flow-based SPA experience |
| **WordPress Plugin** | Less clean, more fragmented than theme approach |

## Current Application Structure

### Tech Stack

- **Framework**: React 18.2.0 with Hooks
- **Build Tool**: Vite 4.4.5 (fast, modern)
- **Styling**: Tailwind CSS 3.3.3 + Radix UI
- **Animations**: Framer Motion 10.16.4
- **Icons**: Lucide React
- **Routing**: React Router 6.16.0 (client-side)
- **External API**: NHTSA Safety Ratings (real-time)

### Data Architecture (CRITICAL - Know This!)

#### 1. Vehicles Data
**Location**: `src/lib/vehicleData.js`
**Type**: Static JavaScript array (hardcoded)
**Count**: 10 vehicles

```javascript
{
  id: number,
  make: string,              // e.g., 'Honda'
  model: string,             // e.g., 'Civic'
  year: number,              // e.g., 2024
  condition: 'New' | 'Preowned',
  type: 'Sedan' | 'SUV' | 'Truck' | 'Hatchback',
  price: number,             // Dollar amount
  mileage: number,           // Odometer reading
  safetyRating: 1-5,         // Integer
  image: string,             // URL to CDN image
  safetyFeatures: string[]   // Array of feature names
}
```

#### 2. Vehicle Filtering
**Function**: `getVehicles(filters)` in `vehicleData.js`
**Method**: Client-side JavaScript `.filter()` on array
**Filters Supported**:
- `condition`: 'New', 'Preowned', or 'all'
- `vehicleType`: 'Sedan', 'SUV', 'Truck', 'Hatchback', or 'all'
- `minSafetyRating`: 1-5 (numeric)
- `maxPrice`: Dollar amount (numeric)

**Implementation**: All filtering happens in browser, no backend.

#### 3. Insurance Quotes
**Location**: `src/lib/insuranceData.js`
**Type**: Calculated on-the-fly (not stored!)
**Function**: `getInsuranceQuotes(vehicle)` returns 3 provider quotes

```javascript
Formula:
  basePrice = vehicle.condition === 'New' ? 180 : 150
  safetyDiscount = vehicle.safetyRating * 2
  monthlyPrice = basePrice - safetyDiscount + provider_premium

// Returns 3 providers:
// 1. SafeGuard Insurance (Premium: -0, discount: 15%)
// 2. DriveSecure (+20, discount: 10%)
// 3. YouthShield Auto (+35, discount: 12%)
```

**Key Point**: Insurance is **CALCULATED**, not queried from database. Same formula every time.

#### 4. NHTSA Safety Ratings
**Location**: `src/components/SafetyRatings.jsx`
**Source**: Real NHTSA API (external)
**URL**: `https://api.nhtsa.gov/SafetyRatings/`
**Process**: Two-step API calls
  1. Get ratings by year/make/model
  2. Get details by VehicleId
**Data Returned**: Crash test results, safety features, complaints, recalls
**Status**: Completely unchanged in migration

### No Backend Currently

**Critical Point**: There is NO backend server for SafeQuote currently.

- ❌ No Node.js server
- ❌ No database
- ❌ No REST API
- ❌ No authentication
- ✅ Only static assets + client-side logic + external NHTSA API

## Phase 1 Strategy: Keep It Simple

### What We're NOT Doing in Phase 1

1. ❌ Creating WordPress custom post types for vehicles
   - Reason: Already in static JS file, client-side filtering works
   - Cost: 2-3 days of development
   - Benefit: Zero (can't update vehicles through admin anyway yet)

2. ❌ Creating REST API endpoints
   - Reason: Client-side filtering sufficient
   - Cost: 1-2 days of development
   - Benefit: Zero (data not in database)

3. ❌ Setting up CORS headers
   - Reason: Build-and-serve workflow keeps everything same-origin
   - Cost: 1 day of configuration
   - Benefit: Zero (until hot-reload needed)

### Why This Philosophy?

**YAGNI Principle**: "You Aren't Gonna Need It"
- Only add features/complexity when actually needed
- Avoid speculative architecture
- Easier to add later than to remove

**Agentic Development**:
- Simpler tasks = easier for AI to complete
- Fewer dependencies = less chance of blocking
- Clear success criteria = easier to validate

## Phase 1 Goals (Weeks 1-2)

1. ✅ React app runs inside WordPress theme
2. ✅ All existing features work identically
3. ✅ Vehicle filtering works from static JS file
4. ✅ Insurance calculations work
5. ✅ NHTSA API integration unchanged
6. ✅ No breaking changes to UX
7. ✅ Foundation for future phases

## Development Workflow (Current)

```
# Edit React code
vim src/components/VehicleCard.jsx

# Build for WordPress
npm run build
# Output: build/ directory with static files

# WordPress serves built files
# Refresh browser: http://localhost:8888/
```

## Key Files to Understand

| File | Purpose | Status |
|------|---------|--------|
| `src/lib/vehicleData.js` | Static vehicle array + filtering | Keep as-is |
| `src/lib/insuranceData.js` | Insurance calculation formula | Keep as-is |
| `src/components/SafetyRatings.jsx` | NHTSA API integration | Unchanged |
| `src/pages/HomePage.jsx` | Main app orchestration | Mostly unchanged |
| `src/components/VehicleGrid.jsx` | Vehicle list display | Mostly unchanged |
| `vite.config.js` | Build configuration | Update for WordPress |
| `tailwind.config.js` | Design system | Keep as-is |

## Data Storage Timeline

| Phase | Data Storage | Notes |
|-------|--------------|-------|
| **Phase 1** | Static JS files | No database needed |
| **Phase 2+** | WordPress database (optional) | Only if customer requests admin management |
| **Future** | CMS integration | Edit vehicles/insurance in WordPress admin |

## Important Distinctions

### What Moves to WordPress
- ✅ Asset serving (CSS, JS bundles)
- ✅ Theme hosting
- ✅ Future content pages (blog, FAQs, etc.)

### What Stays in React
- ✅ All UI components
- ✅ Client-side state management
- ✅ Vehicle filtering logic
- ✅ Insurance calculation
- ✅ NHTSA API integration
- ✅ User interactions

### What Stays Static (For Now)
- ✅ Vehicle data (`vehicleData.js`)
- ✅ Insurance provider logic (`insuranceData.js`)

## Success Metrics

**Phase 1 Complete When**:
1. WordPress theme loads React app correctly
2. All existing features work identically
3. Performance acceptable (<3s to interactive)
4. Zero console errors
5. All tests pass
6. Code deploys successfully

## Migration Path for Future Phases

```
Phase 1: WordPress + React (no database changes)
  ↓
Phase 2: Add WordPress CPT (optional, if needed for content management)
  ↓
Phase 3: REST API (optional, if needed for dynamic data)
  ↓
Phase 4+: Advanced features (auth, user accounts, etc.)
```

Each phase is optional and only added when business justifies the work.

---

**Remember**: The goal of Phase 1 is to get React running in WordPress, not to redesign the data layer. Keep it simple, keep it fast, and get it working first.

**Last Updated**: November 2024
