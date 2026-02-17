# Mapbox Debugging Guide

## What We've Added

I've added comprehensive console logging to the BaseMap component to help us identify exactly where the token issue is occurring.

## Console Logs to Watch For

When you reload the page at `http://localhost:3001/operaciones`, open your browser's Developer Console (F12) and look for these log messages:

### 1. Token Loading (Module Level)
```
🔍 [BaseMap] process.env.NEXT_PUBLIC_MAPBOX_TOKEN: <token_value>
🔍 [BaseMap] MAPBOX_TOKEN value: <token_value>
🔍 [BaseMap] MAPBOX_TOKEN length: <number>
🔍 [BaseMap] MAPBOX_TOKEN type: string
```

**What to check:**
- Is `process.env.NEXT_PUBLIC_MAPBOX_TOKEN` showing the correct token from .env.local?
- Is `MAPBOX_TOKEN` defined and not empty?
- Is the length around 200+ characters?

### 2. Component Rendering
```
🔍 [BaseMap] Component rendering, isReady: false
🔍 [BaseMap] viewState: {center: {lat: 7.1193, lng: -73.1227}, zoom: 12}
🔍 [BaseMap] mapStyle: mapbox://styles/mapbox/dark-v11
```

**What to check:**
- Is viewState showing valid coordinates?
- Is mapStyle a valid Mapbox style URL?

### 3. Initialization
```
🔍 [BaseMap] useEffect triggered
🔍 [BaseMap] Setting isReady to true
✅ [BaseMap] About to render Map component with token: pk.ey...
```

**What to check:**
- Does the token preview look correct (starts with "pk.")?

### 4. Map Loading
```
✅ [BaseMap] Map loaded successfully!
```
OR
```
❌ [BaseMap] Map error: <error_details>
```

**What to check:**
- If you see the success message, the map loaded!
- If you see an error, it will tell us exactly what went wrong

## Expected Token Value

Your .env.local file contains:
```
NEXT_PUBLIC_MAPBOX_TOKEN=<YOUR_MAPBOX_ACCESS_TOKEN>
```

This is the token that should appear in the console logs.

## Next Steps

1. **Restart the dev server** (kill the current one and run `npm run dev` again)
2. **Navigate to** `http://localhost:3001/operaciones`
3. **Open DevTools Console** (F12 → Console tab)
4. **Look for the log messages** above
5. **Share the console output** with me so we can see exactly where the issue is

## Common Issues to Look For

### Issue 1: Token Not Loading from .env.local
**Symptom:** `process.env.NEXT_PUBLIC_MAPBOX_TOKEN` shows `undefined`
**Solution:** The .env.local file isn't being read. Make sure you restarted the dev server after creating it.

### Issue 2: Token Is Empty String
**Symptom:** `MAPBOX_TOKEN value:` shows an empty string
**Solution:** Check that .env.local has no extra spaces or quotes around the token.

### Issue 3: Wrong Token Format
**Symptom:** Token doesn't start with "pk."
**Solution:** The token format is invalid. Get a new token from Mapbox.

### Issue 4: Map Initialization Error
**Symptom:** You see `❌ [BaseMap] Map error:` with details
**Solution:** The error message will tell us exactly what's wrong (invalid token, network issue, etc.)

## If All Logs Look Good But Map Still Fails

If the console shows the token is correct but the map still fails to load, the issue might be:
1. **Network/CORS issue** - Check the Network tab for failed requests
2. **Mapbox GL version incompatibility** - We're using v2.15.0 which should work
3. **React-map-gl prop mismatch** - The debug logs will help us verify the props being passed

Let me know what you see in the console!
