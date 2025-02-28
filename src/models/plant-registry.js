/**
 * Plant Registry for managing plant types
 */
import { Plant } from './plant.js';
import { Tree } from './specific-plants/tree.js';
import { Flower } from './specific-plants/flower.js';
import { Grass } from './specific-plants/grass.js';

export class PlantRegistry {
    constructor() {
        this.plantTypes = {
            'tree': Tree,
            'flower': Flower,
            'grass': Grass
        };
        
        // Default fallback
        this.defaultPlantClass = Plant;
    }

    /**
     * Register a new plant type
     * @param {string} type - Plant type name
     * @param {class} plantClass - Plant class constructor
     */
    register(type, plantClass) {
        this.plantTypes[type] = plantClass;
    }

    /**
     * Get plant class by type
     * @param {string} type - Plant type
     * @returns {class} Plant class constructor
     */
    getPlantClass(type) {
        return this.plantTypes[type] || this.defaultPlantClass;
    }

    /**
     * Create a new plant instance
     * @param {string} type - Plant type
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Plant} Plant instance
     */
    createPlant(type, x, y) {
        const PlantClass = this.getPlantClass(type);
        return new PlantClass(x, y);
    }

    /**
     * Check if a plant type is registered
     * @param {string} type - Plant type
     * @returns {boolean} True if type is registered
     */
    isTypeRegistered(type) {
        return type in this.plantTypes;
    }

    /**
     * Get all registered plant types
     * @returns {Array} Array of plant type names
     */
    getRegisteredTypes() {
        return Object.keys(this.plantTypes);
    }
}