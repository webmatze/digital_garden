/**
 * Ecosystem class for managing plants and their interactions
 */
import { Seed } from './seed.js';
import { PlantRegistry } from './plant-registry.js';
import { Environment } from './environment.js';
import { config } from '../config.js';
import { distance } from '../utils.js';

export class Ecosystem {
    /**
     * Create a new ecosystem
     * @param {number} width - Ecosystem width
     * @param {number} height - Ecosystem height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.plants = [];
        this.seeds = [];
        this.environment = new Environment(width, height);
        this.plantRegistry = new PlantRegistry();
        
        // Plant spacing settings
        this.minDistances = { ...config.plantDistances };
    }

    /**
     * Update ecosystem state
     */
    update() {
        // Update environment
        this.environment.update();
        const weather = this.environment.getWeather();
        
        // Update seeds
        this.updateSeeds();
        
        // Update plants
        this.updatePlants(weather);
    }

    /**
     * Update seeds
     */
    updateSeeds() {
        // Update seed states
        const readySeeds = [];
        const waitingSeeds = [];
        
        for (const seed of this.seeds) {
            // Simple seed format from dropSeeds method
            if (typeof seed.update !== 'function') {
                // Convert simple seed object to Seed instance
                seed.delay--;
                if (seed.delay <= 0) {
                    readySeeds.push(seed);
                } else {
                    waitingSeeds.push(seed);
                }
            } else {
                // Proper Seed instance
                if (seed.update()) {
                    readySeeds.push(seed);
                } else if (!seed.isReadyToGrow()) {
                    waitingSeeds.push(seed);
                }
            }
        }
        
        // Plant ready seeds
        for (const seed of readySeeds) {
            this.tryToPlantSeed(seed);
        }
        
        // Keep only waiting seeds
        this.seeds = waitingSeeds;
    }

    /**
     * Try to plant a seed
     * @param {Seed} seed - Seed to plant
     */
    tryToPlantSeed(seed) {
        if (seed.x >= 0 && seed.x <= this.width && 
            this.isPositionAvailable(seed.x, seed.y, this.minDistances[seed.type])) {
            const plant = this.plantRegistry.createPlant(seed.type, seed.x, seed.y);
            this.plants.push(plant);
        }
    }

    /**
     * Update plants
     * @param {Weather} weather - Current weather conditions
     */
    updatePlants(weather) {
        const plantsToKeep = [];
        
        for (const plant of this.plants) {
            const shouldRemove = plant.grow(weather);
            
            if (!shouldRemove) {
                plantsToKeep.push(plant);
                
                // Collect seeds
                const newSeeds = plant.dropSeeds();
                if (newSeeds.length > 0) {
                    console.log(`Plant at (${plant.x.toFixed(1)}, ${plant.y.toFixed(1)}) dropped ${newSeeds.length} seeds`);
                    this.seeds = this.seeds.concat(newSeeds);
                }
            }
        }
        
        this.plants = plantsToKeep;
    }

    /**
     * Check if position is available for a new plant
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} minDistance - Minimum distance
     * @returns {boolean} True if position is available
     */
    isPositionAvailable(x, y, minDistance) {
        return !this.plants.some(plant => {
            // Calculate base distance between plants
            const dist = distance(plant.x, plant.y, x, y);
            
            // Adjust minimum distance based on plant types
            let requiredDistance = minDistance;
            
            // If either plant is grass, reduce the required distance
            if (plant.type === 'grass' || plant.type === 'flower') {
                requiredDistance *= 0.7; // Reduce minimum distance by 30%
            }
            
            return dist < requiredDistance;
        });
    }

    /**
     * Draw ecosystem on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        // Draw environment
        this.environment.draw(ctx);
        
        // Draw plants
        this.plants.forEach(plant => plant.draw(ctx));
    }

    /**
     * Add a new plant
     * @param {string} type - Plant type
     * @param {number} x - X coordinate (if null, random value is used)
     * @param {number} y - Y coordinate (if null, uses bottom of ecosystem)
     */
    addPlant(type, x = null, y = null) {
        const plantX = x !== null ? x : Math.random() * this.width;
        const plantY = y !== null ? y : this.height;
        
        const plant = this.plantRegistry.createPlant(type, plantX, plantY);
        this.plants.push(plant);
    }

    /**
     * Clear all plants and seeds
     */
    clear() {
        this.plants = [];
        this.seeds = [];
    }

    /**
     * Update ecosystem dimensions
     * @param {number} width - New width
     * @param {number} height - New height
     */
    updateDimensions(width, height) {
        this.width = width;
        this.height = height;
        this.environment.setDimensions(width, height);
    }

    /**
     * Update plant distance settings
     * @param {string} type - Plant type
     * @param {number} distance - New distance value
     */
    updatePlantDistance(type, distance) {
        this.minDistances[type] = distance;
    }

    /**
     * Register a new plant type
     * @param {string} type - Plant type name
     * @param {class} plantClass - Plant class constructor
     */
    registerPlantType(type, plantClass) {
        this.plantRegistry.register(type, plantClass);
    }

    /**
     * Get weather object
     * @returns {Weather} Weather object
     */
    getWeather() {
        return this.environment.getWeather();
    }
}