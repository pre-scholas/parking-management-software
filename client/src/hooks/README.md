# Custom Hooks

This folder contains reusable custom hooks for the ParkEase parking management application.

## Available Hooks

### `useAuth`

Manages authentication state and actions.

**Returns:**

- `user` - Current user object
- `isAuthenticated` - Boolean authentication status
- `loading` - Loading state during auth check
- `login(token, userData)` - Login function
- `logout()` - Logout function

**Usage:**

```javascript
import { useAuth } from '../hooks';

const { user, isAuthenticated, login, logout } = useAuth();
```

### `useDashboard`

Fetches and manages dashboard statistics.

**Returns:**

- `stats` - Dashboard statistics object
- `loading` - Loading state during fetch
- `error` - Error state if fetch fails
- `refreshStats()` - Function to refresh data

**Usage:**

```javascript
import { useDashboard } from '../hooks';

const { stats, loading, refreshStats } = useDashboard();
```

### `useNavigation`

Provides navigation utilities and quick actions.

**Returns:**

- `quickActions` - Array of navigation actions
- `navigateTo(path)` - Navigation function
- `navigate` - React Router navigate function

**Usage:**

```javascript
import { useNavigation } from '../hooks';

const { quickActions, navigateTo } = useNavigation();
```

## Benefits

- **Reusability** - Share logic across components
- **Separation of Concerns** - Keep components focused on UI
- **Testability** - Easier to test isolated logic
- **Maintainability** - Centralized business logic