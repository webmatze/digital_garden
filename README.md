# Digital Garden - An Interactive Plant Life Simulation

## 🌱 About The Project

Digital Garden is a mesmerizing web-based simulation that brings to life the subtle beauty and complexity of a self-sustaining garden ecosystem. Unlike traditional games or simulations, this project focuses on creating an ever-evolving, living canvas where plants grow, reproduce, and interact in fascinating ways.

## ✨ What Makes It Special

- **Natural Life Cycles**: Each plant in the garden has its own unique lifecycle - from seed to maturity, reproduction, and eventual fade. Trees grow tall and majestic, flowers bloom with vibrant colors, and grass creates a dynamic ground cover.

- **Dynamic Weather System**: The simulation features a weather system that directly impacts plant growth. Sunny days provide steady growth, rain accelerates it, and cloudy conditions slow things down, creating a more realistic and engaging environment.

- **Intelligent Plant Spacing**: Plants use sophisticated spacing algorithms to ensure they don't overcrowd each other, mimicking natural competition for resources. Different plant types maintain different spacing requirements, just like in nature.

- **Organic Reproduction**: Mature plants naturally drop seeds within realistic spread radiuses, with trees spreading their seeds further than flowers or grass, creating natural-looking plant distributions.

- **Interactive Controls**: Users can:
  - Adjust simulation speed to watch evolution happen faster or slower
  - Fine-tune plant spacing parameters
  - Add new plants manually
  - Clear the garden to start fresh

## 🎨 Visual Design

The project uses HTML5 Canvas to create smooth, efficient animations and beautiful visual effects. Each plant type has its own distinctive appearance:
- Trees with broad canopies
- Flowers with colorful blooms
- Grass with varying heights and shades

## 💭 Philosophy Behind the Project

This project was born from a fascination with emergent systems and natural processes. It demonstrates how simple rules can create complex, beautiful outcomes - much like nature itself. The garden serves as both a meditative visual experience and an educational tool, helping users understand concepts like plant lifecycle, spacing, and environmental factors in plant growth.

## 🚀 Future Vision

The Digital Garden is an ongoing project with room for endless possibilities:
- New plant species
- Seasonal changes
- More environmental factors
- Enhanced visualization options
- Plant evolution mechanics

## 🛠 Technical Implementation

Built using modern JavaScript with ES6 modules, HTML5 Canvas, and CSS. The project follows a clean architecture with separation of concerns:

- **Models**: Plant, Weather, Environment, Ecosystem
- **Controllers**: Garden, UI
- **Configuration**: Centralized settings management
- **Utils**: Reusable helper functions

### Project Structure
```
src/
├── config.js                # Centralized configuration settings
├── utils.js                 # Utility functions
├── main.js                  # Application entry point
├── controllers/
│   ├── garden-controller.js # Main garden logic controller
│   └── ui-controller.js     # UI interaction handling
├── models/
│   ├── plant.js             # Base plant class
│   ├── seed.js              # Seed management
│   ├── weather.js           # Weather system
│   ├── environment.js       # Environment handling
│   ├── ecosystem.js         # Plant ecosystem
│   ├── plant-registry.js    # Plant type registration
│   └── specific-plants/     # Specialized plant implementations
│       ├── tree.js
│       ├── flower.js
│       └── grass.js
├── index.html               # Main HTML entry point
└── styles.css               # CSS styling
```

## 🌿 Get Started

1. Clone the repository
2. Open `src/index.html` in your browser or run a local server:
   ```
   python -m http.server
   ```
3. Visit http://localhost:8000/src/index.html

## 🧪 Extending the Garden

To add new plant types:
1. Create a new class that extends the base Plant class
2. Register it with the PlantRegistry
3. Update the UI to include your new plant type

---

Created with 💚 by a developer who believes code can create beauty.