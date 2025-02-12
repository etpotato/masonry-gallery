## ENV variables

```
VITE_PHOTOS_API_KEY=pexels_api_key

# enables local cache
VITE_ENABLE_CACHE=1
```

## Commands

Install deps

```
npm i
```

Build

```
npm run build
```

Preview

```
npm run preview
```

## Performance note

To improve performance various techniques are used:

- Virtual window - render only items that are visible on the screen
- Throttling callback for scroll event listener and resize observer
- `useMemo()` for masonry to avoid additional calculations
- `React.memo()` to avoid unnecessary image rerenders
- Use of React component composition
