/**
 * Plant Factory for creating different plant types
 */
import { Plant } from './plant.js';

/**
 * Factory for creating plant instances
 */
export class PlantFactory {
    constructor() {
        this.plantTypes = {
            'grass': Plant,
            'flower': Plant,
            'tree': Plant
        };
    }

    /**
     * Register a new plant type
     * @param {string} type - Plant type name
     * @param {class} plantClass - Plant class constructor
     */
    registerPlantType(type, plantClass) {
        this.plantTypes[type] = plantClass;
    }

    /**
     * Create a new plant
     * @param {string} type - Plant type
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Plant} New plant instance
     */
    createPlant(type, x, y) {
        if (!this.plantTypes[type]) {
            console.warn(`Plant type '${type}' not registered, using default Plant class`);
            return new Plant(x, y, type);
        }
        
        return new this.plantTypes[type](x, y, type);
    }

    /**
     * Get list of available plant types
     * @returns {Array} List of registered plant types
     */
    getPlantTypes() {
        return Object.keys(this.plantTypes);
    }
}