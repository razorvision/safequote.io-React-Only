# Changelog

All notable changes to SafeQuote.io React application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Insurance quote CTA after safety ratings display ([#28](https://github.com/razorvision/safequote.io-React-Only/pull/28))
  - Gradient blue-to-green background for visual prominence
  - Personalized heading with vehicle year/make/model
  - Links to insurance comparison flow
  - Trust indicators (free quotes, no obligation)

## [0.3.0] - 2025-11-15

### Added
- Enhanced SafetyRatings component with comprehensive NHTSA data display ([#27](https://github.com/razorvision/safequote.io-React-Only/pull/27))
  - Intelligent model variant matching for vehicles with multiple configurations
  - Clickable vehicle titles linking to NHTSA pages
  - Enhanced visual design with improved typography and spacing
  - Comprehensive error messaging with IIHS.org fallback
  - Display of detailed crash ratings, rollover details, and safety features

### Fixed
- Data transfer issue where vehicles like 2019 Ford F-150 weren't returning safety ratings ([#16](https://github.com/razorvision/safequote.io-React-Only/issues/16))
  - Root cause: NHTSA vPIC API returns simplified model names ("F-150") but Safety Ratings API requires specific variants ("F-150 SUPER CREW")
  - Implemented two-stage matching process to find and query correct variants

- Model selection no longer resets when changing years if model exists in new year

## [0.2.0] - 2025-11-15

### Added
- Dropdown functionality for vehicle safety ratings ([#26](https://github.com/razorvision/safequote.io-React-Only/pull/26))
  - Year/Make/Model dropdown selectors
  - NHTSA API integration for dynamic vehicle data
  - Popular makes curated list for better UX

- Hero image featuring parent and teenager ([#26](https://github.com/razorvision/safequote.io-React-Only/pull/26))
  - Updated cover image to better represent target audience

### Changed
- Replaced text inputs with dropdown selectors for vehicle search ([#18](https://github.com/razorvision/safequote.io-React-Only/pull/18), [#17](https://github.com/razorvision/safequote.io-React-Only/pull/17))

## [0.1.0] - 2025-11-14

### Added
- Testing infrastructure setup ([#23](https://github.com/razorvision/safequote.io-React-Only/pull/23))
  - Vitest configuration
  - React Testing Library integration
  - Test scripts and configuration

- Core logic unit tests ([#24](https://github.com/razorvision/safequote.io-React-Only/pull/24))
  - Insurance calculation tests
  - Data formatting tests
  - Utility function tests

- React component tests ([#25](https://github.com/razorvision/safequote.io-React-Only/pull/25))
  - Component rendering tests
  - User interaction tests
  - Integration tests

- Database of common vehicle makes and models ([#5](https://github.com/razorvision/safequote.io-React-Only/issues/5))
  - Popular manufacturers list
  - Model data structure

### Changed
- Updated hero cover image ([#15](https://github.com/razorvision/safequote.io-React-Only/pull/15))

---

## Version History

### Phase 1: Initial Build (In Progress)
Target completion: December 31, 2025

**Completed Features:**
- ✅ Safety Rating Lookup (#16)
- ✅ Insurance Quote CTA (#6)
- ✅ Vehicle Safety Rating Dropdowns (#18, #17)
- ✅ Testing Infrastructure (#20, #21, #22)
- ✅ Hero Image Update (#4)
- ✅ Vehicle Database (#5)

**In Progress:**
- 🔨 Save Searched Vehicles to Dashboard (#7)
- 🔨 Vehicle Comparison Feature (#8)

**Planned:**
- 📋 Connect to Insurify Affiliate (#9)
- 📋 Driver's Ed Page (#10)
- 📋 Email Capture for Non-Signup Users (#11)
- 📋 Add IIHS Ratings (#12)

### Phase 2: Add Revenue
Target start: January 2026

### Phase 3: Scale
Target start: April 2026

---

## Migration Notes

This React application is the development version of SafeQuote.io. A parallel WordPress migration project exists in the parent repository for traditional CMS deployment.

---

## Links

- [Project Board](https://github.com/razorvision/safequote.io-React-Only/projects/16)
- [Milestones](https://github.com/razorvision/safequote.io-React-Only/milestones)
- [Issues](https://github.com/razorvision/safequote.io-React-Only/issues)
- [Pull Requests](https://github.com/razorvision/safequote.io-React-Only/pulls)
