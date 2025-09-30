# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint
```

### Single File Operations
```bash
# Lint specific file
npx eslint path/to/file.tsx --fix

# Type check specific file
npx tsc --noEmit path/to/file.tsx
```

## Architecture Overview

This is a Remix-based React application that simulates a Census-like data platform. The app uses a client-side IndexedDB database (Dexie) for data persistence and state management through React Context providers.

### Core Architecture Patterns

**Data Layer**: The application uses Dexie (IndexedDB wrapper) as a local database with:
- Schema migrations system in `app/db/migration.tsx`
- Entity types defined in `app/db/types/`
- Database operations in `app/db/db.ts`
- Seeded initial data in `app/db/data/`

**State Management**: Multi-layered provider architecture:
- `RootProvider` composes all context providers
- Domain-specific providers in `app/providers/`:
  - `EnrichEnhanceProvider` - Dataset enrichment workflows
  - `NewConnectionProvider` - Connection creation flows
  - `BreadcrumbProvider` - Navigation breadcrumbs
  - `OperatorProvider` - Query/operation builders
  - `NewDatasetProvider` - Dataset creation workflows

**Component Architecture**:
- UI components use shadcn/ui with Radix UI primitives
- Components organized by domain in `app/components/`
- Path alias `~/*` maps to `app/*`

**Routing Structure**: 
- File-based routing with versioning support via `_app.($version).*`
- Nested routes for complex flows (datasets, connections, syncs)
- Multi-step wizards for dataset/connection creation

### Key Domain Models

**Datasets**: Central entity representing data tables with:
- Source connection information
- Column schema definitions
- Enrichment/enhancement configurations

**Connections**: External data source integrations with:
- Service-specific configurations
- Authentication/API key management
- Connection testing and validation

**Syncs**: Data synchronization jobs between datasets and destinations

**Segments**: Filtered subsets of datasets for targeted operations

## Technology Stack

- **Framework**: Remix with Vite
- **UI**: React 18, TypeScript, Tailwind CSS
- **Components**: shadcn/ui, Radix UI, Lucide icons, FontAwesome Pro
- **Data**: Dexie (IndexedDB), Zustand for additional state
- **Forms**: React Hook Form with Zod validation
- **Tables**: TanStack Table, AG Grid
- **File Handling**: React Dropzone, PapaParse for CSV

## Development Guidelines

### File Organization
- Use the `~/*` alias for all internal imports
- Keep domain logic in appropriate provider/context files  
- Place reusable utilities in `app/lib/`
- Store type definitions in `app/types/` or co-located with features

### Database Migrations
When modifying the database schema:
1. Create new migration in `app/db/migration.tsx`
2. Update entity types in `app/db/types/`
3. Test migration with existing data

### Route Development
- Follow existing nested route patterns for multi-step flows
- Use version parameters for A/B testing different UX approaches
- Implement proper loading states and error boundaries

### Component Development  
- Use existing UI component patterns from `app/components/ui/`
- Implement proper TypeScript types for all props
- Follow shadcn/ui conventions for styling and behavior

## Common Patterns

### Provider Integration
When adding new global state:
```typescript
// Add provider to app/providers/index.tsx
const providers = [
  // ... existing providers
  YourNewProvider,
];
```

### Database Operations
```typescript
import { db } from '~/db/db';

// Always use try/catch for database operations
try {
  const results = await db.datasets.where('source').equals(sourceId).toArray();
} catch (error) {
  // Handle error appropriately
}
```

### Route Data Loading
```typescript
export async function loader({ params }: LoaderFunctionArgs) {
  // Use database helpers from ~/db/db.ts
  const dataset = await getDataset(params.id);
  if (!dataset) throw new Response("Not Found", { status: 404 });
  return json({ dataset });
}
```