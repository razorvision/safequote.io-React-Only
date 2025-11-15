# Architectural Decisions & Q&A

Log of key architectural decisions and answers to frequently asked questions.

## Decision: WordPress Theme + Embedded React

**Date**: November 2024
**Status**: ✅ Approved
**Rationale**: Unified hosting, cost-effective, agentic-development friendly

**Compared Against**:
- Headless WordPress (rejected: higher cost, more complexity)
- Full PHP rewrite (rejected: loses React investment, worse UX)
- Gutenberg blocks (rejected: doesn't suit flow-based SPA)

**Implementation**: React app built as static files, served by WordPress theme
**Result**: Single $10-30/month hosting, ~90% React code preserved

---

## Decision: Keep Vehicle Data in Static JS File (Phase 1)

**Date**: November 2024
**Status**: ✅ Approved for Phase 1
**Rationale**: YAGNI principle - don't add complexity until needed

**Why NOT WordPress Custom Post Types Yet?**
- Vehicle data is static (hardcoded array)
- Client-side filtering works perfectly
- No content management needed yet
- Would add 2-3 days of work for zero benefit in Phase 1

**When to Migrate to Database?**
- When customer requests: "Can I manage vehicles through admin?"
- Or: "We need 1000+ vehicles"
- Or: "Non-technical users need to update content"
- Estimated: Phase 2 or later

**Timeline**: Phase 1 (keep as-is), Phase 2+ (evaluate if needed)

---

## Decision: Client-Side Filtering for Phase 1

**Date**: November 2024
**Status**: ✅ Approved for Phase 1
**Rationale**: Works with static data, simpler than REST API

**Current Implementation**:
- `getVehicles(filters)` in `src/lib/vehicleData.js`
- JavaScript `.filter()` on array
- Filters: condition, type, minSafetyRating, maxPrice

**Why NOT REST API in Phase 1?**
- No backend database (data is static)
- Would need to create:
  - Custom post types (1-2 days)
  - REST endpoints (1-2 days)
  - API documentation (0.5 days)
- Total: 3-4 days of work for zero functional improvement
- Client-side filtering is already fast for 10 vehicles

**When to Add REST API?**
- Migrate vehicles to WordPress database
- Add advanced filtering (full-text search, etc.)
- Add sorting/pagination
- Estimated: Phase 2+

**Performance Note**: Client-side filtering 10 vehicles = <1ms. Not a bottleneck.

---

## Decision: Insurance Quotes Stay Calculated

**Date**: November 2024
**Status**: ✅ Permanent decision (excellent design!)
**Rationale**: Insurance is formula-based, not stored data

**Current Implementation**:
- `getInsuranceQuotes(vehicle)` in `src/lib/insuranceData.js`
- Takes vehicle → calculates prices → returns 3 providers
- Formula: `basePrice - (safetyRating * 2) + provider_premium`

**Why Keep in React?**
- No storage needed (calculated on-demand)
- Simple formula, fast calculation
- Changing formula = one code change
- No database sync needed

**Never Needs to Change** to database (unnecessary complexity)

**Why This is Smart Design**:
- Decoupled from data storage
- Reusable in mobile apps
- Easy to A/B test pricing
- Simple to maintain

---

## Decision: Skip CORS Configuration for Phase 1

**Date**: November 2024
**Status**: ✅ Approved for Phase 1
**Rationale**: Build-and-serve workflow eliminates CORS need

**Current Development Approach**:
- Edit React code
- Run `npm run build`
- WordPress serves built files
- Same origin → no CORS needed

**Why NOT CORS Yet?**
- Build-and-serve already works
- CORS adds: 1 day of configuration, security vectors, debugging complexity
- Only needed if using Vite dev server (hot-reload)
- Can be added later (Phase 2+) if developers want faster feedback loop

**When to Add CORS?**
- If developers request hot-reload:
  - Vite dev server on localhost:5173
  - WordPress API on localhost:8888
  - CORS headers needed
  - Estimated: 0.5 days configuration

**Trade-off**:
- Now: Slower reload (rebuild), no CORS complexity
- Later: Fast reload (hot-module), CORS overhead

---

## Decision: NHTSA API Unchanged

**Date**: November 2024
**Status**: ✅ Permanent
**Rationale**: Already external API, no changes needed

**Current Implementation**:
- Component: `src/components/SafetyRatings.jsx`
- Endpoint: `https://api.nhtsa.gov/SafetyRatings/`
- Process: Client calls external API directly from React
- No WordPress involvement needed

**Why It Stays Exactly As Is**:
- ✅ Already works perfectly
- ✅ External API (no backend dependency)
- ✅ No CORS issues (NHTSA allows cross-origin)
- ✅ No migration needed
- ✅ Clean separation of concerns

**Future Consideration**: Could add server-side proxy for caching, but not necessary.

---

## Decision: No Custom Post Types in Phase 1

**Date**: November 2024
**Status**: ✅ Approved for Phase 1
**Rationale**: Prerequisite doesn't exist yet

**What They Would Need**:
1. Install ACF plugin
2. Register custom post type
3. Create ACF field group
4. Migrate vehicle data
5. Expose in REST API
6. Test thoroughly

**Why Not Now?**
- Vehicle data still in JavaScript
- No REST API to query from
- No admin UI needed yet
- 2-3 days work with zero immediate value

**Prerequisite Decision**:
- Only create custom post types when:
  - Decision made to move vehicles to database, AND
  - Business justifies the investment

**Timeline**: Phase 2 or later

---

## Decision: No REST API Endpoints in Phase 1

**Date**: November 2024
**Status**: ✅ Approved for Phase 1
**Rationale**: No database to query from

**What REST API Would Require**:
1. Vehicles stored in database (custom post type)
2. Endpoint: `GET /wp-json/wp/v2/vehicles?condition=New&max_price=25000`
3. Insurance endpoint: `GET /wp-json/wp/v2/insurance-providers`
4. React updated to fetch from API instead of static file
5. Error handling, loading states, caching
6. Testing all query combinations

**Why Not Now?**
- Data still in static JS file
- Filtering already works client-side
- Would need custom post types first (not decided yet)
- 2-3 days work for zero functional improvement

**Future Path**:
- Phase 2: Decide on database migration
- Phase 2.5: Create REST API endpoints (if database used)
- Phase 3: Update React to use API

---

## Decision: No ACF Pro Initially (Phase 1)

**Date**: November 2024
**Status**: ✅ Phase 1 approved
**Note**: Will need ACF for Phase 2+ (if custom post types added)

**Phase 1 Approach**:
- Use free ACF or skip entirely
- Focus on getting React running in WordPress
- Add ACF when creating custom post types (Phase 2+)

**Phase 2+ Approach**:
- Upgrade to ACF Pro ($99/year) for:
  - More field types
  - Better flexible content
  - Repeater fields for safety features
  - Better API support

**Cost Consideration**:
- Phase 1: $0 (skip or use free)
- Phase 2+: $99/year (only if needed)
- Saves: Not paying for unused features

---

## Q&A: Common Questions

### Q: Why not use Next.js instead of WordPress?

**A**:
- Next.js would require Node.js hosting ($20-50/month minimum)
- WordPress hosting is cheaper ($5-30/month)
- WordPress provides admin UI for content management
- React/Vite already works for this project
- Could migrate to Next.js later if needed

**Decision**: WordPress for simplicity and cost. Next.js as future option if SSR needed.

---

### Q: What if we get 1000 vehicles? Won't filtering break?

**A**:
- Client-side filtering 1000 items: Still <100ms (fast)
- Browser can handle it
- When filtering becomes slow (<1000 items easily):
  - Move to REST API with server-side filtering
  - Add pagination
  - Add indexing

**Decision**: Keep current approach until it becomes a bottleneck (YAGNI).

---

### Q: Should we use WordPress for the NHTSA API?

**A**:
- NHTSA API is external (no proxy needed)
- No CORS issues (NHTSA allows cross-origin)
- Calling directly from React is cleaner
- Could add server-side caching later if needed

**Decision**: Call NHTSA API directly from React. Proxy only if issues arise.

---

### Q: When should we move to database?

**A**: When customer says one of:
- "I need to manage vehicles without editing code"
- "I want to add new vehicles/insurance providers"
- "We have hundreds of vehicles"
- "I need to show different vehicles per region"

**Decision**: Phase 2 or later, based on business needs.

---

### Q: Do we need Webpack or other build tools?

**A**: No.
- Vite is simpler, faster than Webpack
- Already configured
- Works perfectly for React 18 + Tailwind
- No need to change

**Decision**: Keep Vite. It's excellent.

---

### Q: Should we add TypeScript?

**A**:
- Pro: Type safety, better IDE support
- Con: Slower initial development, learning curve
- Current: Working well without TypeScript
- Phase 1: Keep as-is (no type overhead)
- Phase 2+: Evaluate if code base gets complex

**Decision**: Phase 1 without TypeScript. Add later if complexity warrants.

---

### Q: How do we handle user data (teens, parents)?

**A**: Out of scope for Phase 1.
- Phase 1: No user authentication
- Phase 2+: Could add user accounts
- Decision: Tackle in future phase

---

### Q: Should we add analytics?

**A**: Out of scope for Phase 1.
- Phase 1: Get core working
- Phase 2+: Add Google Analytics
- Decision: Later phase

---

### Q: What about mobile app?

**A**: Out of scope for Phase 1.
- Phase 1: Web app only
- Phase 2+: Evaluate React Native
- Decision: Future consideration

---

### Q: Do we need a staging environment?

**A**:
- Phase 1: Local development only
- Phase 2+: GitHub Actions for automated testing
- Production: Git push → automatic deployment
- Decision: Set up in Phase 2

---

## Decision Log Template

Use this format for new decisions:

```markdown
## Decision: [Decision Title]

**Date**: [Date]
**Status**: ✅ Approved / 🔄 Under Review / ❌ Rejected
**Rationale**: [Why this decision]

**Compared Against**:
- Alternative 1: [pros/cons]
- Alternative 2: [pros/cons]

**Implementation**: [How we'll do it]
**Timeline**: [When]
**Reversibility**: [Can we undo this?]

**Related Decisions**:
- #[other decision]
```

---

## Reversing a Decision

Some decisions are reversible:

### Easy to Reverse
- ✅ Adding CORS later (just add config)
- ✅ Migrating to REST API (small refactor)
- ✅ Creating custom post types (new work)
- ✅ Switching theme approach (rebuild)

### Hard to Reverse
- ❌ Using PHP vs Node.js (architectural)
- ❌ WordPress vs other CMS (big migration)
- ❌ Database structure (data migration)

**Note**: Architecture decisions are reversible but expensive. Start simple.

---

## Future Decision Points

Upcoming decisions to make:

- **Phase 2**: Database migration approach
- **Phase 2**: REST API design
- **Phase 3**: User authentication method
- **Phase 3**: Data backup strategy
- **Phase 4**: Mobile app approach
- **Phase 4**: Caching layer (Redis?)
- **Phase 5**: Multi-region deployment

---

**Last Updated**: November 2024
**Version**: 1.0
