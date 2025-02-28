/**
 * Seed class for plant reproduction
 */
import { random, randomInt } from '../utils.js';
import { config } from '../config.js';

export class Seed {
    /**
     * Create a new seed
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {string} type - Plant type
     * @param {number} delay - Growth delay in frames
     */
    constructor(x, y, type, delay = null) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.delay = delay !== null ? delay : randomInt(0, 1000);
        this.isReady = false;
    }

    /**
     * Create seeds from a parent plant
     * @param {Plant} plant - Parent plant
     * @returns {Array} Array of Seed instances
     */
    static createFromPlant(plant) {
        if (!plant.hasDroppedSeeds && plant.height >= plant.maxHeight * 0.95 && 
            !plant.isDying && plant.age > plant.seedDropDelay) {
            
            const seeds = [];
            const plantConfig = config.plants[plant.type];
            const numSeeds = plant.numSeeds;
            
            for (let i = 0; i < numSeeds; i++) {
                const minRadius = plantConfig.seedSpreadRadius.min;
                const maxRadius = plantConfig.seedSpreadRadius.max;
                const spreadRadius = random(minRadius, maxRadius);
                const angle = random(0, Math.PI * 2);
                const distance = random(0, spreadRadius);
                
                const seedX = plant.x + Math.cos(angle) * distance;
                const seedY = plant.y;
                const delay = randomInt(0, 1000);
                
                seeds.push(new Seed(seedX, seedY, plant.type, delay));
            }
            
            return seeds;
        }
        
        return [];
    }

    /**
     * Update seed status
     * @returns {boolean} True if seed is ready to grow
     */
    update() {
        if (this.delay > 0) {
            this.delay--;
        }
        
        if (this.delay <= 0 && !this.isReady) {
            this.isReady = true;
            return true;
        }
        
        return false;
    }

    /**
     * Check if seed is ready to grow
     * @returns {boolean} True if seed is ready
     */
    isReadyToGrow() {
        return this.isReady;
    }
}