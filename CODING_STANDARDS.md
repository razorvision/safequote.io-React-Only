# Coding Standards & Quality Guidelines

## 🎯 Overview

This document outlines the coding conventions, best practices, and quality standards for the SafeQuote React application. Following these guidelines ensures consistency, maintainability, and high code quality across the project.

## 🏗️ Architecture Patterns

### Component Structure

**Functional Components with Hooks**
- Use functional components exclusively (no class components)
- Leverage React hooks for state and side effects
- Custom hooks for reusable logic

```jsx
// ✅ Good
function VehicleCard({ vehicle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="vehicle-card">
      {/* Component JSX */}
    </div>
  );
}

// ❌ Avoid
class VehicleCard extends React.Component {
  // Class components
}
```

### File Organization

```
src/
├── pages/              # Route-level components
├── components/         # Feature components
├── components/ui/      # Reusable UI primitives (shadcn/ui pattern)
└── lib/                # Utilities, helpers, data
```

**Rules:**
- One component per file
- Component filename matches component name (PascalCase)
- Utility files use camelCase
- Co-locate related files when appropriate

### Component Design Patterns

**shadcn/ui Pattern** for UI components:
1. Built on Radix UI primitives (accessibility)
2. Styled with Tailwind CSS
3. Variants managed via `class-variance-authority`
4. Class merging with `cn()` utility

```jsx
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

## 🎨 Styling Standards

### Tailwind CSS First

**Always prefer Tailwind utilities over custom CSS:**

```jsx
// ✅ Good
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md">

// ❌ Avoid
<div style={{ display: 'flex', padding: '1.5rem' }}>
<div className="custom-card">  // with separate .css file
```

### CSS Variables for Theme Colors

Use CSS variables defined in `src/index.css`:

```jsx
// ✅ Good
<div className="bg-primary text-primary-foreground">

// ❌ Avoid
<div className="bg-[#1ea7a7]">  // Hard-coded color
```

### Responsive Design

- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on multiple screen sizes

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Class Name Organization

Use `cn()` utility for conditional/merged classes:

```jsx
import { cn } from "@/lib/utils";

<button
  className={cn(
    "base-classes",
    isActive && "active-classes",
    className  // Allow external overrides
  )}
/>
```

## ⚛️ React Best Practices

### State Management

**Local State:**
```jsx
const [count, setCount] = useState(0);
```

**Derived State:**
```jsx
// ✅ Good - Compute on render
const filteredVehicles = vehicles.filter(v => v.rating >= 4);

// ❌ Avoid - Unnecessary state
const [filteredVehicles, setFilteredVehicles] = useState([]);
```

**Side Effects:**
```jsx
useEffect(() => {
  // Fetch data, subscriptions, DOM manipulation
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### Props and PropTypes

**Destructure props in parameter:**
```jsx
// ✅ Good
function Card({ title, description, className }) {
  return <div className={className}>{title}</div>;
}

// ❌ Avoid
function Card(props) {
  return <div>{props.title}</div>;
}
```

**Use default parameters:**
```jsx
function Button({ variant = "default", size = "md", ...props }) {
  // Component logic
}
```

### Event Handlers

```jsx
// ✅ Good naming
const handleSubmit = () => {};
const handleVehicleSelect = (vehicle) => {};

// ✅ Inline for simple cases
<button onClick={() => setIsOpen(false)}>Close</button>

// ✅ Named function for complex logic
const handleFormSubmit = (e) => {
  e.preventDefault();
  // Complex logic here
};
```

### Conditional Rendering

```jsx
// ✅ Good - Simple conditions
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}

// ✅ Good - Multiple branches
{isLoading ? (
  <Spinner />
) : error ? (
  <ErrorMessage error={error} />
) : (
  <Content data={data} />
)}

// ✅ Good - Early returns
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <Content data={data} />;
```

### Lists and Keys

```jsx
// ✅ Good - Stable unique keys
{vehicles.map(vehicle => (
  <VehicleCard key={vehicle.id} vehicle={vehicle} />
))}

// ❌ Avoid - Index as key (unstable)
{vehicles.map((vehicle, index) => (
  <VehicleCard key={index} vehicle={vehicle} />
))}
```

## 📝 Code Conventions

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `VehicleCard`, `SafetyRatings` |
| **Functions/Variables** | camelCase | `handleClick`, `vehicleData` |
| **Constants** | UPPER_SNAKE_CASE | `API_URL`, `MAX_RETRIES` |
| **Files (Components)** | PascalCase.jsx | `VehicleCard.jsx` |
| **Files (Utilities)** | camelCase.js | `vehicleData.js`, `utils.js` |
| **CSS Classes** | kebab-case | `vehicle-card`, `safety-rating` |

### Import Organization

```jsx
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal components/utilities (use @ alias)
import { Button } from '@/components/ui/button';
import { VehicleCard } from '@/components/VehicleCard';
import { cn } from '@/lib/utils';

// 3. Data/constants
import { vehicleData } from '@/lib/vehicleData';

// 4. Types (if using TypeScript)
import type { Vehicle } from '@/types';
```

### Path Aliases

Use the `@` alias for cleaner imports:

```jsx
// ✅ Good
import { Button } from '@/components/ui/button';

// ❌ Avoid
import { Button } from '../../components/ui/button';
```

### Comments

```jsx
// ✅ Good - Explain "why", not "what"
// NHTSA API requires year parameter even though it's optional in docs
const fetchSafetyData = (year) => {
  // Implementation
};

// ❌ Avoid - Obvious comments
// Set loading to true
setLoading(true);
```

### Function Length

- Keep functions focused and concise (< 50 lines ideal)
- Extract complex logic into separate functions
- Use custom hooks for reusable stateful logic

## 🔒 Security Best Practices

### Environment Variables

**Never commit secrets:**
```jsx
// ✅ Good - Use environment variables
const apiKey = import.meta.env.VITE_API_KEY;

// ❌ Avoid - Hard-coded secrets
const apiKey = "sk_live_abc123...";
```

**All .env files in .gitignore:**
- `.env`
- `.env.local`
- `.env.production`

**Use `.env.example` for documentation:**
```env
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
```

### Input Validation

```jsx
// ✅ Good - Validate and sanitize input
const handleSubmit = (formData) => {
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Invalid email');
  }
  // Process data
};
```

### XSS Prevention

```jsx
// ✅ Good - React escapes by default
<div>{userInput}</div>

// ⚠️ Dangerous - Only if absolutely necessary
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

## 🧪 Testing Guidelines

### Component Testing

```jsx
// Use Playwright for E2E tests
// Focus on user interactions and flows
```

### Test Coverage Goals

- Critical user flows: 100%
- UI components: 80%+
- Utility functions: 90%+

## 📦 Dependencies

### Adding New Dependencies

**Before adding a dependency, ask:**
1. Is it necessary? Can we build it ourselves?
2. Is it actively maintained?
3. What's the bundle size impact?
4. Are there security vulnerabilities?

**Installation:**
```bash
npm install package-name
```

**Update `package.json`:**
Document significant additions in README

## ⚡ Performance Best Practices

### Lazy Loading

```jsx
// ✅ Good - Code splitting for routes
const SafetyRatingsPage = lazy(() => import('@/pages/SafetyRatingsPage'));
```

### Memoization

```jsx
// ✅ Good - Memoize expensive calculations
const sortedVehicles = useMemo(
  () => vehicles.sort((a, b) => b.rating - a.rating),
  [vehicles]
);

// ✅ Good - Memoize callbacks passed to children
const handleSelect = useCallback(
  (id) => setSelectedId(id),
  []
);
```

### Image Optimization

- Use appropriate formats (WebP, AVIF)
- Implement lazy loading for images
- Optimize image sizes for different viewports

## 🐛 Error Handling

### Error Boundaries

```jsx
// Implement error boundaries for graceful failures
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### API Error Handling

```jsx
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
  toast.error('Failed to load data. Please try again.');
}
```

## 📋 Code Review Checklist

Before submitting a PR, verify:

- [ ] Code follows naming conventions
- [ ] Components are functional, not class-based
- [ ] Tailwind CSS used (no inline styles or custom CSS)
- [ ] CSS variables used for theme colors
- [ ] Props destructured in function parameters
- [ ] No hard-coded secrets or API keys
- [ ] Imports organized (external → internal → data)
- [ ] Path aliases (`@`) used for imports
- [ ] Functions are focused and concise
- [ ] Comments explain "why", not "what"
- [ ] Responsive design implemented
- [ ] No console.log statements in production code
- [ ] Error handling implemented
- [ ] ESLint warnings resolved
- [ ] Application builds successfully (`npm run build`)
- [ ] Changes tested in development (`npm run dev`)

## 🔄 Commit Standards

Follow conventional commit format:

```
<type>: <subject>

[optional body]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

**Examples:**
```bash
git commit -m "feat: Add vehicle filtering by safety rating"
git commit -m "fix: Resolve infinite loop in useEffect"
git commit -m "docs: Update API integration guide"
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated:** November 2024
**Maintained By:** SafeQuote Development Team
