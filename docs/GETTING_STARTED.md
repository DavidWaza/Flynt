# Getting Started with Flynt Finance

## Prerequisites

- **Node.js:** 20.x LTS
- **npm:** 10.x or higher
- **Docker:** For local databases
- **Git:** For version control
- **PostgreSQL:** 15.x (via Docker)
- **Redis:** 7.x (via Docker)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/flynt-finance.git
cd flynt-finance
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
# Copy example env file
cp .env.local.example .env.local

# Edit with your values
nano .env.local
```

Required variables:
```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/flynt_dev

# Redis
REDIS_URL=redis://localhost:6379

# Auth
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl
NEXTAUTH_URL=http://localhost:3000

# External APIs (get from providers)
OKRA_SECRET_KEY=
OKRA_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
TERMII_API_KEY=
SENDGRID_API_KEY=
```

### 4. Start Local Databases

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Verify containers are running
docker ps
```

### 5. Run Database Migrations

```bash
npm run db:migrate
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

The app will be available at:
- **Web:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/docs

## Project Structure

```
flynt-finance/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and helpers
├── public/          # Static assets
├── styles/          # Global styles
└── docs/            # Documentation
```

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Common Tasks

### Creating a New Component

```bash
# Use the component generator
npm run generate:component ButtonPrimary

# This creates:
# - components/ui/ButtonPrimary/ButtonPrimary.tsx
# - components/ui/ButtonPrimary/ButtonPrimary.test.tsx
# - components/ui/ButtonPrimary/index.ts
```

### Adding a New API Route

```bash
# Create file in app/api/
touch app/api/budgets/route.ts
```

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Your logic here
  return NextResponse.json({ data: [] });
}
```

### Database Migrations

```bash
# Create new migration
npm run db:migration:create add_cards_table

# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:migrate:rollback
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Redis Connection Issues

```bash
# Check if Redis is running
docker ps | grep redis

# Test connection
redis-cli ping
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
# Command Palette (Cmd+Shift+P) > "TypeScript: Restart TS Server"

# Or rebuild
npm run build
```

## IDE Setup

### VS Code (Recommended)

Install extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- GitLens

Settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Next Steps

1. **Read the docs:** Check `/docs` for detailed guides
2. **Explore the codebase:** Start with `app/page.tsx`
3. **Run the tests:** `npm test`
4. **Make a change:** Try editing a component
5. **Join the team:** Slack channel #flynt-dev

## Resources

- **Design System:** http://localhost:6006 (Storybook)
- **API Documentation:** http://localhost:3000/api/docs
- **Database Schema:** See `docs/DATABASE_SCHEMA.md`
- **Architecture:** See `IMPLEMENTATION_PLAN.md`

## Getting Help

- **Slack:** #flynt-dev
- **Email:** dev@flynt.finance
- **Issues:** GitHub Issues

---

**Happy coding! 🚀**
