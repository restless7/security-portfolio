# Navbar/Footer Exclusion Fix ✅

## Problem
The navbar and footer were still showing in the `/operaciones` route despite creating a dedicated layout.

## Root Cause
In Next.js, layouts are **nested**. The root layout (`/app/layout.tsx`) wraps all child layouts, including `/app/operaciones/layout.tsx`. Simply creating a child layout doesn't prevent the parent layout from rendering its navbar and footer.

## Solution
Updated the root layout to conditionally render navbar and footer based on the current route.

### Changes Made

**File**: `/app/layout.tsx`

1. **Made it a Client Component**
   ```tsx
   'use client';
   ```

2. **Added Route Detection**
   ```tsx
   import { usePathname } from "next/navigation";
   
   const pathname = usePathname();
   const isOperacionesRoute = pathname?.startsWith('/operaciones');
   ```

3. **Conditional Rendering**
   ```tsx
   {!isOperacionesRoute && <Navigation />}
   <main className={isOperacionesRoute ? "h-full" : "flex-grow"}>
     {children}
   </main>
   {!isOperacionesRoute && <Footer />}
   ```

4. **Added Metadata in Head**
   Since client components can't export metadata, added it directly in the `<head>` element:
   ```tsx
   <head>
     <title>Sebastian García - Cybersecurity & AppSec Specialist</title>
     <meta name="description" content="..." />
     <meta name="keywords" content="..." />
   </head>
   ```

## How It Works

### For Regular Routes (e.g., `/`, `/projects`, `/about`)
```
┌─────────────────────────────┐
│  Navigation Bar             │
├─────────────────────────────┤
│                             │
│  Page Content               │
│  (flex-grow)                │
│                             │
├─────────────────────────────┤
│  Footer                     │
└─────────────────────────────┘
```

### For Operaciones Route (`/operaciones`)
```
┌─────────────────────────────┐
│                             │
│  Full-Screen App            │
│  (h-full, no navbar/footer) │
│                             │
│                             │
└─────────────────────────────┘
```

## Code Flow

1. User navigates to any route
2. `usePathname()` detects the current path
3. `isOperacionesRoute` checks if path starts with `/operaciones`
4. If true:
   - Navbar: **hidden**
   - Footer: **hidden**
   - Main: `className="h-full"` (full height)
5. If false:
   - Navbar: **shown**
   - Footer: **shown**
   - Main: `className="flex-grow"` (flexible height)

## Benefits

✅ **Clean Separation**: Operaciones is a full-screen app  
✅ **No Code Duplication**: Single layout handles both cases  
✅ **Maintainable**: Easy to add more excluded routes  
✅ **SEO Friendly**: Metadata still present  
✅ **Type Safe**: TypeScript checks pathname  

## Testing

### Test Cases:
- [x] `/` - Shows navbar and footer
- [x] `/projects` - Shows navbar and footer
- [x] `/operaciones` - No navbar, no footer
- [x] `/operaciones/anything` - No navbar, no footer (nested routes)
- [x] Page title and meta tags present
- [x] Full-screen layout in operaciones
- [x] Flexible layout in other routes

## Alternative Approaches Considered

### 1. Route Groups (Not Used)
Could use `(app)` and `(operaciones)` route groups with separate layouts, but this would require restructuring the entire app directory.

### 2. Middleware (Not Used)
Could use Next.js middleware to set headers, but this is overkill for simple conditional rendering.

### 3. Template Component (Not Used)
Could use a template.tsx file, but client component with usePathname is simpler.

## Future Enhancements

If you need to exclude more routes in the future:

```tsx
const isFullScreenRoute = pathname?.startsWith('/operaciones') || 
                          pathname?.startsWith('/admin') ||
                          pathname?.startsWith('/dashboard');
```

Or create a config:

```tsx
const FULL_SCREEN_ROUTES = ['/operaciones', '/admin', '/dashboard'];
const isFullScreenRoute = FULL_SCREEN_ROUTES.some(route => 
  pathname?.startsWith(route)
);
```

---

**Status**: ✅ **COMPLETE**  
**Date**: 2025-11-21  
**Issue**: Navbar/Footer showing in /operaciones  
**Solution**: Conditional rendering in root layout using usePathname  
**Result**: Clean, full-screen operaciones app
