# SafeQuote Project Context & Instructions

This directory contains project context, requirements, and instructions for Claude and AI agents working on SafeQuote.

## 📚 Documentation Structure

Claude automatically reads all files in this directory to understand project context. When working on issues, refer to these files.

### Files in This Directory

| File | Purpose | Audience |
|------|---------|----------|
| **README.md** (this file) | Index and how to use this directory | Everyone |
| **premises.md** | Project context, why certain decisions were made | Agents starting new tasks |
| **requirements.md** | Technical requirements, constraints, standards | Before starting any task |
| **agentic-workflow.md** | How to structure issues and PRs for agent work | When creating tasks |
| **decisions.md** | Architectural decisions and Q&A log | When making design choices |
| **instructions.md** | General guidelines for agents working here | All agents |

## 🤖 For AI Agents

When you receive a task in GitHub:

1. **Read** `premises.md` to understand the project context
2. **Read** `requirements.md` for technical constraints
3. **Read** `decisions.md` to understand why certain choices were made
4. **Follow** `agentic-workflow.md` for task structure
5. **Reference** this directory in your PR comments

Example in PR:
```
Implemented according to .claude/requirements.md and .claude/agentic-workflow.md
```

## 📋 Quick Reference

### Project Type
- WordPress Theme with Embedded React
- React 18.2 + Vite 4.4.5
- Tailwind CSS + Radix UI
- Single unified WordPress hosting

### Current Phase
- Phase 1: Create WordPress theme structure (Weeks 1-2)

### Key Premise
- **Keep it simple**: No unnecessary complexity
- **Preserve React code**: 90% stays the same
- **Static data for now**: Vehicles in JS file, insurance calculated client-side
- **Agentic-first**: Break work into independent issues

### Quick Links
- Main Epic: [#1 - WordPress Migration](https://github.com/razorvision/safequote.io/issues/1)
- Project Board: [SafeQuote Kanban](https://github.com/orgs/razorvision/projects/13)
- Repository: [razorvision/safequote.io](https://github.com/razorvision/safequote.io)

## 🆕 Adding New Requirements or Instructions

When you need to add new project guidance:

1. **Creating a new file?** Update this README with a new table row
2. **Naming convention**: `kebab-case.md`
3. **Keep it concise**: Max 500 lines per file, link to external docs if longer
4. **Make it discoverable**: Agents should find what they need within 30 seconds

### Common Files to Add Later

- `performance-targets.md` - Performance benchmarks and optimization goals
- `design-system.md` - Tailwind CSS conventions and Radix UI usage
- `testing-standards.md` - Testing requirements and frameworks
- `database-schema.md` - (Phase 2+) Database structure and migrations
- `api-design.md` - (Phase 2+) REST API design patterns
- `deployment.md` - Production deployment checklist and procedures

## ✅ Checklist for New Tasks

Before creating a GitHub issue, ensure:

- [ ] Issue references relevant `.claude/` files
- [ ] Task is independent and completable by one agent
- [ ] Acceptance criteria are clear and testable
- [ ] Links to related issues/decisions included
- [ ] Performance/quality requirements included (from `requirements.md`)

## 📞 Questions?

If this context is unclear or missing something:

1. Reference the specific `.claude/` file that needs updating
2. Create a comment in the issue explaining what's missing
3. The project maintainer will update `.claude/` files
4. Re-read the updated file to get context

## 🔄 File Usage Patterns

### .claude/premises.md
- Read before starting any new task
- Reference when explaining why code is structured a certain way
- Link in PRs: "See `.claude/premises.md` for project context"

### .claude/requirements.md
- Reference in issue acceptance criteria
- Link in code reviews: "Verify against `.claude/requirements.md`"
- Check before submitting PR

### .claude/decisions.md
- Read before making architectural choices
- Search for Q&A relevant to your task
- Add new Q&A entries if you make new decisions

### .claude/agentic-workflow.md
- Follow when structuring GitHub issues
- Reference in PR template
- Ensure your work complies with standards

### .claude/instructions.md
- Read at start of every new task
- Refresh memory if context-switching between tasks
- Reference behavioral expectations in code reviews

---

**Last Updated**: November 2024
**Maintainer**: Project Team
**Version**: 1.0
