# General Instructions for Claude & Agents

Instructions for all Claude interactions and AI agents working on SafeQuote.

## Before Starting Any Task

1. **Read relevant .claude/ files**:
   - README.md (orientation)
   - premises.md (project context)
   - requirements.md (standards)
   - agentic-workflow.md (task structure)
   - decisions.md (why certain choices were made)

2. **Read the GitHub issue completely**
   - Understand acceptance criteria
   - Note file locations
   - Check implementation notes

3. **Know the codebase structure**:
   ```
   src/
   ├── components/       (React components)
   ├── pages/           (Page components)
   ├── lib/             (Utilities & data)
   ├── App.jsx          (Router)
   └── main.jsx         (Entry point)
   ```

4. **Understand current data flow**:
   - Vehicles: Static JS array in `src/lib/vehicleData.js`
   - Insurance: Calculated from formula in `src/lib/insuranceData.js`
   - NHTSA API: Direct calls from `SafetyRatings.jsx`

## Code Quality Principles

### 1. Don't Over-Engineer

**Bad**: Add features that might be needed later
```jsx
// Over-engineered for single use case
function calculatePrice(vehicle, timestamp, region, currency) {
  // 50 lines of complex logic
}
```

**Good**: Simple, solves the problem
```jsx
function calculatePrice(vehicle) {
  return vehicle.condition === 'New' ? 180 : 150;
}
```

**Principle**: Build for today's needs, extend tomorrow.

### 2. Follow Existing Patterns

Look at existing code and follow the same style:

**Vehicle structure**:
```javascript
{
  id: 1,
  make: 'Honda',
  model: 'Civic',
  // ... more fields
}
```

**Component structure**:
```jsx
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState();

  const handleEvent = () => { ... };

  return <div>...</div>;
};

export default ComponentName;
```

**Styling pattern**:
```jsx
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  'other-utilities'
)}>
  Content
</div>
```

### 3. Keep Components Focused

**Bad**: Component does multiple things
```jsx
function HomePage() {
  // Renders hero, filters, vehicle list, insurance, driver's ed
  // 500 lines of code
}
```

**Good**: Components do one thing
```jsx
function HomePage() {
  return <>
    <Hero />
    <Features />
    <SearchArea />
  </>;
}
```

**Principle**: Single Responsibility - one component, one purpose.

### 4. Meaningful Variable Names

**Bad**: Unclear names
```jsx
const v = getV(f);
const c = v.map(x => <VCard k={x.i} d={x} />);
```

**Good**: Descriptive names
```jsx
const vehicles = getVehicles(filters);
const vehicleCards = vehicles.map(vehicle => (
  <VehicleCard key={vehicle.id} data={vehicle} />
));
```

**Principle**: Code is read 10x more than it's written. Make it clear.

### 5. Comments Explain WHY, Not WHAT

**Bad**: Obvious comment
```jsx
// Set vehicles to filtered array
const vehicles = getVehicles(filters);

// Loop through vehicles
vehicles.map(v => ...)
```

**Good**: Explains reasoning
```jsx
// Filter vehicles before rendering to avoid showing unsafe options
const vehicles = getVehicles(filters);

// Map vehicles to card components for consistent UI
vehicles.map(v => ...)
```

**Principle**: Comments should answer "why did you do this?"

### 6. Error Handling

Always handle errors gracefully:

**Bad**: Ignores errors
```javascript
try {
  const data = fetch('/api/vehicles').then(r => r.json());
  setVehicles(data);
} catch (err) {
  // Silently fail
}
```

**Good**: Shows user error
```javascript
try {
  const data = await fetch('/api/vehicles').then(r => r.json());
  setVehicles(data);
} catch (err) {
  console.error('Failed to load vehicles:', err);
  setError('Unable to load vehicles. Please refresh the page.');
}
```

**Principle**: Users should know when something went wrong.

### 7. Performance First

**Bad**: Recalculates on every render
```jsx
function VehicleList({ vehicles }) {
  const filtered = vehicles.filter(v => v.price < 50000);
  return ...;
}
// Filters on every render, even if vehicles didn't change
```

**Good**: Memoize expensive calculations
```jsx
const filtered = useMemo(
  () => vehicles.filter(v => v.price < 50000),
  [vehicles]
);
```

**Principle**: Don't recalculate unless inputs change.

## Common Patterns in This Codebase

### Rendering Conditional Content

**Current pattern**:
```jsx
{flow === 'findCar' && <VehicleGrid />}
{flow === 'getInsurance' && <InsuranceComparison />}
{flow === 'driversEd' && <DriversEd />}
```

**Use this pattern** for consistency.

### Filtering Data

**Current pattern**:
```jsx
const vehicles = getVehicles(filters);
// Returns new array, doesn't mutate original
```

**Use filter functions** instead of inline filtering.

### Styling with Tailwind

**Current pattern**:
```jsx
<button className={cn(
  'px-4 py-2 rounded-lg',
  'bg-primary text-white',
  'hover:bg-primary-dark',
  'transition-colors'
)}>
  Button
</button>
```

**Use cn() for** conditional classes.

## Debugging Tips

### 1. Check the Console

Always check browser console (`F12` → Console tab):
- Red errors = critical issues
- Yellow warnings = fix if possible
- Blue logs = debug info

### 2. Use React DevTools

Install: [React DevTools Extension](https://react-devtools-tutorial.vercel.app/)

Check:
- Component tree
- Props of components
- State values
- Re-renders

### 3. Network Tab

Check network requests (`F12` → Network tab):
- API calls (check status code)
- Failed requests (4xx, 5xx)
- Response time
- Payload size

### 4. Add Console Logs

For debugging:
```javascript
console.log('vehicles:', vehicles);
console.error('Error fetching:', error);
console.warn('Performance issue:', duration + 'ms');
```

Remove debug logs before committing!

## Testing Checklist

Before submitting PR, test:

- [ ] **Desktop (Desktop Browsers)**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (if possible)

- [ ] **Mobile (Mobile Browsers)**
  - [ ] iOS Safari (iPhone sim or device)
  - [ ] Chrome Android (Android sim or device)

- [ ] **Responsive Design**
  - [ ] 375px width (mobile)
  - [ ] 768px width (tablet)
  - [ ] 1024px+ width (desktop)

- [ ] **Features**
  - [ ] Search/filter functionality works
  - [ ] Insurance comparison displays correctly
  - [ ] NHTSA API integration works
  - [ ] Animations smooth
  - [ ] Links functional

- [ ] **Console**
  - [ ] No red errors
  - [ ] No yellow warnings
  - [ ] No debug logs left

- [ ] **Performance**
  - [ ] Page loads in <3 seconds
  - [ ] No jank when scrolling
  - [ ] No slow component renders

## Git Workflow

### Commit Messages

Format: `[TYPE] Description`

```bash
git commit -m "feat: Add vehicle search filters"
git commit -m "fix: Correct insurance price calculation"
git commit -m "refactor: Extract filtering logic to utility"
```

### Branch Names

Format: `feature/what-you-did`

```bash
git checkout -b feature/add-vehicle-filters
git checkout -b feature/fix-insurance-calculation
```

### Pull Requests

Always create PRs, even for small changes:
1. Push branch to GitHub
2. Open PR with description
3. Reference the issue: "Closes #XX"
4. Link to .claude/ files if relevant

## File Editing Guidelines

### JavaScript/React Files

**Format**: 2 spaces indentation
**Naming**: camelCase for variables, PascalCase for components
**Imports**: Organize imports (React, external, internal)

```jsx
import React, { useState } from 'react';  // React imports first
import { useLocation } from 'react-router-dom';  // External libs
import { Button } from '@/components/ui/button';  // Internal imports
import { getVehicles } from '@/lib/vehicleData';  // Utilities

export default ComponentName { ... }
```

### CSS/Tailwind

**Use**: Tailwind utilities (not custom CSS)
**Pattern**: Utility classes in className prop
**Responsive**: Use sm:, md:, lg: prefixes

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### PHP Files (WordPress)

**Format**: 2 spaces, WordPress coding standards
**Naming**: snake_case, prefix functions: `safequote_*`
**Security**: Always sanitize/escape

```php
function safequote_enqueue_scripts() {
  // Function body
}
add_action('wp_enqueue_scripts', 'safequote_enqueue_scripts');
```

## When to Ask for Help

Ask in the GitHub issue if:
- Specification is unclear
- You're not sure about implementation approach
- Task seems larger than estimated
- You've hit a genuine blocker
- You need clarification on .claude/ files

Don't guess! Clarification questions are always better than wrong implementations.

## After You're Done

1. **Self-review**:
   - [ ] Does it solve the issue?
   - [ ] Do all tests pass?
   - [ ] Is code quality good?
   - [ ] No console errors?

2. **Create PR**:
   - [ ] Use PR template
   - [ ] Reference issue
   - [ ] Link to .claude/ files used
   - [ ] List testing done

3. **Await Review**:
   - [ ] Respond to feedback
   - [ ] Make requested changes
   - [ ] Re-test after changes

4. **After Merge**:
   - [ ] Update .claude/ files if you learned something new
   - [ ] Add Q&A to decisions.md if relevant

## Key Reminders

> 💡 **Simple over complex** - Build for today, extend tomorrow
>
> 📖 **Read the docs** - .claude/ files have answers
>
> 🧪 **Test thoroughly** - Desktop, mobile, edge cases
>
> 💬 **Ask questions** - Clarification is free, mistakes are expensive
>
> 🔄 **Follow patterns** - Consistency makes code readable
>
> 🎯 **Focus on the task** - Don't add extra features
>
> ✅ **Verify completion** - Check all acceptance criteria

---

**Last Updated**: November 2024
**Version**: 1.0
