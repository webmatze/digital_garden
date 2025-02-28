# CLAUDE.md - Digital Garden Project Guide

## Commands
- Run local server: `python -m http.server` (in the project root)
- Open in browser: http://localhost:8000/src/index.html

## Code Structure
- `index.html` - Entry point with UI controls
- `garden.js` - Main simulation controller
- `plant.js` - Plant lifecycle and visual rendering
- `weather.js` - Weather system affecting plant growth
- `styles.css` - Visual styling

## Code Style Guidelines
- Use ES6 class syntax for object definitions
- PascalCase for class names (Garden, Plant, Weather)
- camelCase for methods, properties, and variables
- Use meaningful variable names that describe their purpose
- Group related properties together in constructors
- Use consistent indentation (4 spaces)
- Comment complex logic or calculations
- CSS selectors should use kebab-case naming (garden-container)
- Prefer semantic HTML elements where appropriate

## Best Practices
- Avoid magic numbers, use named constants
- Log important events with console.log for debugging
- Handle edge cases in plant positioning and growth
- Follow natural component lifecycle (init, update, draw)
- Organize code by responsibility (plants, weather, garden)