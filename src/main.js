/**
 * Main entry point for the Digital Garden simulation
 */
import { GardenController } from './controllers/garden-controller.js';
import { UIController } from './controllers/ui-controller.js';
import { Tree } from './models/specific-plants/tree.js';
import { Flower } from './models/specific-plants/flower.js';
import { Grass } from './models/specific-plants/grass.js';

class App {
    constructor() {
        // Get canvas element
        this.canvas = document.getElementById('garden-canvas');
        
        // Initialize controllers
        this.gardenController = new GardenController(this.canvas);
        this.uiController = new UIController();
        
        // Register plant types
        this.registerPlantTypes();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize UI with current settings
        this.uiController.updateControls(this.gardenController.getSettings());
        
        // Start simulation
        this.startSimulation();
    }

    /**
     * Register plant types with the garden controller
     */
    registerPlantTypes() {
        this.gardenController.registerPlantType('tree', Tree);
        this.gardenController.registerPlantType('flower', Flower);
        this.gardenController.registerPlantType('grass', Grass);
    }

    /**
     * Set up event listeners for controllers
     */
    setupEventListeners() {
        // UI events
        this.uiController.on('speed-change', (speed) => {
            this.gardenController.updateSpeed(speed);
        });
        
        this.uiController.on('distance-change', ({ type, distance }) => {
            this.gardenController.updatePlantDistance(type, distance);
        });
        
        this.uiController.on('add-plant', ({ type }) => {
            this.gardenController.addPlant(type);
        });
        
        this.uiController.on('clear-garden', () => {
            this.gardenController.clearGarden();
        });
        
        this.uiController.on('resize', () => {
            this.gardenController.handleResize();
        });
    }

    /**
     * Start simulation loop
     */
    startSimulation() {
        const gameLoop = () => {
            this.gardenController.update();
            this.gardenController.draw();
            requestAnimationFrame(gameLoop);
        };
        
        // Start loop
        gameLoop();
    }
}

// Start the application when the page loads
window.addEventListener('load', () => {
    new App();
});