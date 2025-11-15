# Agentic Workflow & Task Structure

Guidelines for structuring issues and pull requests for AI agent automation.

## Philosophy

SafeQuote is designed to be worked on by AI agents. Each issue should be:

1. **Independent**: Completable without waiting for other tasks
2. **Atomic**: Focused on one specific goal
3. **Testable**: Clear acceptance criteria that can be verified
4. **Scoped**: 2-6 hours of work, not days
5. **Clear**: No ambiguity in requirements

## Issue Structure Template

Use this template for ALL GitHub issues intended for agent work:

```markdown
# [PHASE X] Brief Task Description

## Task Description
What needs to be done. 2-3 sentences max.

## Why This Matters
Why this task is important to the project.

## Acceptance Criteria

- [ ] Specific, testable requirement 1
- [ ] Specific, testable requirement 2
- [ ] All code follows .claude/requirements.md
- [ ] No console errors or warnings
- [ ] Tested on desktop and mobile
- [ ] Builds successfully: npm run build (if JS)

## Implementation Notes

### What to do:
- Step 1
- Step 2
- Step 3

### What NOT to do:
- Don't add this
- Don't modify that
- Don't use this library

## File Locations
- Main file: `src/components/Something.jsx`
- Related: `src/lib/utilities.js`
- Config: `vite.config.js`

## References
- Related to: #[issue number]
- Related to: #[issue number]
- See: .claude/premises.md for project context
- See: .claude/requirements.md for code standards

## Testing Instructions
How to manually test this when complete:
1. Step 1
2. Step 2
3. Verify X happens

## Estimation
**Time**: 2-4 hours
**Complexity**: Medium
**Blockers**: None
```

## Good Issue vs Bad Issue

### ❌ BAD ISSUE (Too Vague)

```markdown
# Update the vehicle filtering

Make the vehicle filtering better. We need it to work with WordPress.
```

**Problems**:
- No clear acceptance criteria
- "Better" is subjective
- No implementation guidance
- Too broad to test
- Agent doesn't know where to start

---

### ✅ GOOD ISSUE (Clear & Specific)

```markdown
# [PHASE 2] Update VehicleGrid to fetch from WordPress API

## Task Description
Modify VehicleGrid component to fetch vehicle data from WordPress
REST API instead of local vehicleData.js file.

## Acceptance Criteria
- [ ] Component fetches from /wp-json/wp/v2/vehicles
- [ ] Filters still work correctly (condition, type, price, safety)
- [ ] Loading state displays while fetching
- [ ] Error message shown if request fails
- [ ] Component falls back to mock data if API unavailable (Phase 1 safety net)
- [ ] No console errors
- [ ] Performance: Page interactive within 3 seconds
- [ ] Builds successfully without warnings

## Implementation Notes
### File to modify:
- `src/components/VehicleGrid.jsx`

### Functions to use:
- Create or update `src/services/api.js` with `fetchVehicles(filters)`
- Implement error boundary or try/catch
- Use React.useState for loading state

### Don't do:
- Don't modify vehicle filtering logic (keep in lib/vehicleData.js for now)
- Don't change component props or parent component
- Don't add new UI elements
- Don't use new dependencies without approval

## Testing
1. Open WordPress admin
2. Create 1-2 test vehicles in database
3. Start dev server: npm run dev
4. Visit http://localhost:5173
5. Verify:
   - Vehicles load (initially slow, then fast on page 2)
   - Filters work: try condition=New, max_price=25000, etc.
   - Error message shows if API is down
   - Page loads under 3 seconds

## Phase Context
- Phase: 2 (React API Integration)
- Depends on: #[Phase 1 tasks complete]
- Blocks: #[insurance comparison task]
- Related: .claude/premises.md - Data Architecture section

## Time Estimate
**4 hours** (includes testing and debugging)
```

**Why This is Better**:
- ✅ Specific, testable criteria
- ✅ Clear file locations
- ✅ Implementation guidance
- ✅ What NOT to do (prevents scope creep)
- ✅ Testing instructions
- ✅ Realistic time estimate
- ✅ Context for agent

## Issue Size Guidelines

### Micro Issue (~1-2 hours)
- Single file edit
- Add one component
- Fix single bug
- Write documentation
- Update configuration
**Example**: "Update button color in header"

### Small Issue (~2-4 hours)
- Component adaptation
- Utility function creation
- Basic feature implementation
- Refactoring one module
**Example**: "Create data transformation utilities for API responses"

### Medium Issue (~4-6 hours)
- Multi-component coordination
- Complex feature
- API integration
- Testing suite
**Example**: "Create WordPress theme structure with React integration"

### Large Issue (6+ hours)
- ⚠️ Avoid! Break into smaller issues
- If unavoidable, mark as Epic and create sub-tasks
**Example**: Full Phase (should be Epic with multiple issues)

## Breaking Issues into Sub-Tasks

When creating a complex task, break it into smaller ones:

### Bad: One Epic Issue
```
# Migrate React App to WordPress

- Create theme
- Set up Vite
- Integrate React
- Test everything
- Deploy

(Vague, 40+ hours of work, agents can't start)
```

### Good: Epic with Sub-Issues
```
# Epic: Migrate React App to WordPress

Sub-tasks:
1. [PHASE 1] Set up local WordPress environment (#2)
2. [PHASE 1] Create WordPress theme structure (#8)
3. [PHASE 1] Test WordPress theme with React (#7)
4. [PHASE 2] Create API abstraction layer (#XX)
5. [PHASE 2] Update VehicleGrid to use API (#XX)
...
```

Each sub-task: 2-6 hours, independent, testable

## Review Checklist for Issue Creators

Before posting an issue for agent work:

- [ ] **Clarity**
  - [ ] Acceptance criteria are specific and testable
  - [ ] No ambiguous language ("better", "should", "might")
  - [ ] Implementation steps are clear
  - [ ] Don't-do list prevents scope creep

- [ ] **Scope**
  - [ ] Task is 2-6 hours (not days)
  - [ ] Independent of other issues (no blocking)
  - [ ] Single clear goal
  - [ ] File locations specified

- [ ] **Testing**
  - [ ] Testing instructions are step-by-step
  - [ ] Easy to verify when complete
  - [ ] Edge cases mentioned
  - [ ] Performance targets (if applicable) clear

- [ ] **Context**
  - [ ] References to .claude/ files
  - [ ] Related issues linked
  - [ ] Phase indicated
  - [ ] Blockers identified

- [ ] **Maintainability**
  - [ ] Follows .claude/requirements.md standards
  - [ ] Code review criteria clear
  - [ ] References to code examples if needed

## Pull Request Structure

AI agents should follow this PR structure:

```markdown
# Description
[Reference the issue #XX]

Fixed issue: [brief description]

## What Changed
- Changed X from Y to Z
- Added new function `fetchVehicles()`
- Updated component to use new API

## Testing Done
- [x] Tested desktop (Chrome 120, Firefox 121)
- [x] Tested mobile (iPhone 15 sim, Android Chrome)
- [x] Vehicle filtering works: New, <$25k, 4+ stars
- [x] Error handling verified
- [x] No console errors

## Performance Impact
- No performance regression
- Page still loads in <3 seconds

## Code Quality
- Follows .claude/requirements.md standards
- Linting passes: `npm run lint`
- No console warnings
- Code comments added for complex logic

## Acceptance Criteria Verification
- [x] Criterion 1 met - verified by: [testing step]
- [x] Criterion 2 met - verified by: [testing step]
- [x] Criterion 3 met - verified by: [testing step]

## Related Issues
- Closes #XX
- Related to #XX
```

## Agent Communication Protocol

When agents work on tasks:

### At Start
1. Read the GitHub issue completely
2. Read relevant .claude/ files:
   - README.md (index)
   - premises.md (context)
   - requirements.md (standards)
   - agentic-workflow.md (this file)
   - decisions.md (architecture)
3. Comment: "Starting work on this issue" with checklist

### During Work
- Ask for clarification in issue comments if confused
- Reference .claude/ files in commits and PRs
- Propose alternative approaches if you see issues

### Before PR
- Self-review against acceptance criteria
- Run suggested tests locally
- Verify code meets .claude/requirements.md
- Comment with verification checklist

### After PR Merge
- Update .claude/ files if you learned something new
- Note any decisions made for future reference

## Handling Blockers

If an agent hits a blocker:

1. **Cannot start**: Comment in issue explaining why
2. **Midway blocker**: Create new issue for the blocker, reference original
3. **Clarification needed**: Ask in issue comments
4. **Spec conflict**: Reference .claude/decisions.md Q&A section, add new Q&A if needed

## Quality Metrics for Agent Work

Track these metrics over time:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **First PR acceptance** | >90% | Approved without major changes |
| **Testing thoroughness** | >95% | All acceptance criteria verified |
| **Code quality** | >90% | Follows standards first try |
| **Task completion time** | ±20% | Within estimated hours |
| **Blocker rate** | <5% | Few dependencies between issues |
| **Documentation quality** | >85% | Clear for next person to understand |

## Phase Organization

Issues organized by Phase:

- **Phase 1**: WordPress theme setup (Weeks 1-2)
  - Issue titles: `[PHASE 1] ...`
  - Priority: Setup foundation first

- **Phase 2**: React API integration (Week 3)
  - Issue titles: `[PHASE 2] ...`
  - Depends on: Phase 1 complete

- **Phase 3**: Data migration (Weeks 4-5)
  - Issue titles: `[PHASE 3] ...`
  - Depends on: Phases 1-2 complete

- **Phases 4+**: Future enhancements
  - Issue titles: `[PHASE 4] ...`
  - Start after MVP is working

## Kanban Board Integration

Issues move through the board:

```
Backlog → Ready → In Progress → In Review → Done
  ↓        ↓          ↓            ↓
Future  Pre-work  Agent working  QA/Review  ✓ Done
```

**Status Rules**:
- **Backlog**: Planned but not yet detailed
- **Ready**: Fully specified, waiting for assignment
- **In Progress**: Agent actively working
- **In Review**: PR submitted, awaiting approval
- **Done**: Merged and verified

---

**Last Updated**: November 2024
**Workflow Version**: 1.0
