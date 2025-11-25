# Styles Organization

This folder contains all my CSS styling for the ParkEase parking management application.

## Structure

...
styles/
├── index.css           # Main styles entry point - imports all component styles
├── components/         # Component-specific styles
│   ├── Login.css      # Login/Register form styling
│   ├── LotsPage.css   # Parking lots browsing page styling
│   └── Reservations.css # Reservations management styling
└── README.md          # This documentation file

```

## Usage

### Global Import

All styles are imported through `styles/index.css` in the main `App.jsx`:

```javascript
import './styles/index.css'
```

### CSS Variables

Global CSS variables are defined in `index.css`:

- `--primary-color: #4187f6` - Main brand color
- `--success-color: #28a745` - Success/confirmation color
- `--danger-color: #dc3545` - Error/warning color
- `--border-radius: 8px` - Standard border radius
- `--transition: all 0.3s ease` - Standard transition

### Utility Classes

Common utility classes available globally:

- `.btn`, `.btn-primary`, `.btn-success` - Button styles
- `.card` - Card container with shadow
- `.container` - Max-width container with padding
- `.loading`, `.error` - Status message styles

## Adding New Styles

1. Create new CSS file in `components/` folder
2. Add import to `styles/index.css`
3. Use global CSS variables for consistency
4. Follow existing naming conventions

## Benefits

- **Centralized Management** - All styles in one location
- **Global Variables** - Consistent colors and spacing
- **Component Isolation** - Each component has its own CSS file
- **Easy Maintenance** - Single import point in App.jsx
- **Scalable Structure** - Easy to add new component styles
