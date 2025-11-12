# SafeQuote

A modern web application that helps parents find safe vehicles for their teens, compare insurance quotes, and discover driver's education resources. Built with real NHTSA safety ratings integration.

## 🎯 Project Description

SafeQuote provides an intuitive platform for families to:

- **Find Safe Vehicles** - Search and filter vehicles with real NHTSA crash test ratings
- **Compare Insurance** - Get quotes from major insurance providers based on vehicle safety
- **Discover Driver's Education** - Find local and online driver's ed programs
- **Access Real Safety Data** - View detailed crash test results, safety features, and vehicle ratings

The application combines mock vehicle/insurance data with real government safety ratings to provide comprehensive vehicle safety information for making informed purchasing decisions.

## 🛠 Tech Stack

### Frontend Framework
- **React 18.2.0** - Modern UI library with hooks and concurrent features
- **React Router DOM 6.16.0** - Client-side routing

### Build Tool
- **Vite 4.4.5** - Fast, modern build tool and development server
- **@vitejs/plugin-react 4.0.3** - React Fast Refresh support

### Styling & UI
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Radix UI** - Accessible, headless UI primitives (Alert Dialog, Avatar, Checkbox, Dialog, Select, Slider, Tabs, Toast)
- **Framer Motion 10.16.4** - Advanced animations and transitions
- **Lucide React 0.285.0** - Icon library
- **class-variance-authority 0.7.0** - Type-safe component variants
- **PostCSS 8.4.31 + Autoprefixer** - CSS processing

### Development Tools
- **ESLint 8.57.1** - Code linting
- **Babel Suite** - JavaScript code transformation
- **Terser 5.39.0** - JavaScript minification

### External Integrations
- **NHTSA API** - Real National Highway Traffic Safety Administration safety ratings

## 📦 Installation

### Prerequisites
- **Node.js**: Specified in `.nvmrc` (check version requirements)
- **npm**: Included with Node.js

### Setup Steps

1. **Clone or download the repository**
   ```bash
   cd safequote
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000` (IPv6 enabled)

## 🚀 Development Commands

### Development Server
```bash
npm run dev
```
Starts the Vite development server with hot module replacement. Great for rapid development and testing.

### Build for Production
```bash
npm run build
```
- Runs the `generate-llms.js` build script
- Bundles and minifies the application
- Output goes to the `dist/` directory
- Optimized for production deployment

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally on port 3000 for testing before deployment.

## 📁 Project Structure

```
safequote/
│
├── index.html                          # Application entry point
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS theme & customization
├── postcss.config.js                   # PostCSS configuration
├── .eslintrc.cjs                       # ESLint rules
├── .gitignore                          # Git exclusions
├── .nvmrc                              # Node version specification
├── .version                            # Version tracking
│
├── plugins/                            # Custom Vite plugins
│   ├── vite-plugin-iframe-route-restoration.js
│   └── visual-editor/                  # Visual editing plugins
│       ├── vite-plugin-edit-mode.js
│       ├── vite-plugin-react-inline-editor.js
│       ├── edit-mode-script.js
│       └── visual-editor-config.js
│
├── tools/
│   └── generate-llms.js               # Build-time utility script
│
└── src/                                # Application source code
    ├── main.jsx                        # React entry point
    ├── App.jsx                         # Root component with routing
    ├── index.css                       # Global styles & CSS variables
    │
    ├── pages/                          # Route components
    │   ├── HomePage.jsx                # Main landing page with flow-based UI
    │   └── SafetyRatingsPage.jsx      # Dedicated safety ratings page
    │
    ├── components/                     # Feature components
    │   ├── Header.jsx                  # Navigation header
    │   ├── Hero.jsx                    # Hero section
    │   ├── Features.jsx                # Feature selection cards
    │   ├── SafetyRatings.jsx          # NHTSA API integration
    │   ├── SearchFilters.jsx          # Vehicle filtering UI
    │   ├── VehicleGrid.jsx            # Vehicle listing
    │   ├── VehicleCard.jsx            # Individual vehicle card
    │   ├── TopSafetyPicks.jsx         # Featured safe vehicles
    │   ├── InsuranceComparison.jsx    # Insurance quote comparison
    │   ├── DriversEd.jsx              # Driver's education finder
    │   ├── LoginModal.jsx             # Authentication modal
    │   ├── FlowSelector.jsx           # Flow selection UI
    │   ├── WelcomeMessage.jsx         # Welcome greeting
    │   ├── CallToAction.jsx           # CTA component
    │   ├── HeroImage.jsx              # Hero image component
    │   │
    │   └── ui/                        # Reusable UI primitives (shadcn/ui pattern)
    │       ├── button.jsx             # Button component
    │       ├── badge.jsx              # Badge component
    │       ├── dialog.jsx             # Modal/Dialog component
    │       ├── input.jsx              # Text input component
    │       ├── label.jsx              # Form label component
    │       ├── select.jsx             # Dropdown select component
    │       ├── slider.jsx             # Range slider component
    │       ├── toast.jsx              # Toast notification
    │       ├── toaster.jsx            # Toast container
    │       └── use-toast.js           # Toast hook
    │
    └── lib/                           # Utilities and data
        ├── utils.js                   # Helper functions (cn() for class merging)
        ├── vehicleData.js             # Mock vehicle database (10 vehicles)
        └── insuranceData.js           # Mock insurance quote generator
```

### Key Directories Explained

- **`src/components/`** - Reusable React components organized by feature
- **`src/components/ui/`** - Base UI primitives following shadcn/ui pattern
- **`src/lib/`** - Utility functions and mock data
- **`src/pages/`** - Route components (each page is a route)
- **`plugins/`** - Custom Vite plugins for development enhancements
- **`tools/`** - Build-time utility scripts

## 📚 Key Dependencies

### Runtime Dependencies

#### Core React
- `react@18.2.0` - UI library
- `react-dom@18.2.0` - React DOM rendering
- `react-router-dom@6.16.0` - Client-side routing
- `react-helmet@6.1.0` - Document head management

#### UI Components & Styling
- `@radix-ui/*` - Accessible UI primitives (dialog, select, slider, tabs, etc.)
- `tailwindcss@3.3.3` - Utility-first CSS framework
- `tailwindcss-animate@1.0.7` - Animation utilities
- `framer-motion@10.16.4` - Advanced animations
- `lucide-react@0.285.0` - Icon library
- `class-variance-authority@0.7.0` - Type-safe component variants
- `tailwind-merge` - Intelligent Tailwind class merging
- `clsx` - Conditional class names

#### CSS Processing
- `postcss@8.4.31` - CSS processor
- `autoprefixer@10.4.16` - Browser prefix automation

### Development Dependencies
- `@vitejs/plugin-react@4.0.3` - Vite React plugin
- `vite@4.4.5` - Build tool
- `eslint@8.57.1` - Code linter
- `eslint-config-react-app` - React linting rules
- `terser@5.39.0` - JavaScript minifier
- `@babel/*` - Babel transformation suite

See `package.json` for complete dependency list and versions.

## ⚙️ Configuration Overview

### `vite.config.js` (266 lines)
Configures the Vite build tool with:
- Custom Vite plugins for visual editing and iframe support
- Error handling setup (Vite errors, runtime errors, console errors)
- Path alias: `@` → `./src`
- CORS enabled with credentialless COEP headers
- HTML transformation for error overlays
- External Babel dependencies in rollup configuration
- Custom logger to suppress CSS syntax errors

### `tailwind.config.js` (76 lines)
Tailwind CSS configuration featuring:
- **Dark mode**: Class-based (`darkMode: ["class"]`)
- **Content paths**: Configures JIT compilation for `pages/**`, `components/**`, `src/**`
- **Extended theme**:
  - Colors mapped to CSS variables (HSL format)
  - Container: centered with 2rem padding, max-width 1400px
  - Custom animations: `accordion-down`, `accordion-up`
  - Border radius mapped to `--radius` CSS variable
- **Plugins**: `tailwindcss-animate` for animation utilities

### `postcss.config.js`
Minimal setup with:
- `tailwindcss` - CSS framework processing
- `autoprefixer` - Vendor prefix support

### `src/index.css`
Global styles defining the design system:

**CSS Variables (HSL-based theme):**
```css
--primary: 195 90% 40%          /* Teal */
--secondary: 35 85% 90%         /* Warm Sand */
--background: 0 0% 100%         /* White */
--foreground: 224 71.4% 4.1%    /* Dark Text */
--destructive: 0 84.2% 60.2%    /* Red */
--muted: 210 20% 94%            /* Light Gray */
--accent: 210 20% 94%           /* Light Gray */
--radius: 0.75rem               /* 12px Border Radius */
```

**Body styling**: Gradient background from white through secondary color, uses Inter font with system fallbacks.

### `package.json`
Project metadata and npm scripts:
- **Type**: `"module"` (ES modules enabled)
- **Scripts**: `dev`, `build`, `preview` commands
- **Dependencies**: All React, UI, and styling libraries

## 🎨 Design System

### Component Architecture (shadcn/ui Pattern)
Components are built using:
1. **Radix UI** - Unstyled, accessible primitives
2. **Tailwind CSS** - Utility-first styling
3. **class-variance-authority** - Type-safe variants
4. **`cn()` utility** - Intelligent class merging

Example pattern from `src/components/ui/button.jsx`:
```jsx
const buttonVariants = cva(
  'base-classes-here',
  {
    variants: {
      variant: { primary: '...', outline: '...' },
      size: { sm: '...', md: '...', lg: '...' }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);
```

### Color System
HSL-based CSS variables enable:
- Dynamic theming
- Consistent brand colors
- Easy dark mode implementation
- Accessible color contrasts

### Routes
1. **`/`** - Home page with flow-based navigation system
2. **`/safequote-safety-ratings`** - Dedicated safety ratings page

### Flow System (Query Parameters)
The homepage uses a flow-based UI system via query parameters:

- **`?flow=findCar`** - Vehicle search with filters and grid
- **`?flow=getInsurance`** - Insurance comparison interface
- **`?flow=driversEd`** - Driver's education finder

## 📋 Contributing Guidelines

### Code Style & Conventions

#### Component Format
- Use functional components with React hooks
- Follow the shadcn/ui pattern for UI components
- Export components as default or named exports

#### Naming Conventions
- **Components**: PascalCase (e.g., `VehicleCard.jsx`, `SafetyRatings.jsx`)
- **Utilities/Hooks**: camelCase (e.g., `use-toast.js`, `vehicleData.js`)
- **CSS Classes**: Use Tailwind utilities, avoid custom CSS when possible

#### Styling Guidelines
- **Use Tailwind CSS** for all styling
- **Avoid inline styles** - use Tailwind utilities
- **Use CSS variables** defined in `src/index.css` for theme colors
- **Component variants** - Use `class-variance-authority` for variant styling
- **Class merging** - Use `cn()` utility to safely merge Tailwind classes

Example:
```jsx
import { cn } from '@/lib/utils';

export function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn('px-4 py-2 rounded-md font-medium', className)}
      {...props}
    />
  );
}
```

#### Component Structure
```jsx
// Imports
import React from 'react';
import { useRouter } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Main component
export default function ComponentName() {
  // State and hooks
  const [state, setState] = React.useState();

  // Handlers
  const handleEvent = () => {};

  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### File Organization

1. **Keep components focused** - One component per file
2. **Co-locate related logic** - Put hooks and utilities near where they're used
3. **Use barrel exports** - For component groups, use `index.js` files
4. **Follow directory structure** - Keep similar components in the same folder

### Git Workflow

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make commits with clear messages**:
   ```
   git commit -m "Add vehicle filtering UI component"
   ```
3. **Test before pushing**:
   ```bash
   npm run build  # Verify production build works
   npm run dev    # Test in development
   ```
4. **Push and create a pull request**

### Before Committing

Ensure:
1. ✅ Code follows the style guidelines above
2. ✅ No ESLint warnings: `npm run lint` (if configured)
3. ✅ Application builds: `npm run build`
4. ✅ Dev server runs: `npm run dev`
5. ✅ No console errors or warnings
6. ✅ Components are responsive and work on mobile

### Testing Changes Locally

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Dependencies

1. Only add dependencies when necessary
2. Use `npm install package-name`
3. Update `package.json` and commit the lock file
4. Document the purpose in this README if significant

### Creating New Components

1. **UI Components**: Add to `src/components/ui/` following shadcn/ui pattern
2. **Feature Components**: Add to `src/components/` organized by feature
3. **Pages**: Add to `src/pages/` for route-based pages

Example component structure:
```
src/components/
├── VehicleCard.jsx      # Component file
├── VehicleCard.test.js  # Tests (if applicable)
└── VehicleCard.css      # Component-specific styles (use Tailwind instead)
```

### API Integration

The application integrates with the real NHTSA API:
- **Endpoint**: `https://api.nhtsa.gov/SafetyRatings/`
- **Used in**: `src/components/SafetyRatings.jsx`
- **Pattern**: Two-step API calls (basic ratings → detailed ratings)

Mock data is stored in `src/lib/`:
- `vehicleData.js` - Vehicle database and filtering logic
- `insuranceData.js` - Insurance quote generation

## 🐛 Troubleshooting

### Development Server Won't Start
- Clear `node_modules/` and reinstall: `rm -rf node_modules && npm install`
- Check Node version matches `.nvmrc`: `nvm use`
- Ensure port 3000 is not in use

### Build Fails
- Check for ESLint errors: `npm run lint` (if configured)
- Verify all imports are correct and files exist
- Clear Vite cache: `rm -rf dist` and rebuild

### Styling Issues
- Ensure Tailwind content paths in `tailwind.config.js` cover all component files
- Clear browser cache: Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Verify CSS variable names in `src/index.css`

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [React Router](https://reactrouter.com)
- [NHTSA Safety Ratings API](https://one.nhtsa.gov/webapi/api)

## 📄 License

[Add license information here]

---

**Last Updated**: November 2024
**Node Version**: See `.nvmrc`
**Package Manager**: npm
