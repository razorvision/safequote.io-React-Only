# Technical Requirements & Standards

Requirements and standards for all SafeQuote development.

## Development Environment Requirements

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18+ (see `.nvmrc`) | React development |
| npm | Latest | Package management |
| Git | Latest | Version control |
| Local WordPress | Latest via Local by Flywheel | Local development |
| Code Editor | Any (VS Code recommended) | Code editing |

### Optional but Recommended

| Tool | Purpose |
|------|---------|
| VS Code | IDE with excellent React/PHP support |
| ESLint Extension | Real-time linting |
| Prettier Extension | Code formatting |
| REST Client Extension | API testing |
| Docker | Alternative to Local by Flywheel |

## Code Quality Standards

### JavaScript/React Standards

1. **Code Style**
   - Use existing code as reference
   - Follow Tailwind CSS utility-first approach
   - Use Radix UI components for complex UI
   - Functional components with hooks (no class components)
   - Consistent naming: camelCase for variables/functions, PascalCase for components

2. **Linting**
   - ESLint configuration must pass: `npm run lint` (if available)
   - No console.warn or console.error in production code
   - No TODO comments without explanation

3. **Component Structure**
   ```jsx
   // Bad: Mixed concerns
   function Vehicle() {
     const [data, setData] = useState([]);
     // Fetch data
     // Render UI
     // Handle click
     // Calculate price
   }

   // Good: Separated concerns
   function VehicleCard({ vehicle, onSelect }) {
     return <div>...</div>;
   }
   ```

4. **Styling**
   - Use Tailwind CSS utilities first
   - Use `cn()` utility for conditional classes
   - No inline styles unless absolutely necessary
   - Reference CSS variables from `src/index.css`
   - No custom CSS files (use Tailwind)

5. **Performance**
   - Use React.memo for expensive components
   - Use useCallback for event handlers
   - Lazy load routes with React.lazy (if multiple pages)
   - No unnecessary re-renders
   - Keep bundle size in mind

### WordPress/PHP Standards (When Needed)

1. **Code Style**
   - WordPress coding standards
   - Prefix custom functions: `safequote_*`
   - Use snake_case for PHP
   - Security: sanitize, validate, escape

2. **Theme Development**
   - Single Responsibility: One function does one thing
   - DRY: Don't Repeat Yourself
   - Comments for non-obvious code
   - Proper error handling

## Acceptance Criteria Template

Every GitHub issue must have clear acceptance criteria. Use this template:

```markdown
## Acceptance Criteria

- [ ] Specific, testable requirement 1
- [ ] Specific, testable requirement 2
- [ ] Feature works on desktop (1920px width)
- [ ] Feature works on tablet (768px width)
- [ ] Feature works on mobile (375px width)
- [ ] No console errors or warnings
- [ ] Code follows standards in .claude/requirements.md
- [ ] Builds successfully: npm run build
- [ ] WordPress theme loads correctly
- [ ] All existing features still work
- [ ] Performance: [specific metric if applicable]
```

## Testing Requirements

### Manual Testing Checklist (Required for All PRs)

- [ ] Tested on desktop (Chrome, Firefox, Safari if possible)
- [ ] Tested on mobile (mobile device or device emulation)
- [ ] All interactive elements work correctly
- [ ] Keyboard navigation works (Tab key)
- [ ] No console errors or warnings
- [ ] Page loads under 3 seconds
- [ ] Images load correctly
- [ ] Links work and go to correct URLs

### For Component Changes

- [ ] Component renders correctly with default props
- [ ] Component renders correctly with various prop combinations
- [ ] Error states handled gracefully
- [ ] Loading states visible when needed
- [ ] Responsive design works at breakpoints: 375px, 768px, 1920px

### For Data/Logic Changes

- [ ] Test with sample data
- [ ] Test with edge cases (empty, very large, special characters)
- [ ] Test with different filter combinations
- [ ] Verify calculations are correct
- [ ] No performance degradation

## Performance Targets

### Page Load Performance

| Metric | Target | Current |
|--------|--------|---------|
| **First Contentful Paint** | <1.5s | TBD |
| **Time to Interactive** | <3s | TBD |
| **Lighthouse Score** | >85 | TBD |
| **JavaScript Bundle Size** | <200KB (gzipped) | ~150KB |
| **CSS Bundle Size** | <50KB (gzipped) | ~25KB |

### Runtime Performance

| Metric | Target |
|--------|--------|
| **Component Re-render** | <16ms (60fps) |
| **List Filtering** | <100ms for 100 items |
| **API Response** | <500ms (NHTSA) |
| **Memory Usage** | <50MB (typical) |

## Browser Support

### Minimum Supported Versions

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Latest 2 versions |
| Firefox | 88+ | Latest 2 versions |
| Safari | 14+ | Latest 2 versions |
| Edge | 90+ | Latest 2 versions |
| Mobile Safari (iOS) | 14+ | iPad & iPhone |
| Chrome Mobile | 90+ | Android devices |

## Responsive Design Breakpoints

Use Tailwind CSS breakpoints:

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

**Required Testing**:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px and up

## Accessibility Standards

All features must meet WCAG 2.1 Level AA:

- [ ] Semantic HTML (use proper tags: `<button>`, `<nav>`, `<main>`)
- [ ] Images have alt text
- [ ] Links have descriptive text (not "Click here")
- [ ] Form inputs have labels
- [ ] Color not sole indicator (use icons/text too)
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] No flashing content (>3 times/sec)
- [ ] Motion can be disabled (prefers-reduced-motion)

**Tools**:
- axe DevTools browser extension
- Lighthouse (built into Chrome)
- Wave browser extension

## Code Review Checklist

Before submitting PR, verify:

- [ ] **Functionality**
  - [ ] Feature works as described
  - [ ] All acceptance criteria met
  - [ ] No breaking changes to existing features
  - [ ] Edge cases handled

- [ ] **Code Quality**
  - [ ] Follows style standards
  - [ ] No console errors/warnings
  - [ ] No dead code or comments
  - [ ] Functions are focused and testable
  - [ ] Variable names are descriptive

- [ ] **Performance**
  - [ ] No unnecessary re-renders
  - [ ] Bundle size reasonable
  - [ ] API calls optimized
  - [ ] Images optimized

- [ ] **Accessibility**
  - [ ] Keyboard navigable
  - [ ] Alt text on images
  - [ ] Proper color contrast
  - [ ] ARIA labels where needed

- [ ] **Testing**
  - [ ] Tested on multiple devices/browsers
  - [ ] Tested with sample data
  - [ ] Edge cases verified
  - [ ] Performance verified

- [ ] **Documentation**
  - [ ] Comments added for complex logic
  - [ ] Function purposes clear
  - [ ] README updated if needed
  - [ ] .claude/ files updated if relevant

## Commit Message Standards

Format: `[TYPE] Brief description (50 chars max)`

```
Types:
- feat: New feature
- fix: Bug fix
- refactor: Code reorganization
- perf: Performance improvement
- docs: Documentation
- test: Test-related
- chore: Dependencies, config, build

Examples:
- feat: Add vehicle search filters
- fix: Correct insurance price calculation
- refactor: Extract filtering logic into utility
- perf: Optimize vehicle list rendering
- docs: Update README with setup instructions
```

## PR Description Template

```markdown
## Description
Brief explanation of changes.

## Why
Why this change was needed.

## Changes
- Change 1
- Change 2
- Change 3

## Testing
How to test this change.

## Checklist
- [ ] Code follows standards (.claude/requirements.md)
- [ ] No console errors/warnings
- [ ] Tested on desktop and mobile
- [ ] All acceptance criteria met
- [ ] No breaking changes
- [ ] Documentation updated if needed

## References
- Closes #[issue number]
- Related to #[issue number] (if any)
```

## Deployment Checklist

Before deploying to production:

- [ ] All features tested locally
- [ ] Build successful: `npm run build`
- [ ] No errors in console
- [ ] Performance targets met
- [ ] Security review completed
- [ ] Accessibility verified
- [ ] Documentation updated
- [ ] Backup existing data
- [ ] Deploy during low-traffic window
- [ ] Monitor for errors post-deployment

## Security Requirements

### Code Security

- [ ] No hardcoded passwords or secrets
- [ ] No direct SQL queries (use WordPress APIs)
- [ ] Sanitize user input
- [ ] Escape output (especially in PHP)
- [ ] Use HTTPS only
- [ ] CORS headers restricted to known origins
- [ ] API keys in environment variables (.env files)
- [ ] No sensitive data in localStorage/sessionStorage

### WordPress Security

- [ ] Use nonces for form submissions
- [ ] Validate user capabilities (is_user_logged_in, current_user_can)
- [ ] Keep WordPress core updated
- [ ] Keep plugins updated
- [ ] Use security plugins (WP Engine, Wordfence)
- [ ] Regular security audits

### Data Privacy

- [ ] GDPR compliant (if EU users)
- [ ] Privacy policy linked
- [ ] No unnecessary data collection
- [ ] User data protected

## Error Handling

All features must handle errors gracefully:

```jsx
// Good: User-friendly error
try {
  const data = await fetchData();
  setVehicles(data);
} catch (error) {
  console.error('Failed to load vehicles:', error);
  setError('Unable to load vehicles. Please try again.');
  setVehicles([]);
}

// Bad: Silent failure
try {
  const data = await fetchData();
  setVehicles(data);
} catch (error) {
  // ignored
}
```

## Documentation Requirements

1. **Code Comments**
   - Complex logic: explain WHY, not WHAT
   - Non-obvious implementations
   - TODO items with context

2. **README Updates**
   - New features documented
   - Setup/installation updated if needed
   - Configuration changes noted

3. **Issue References**
   - Mention related issues
   - Reference .claude/ files when applicable
   - Link to related documentation

## Dependency Management

- [ ] No unnecessary dependencies
- [ ] Security vulnerabilities checked: `npm audit`
- [ ] Dependencies kept up-to-date
- [ ] Major version upgrades tested thoroughly
- [ ] Avoid deprecated packages

---

**Last Updated**: November 2024
**Standards Version**: 1.0
