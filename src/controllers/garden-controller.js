/**
 * Garden Controller for the Digital Garden simulation
 */
import { config } from '../config.js';
import { Ecosystem } from '../models/ecosystem.js';

export class GardenController {
    /**
     * Create a new garden controller
     * @param {HTMLCanvasElement} canvas - Canvas element
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.timeSpeed = config.simulation.defaultSpeed;
        
        // Set up canvas
        this.setupCanvas();
        
        // Create ecosystem
        this.ecosystem = new Ecosystem(this.canvas.width, this.canvas.height);
    }

    /**
     * Set up canvas dimensions
     */
    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    /**
     * Handle resize event
     */
    handleResize() {
        this.setupCanvas();
        this.ecosystem.updateDimensions(this.canvas.width, this.canvas.height);
    }

    /**
     * Add a new plant to the garden
     * @param {string} type - Plant type
     */
    addPlant(type) {
        this.ecosystem.addPlant(type);
    }

    /**
     * Clear all plants and seeds from the garden
     */
    clearGarden() {
        this.ecosystem.clear();
    }

    /**
     * Update plant distances
     * @param {string} type - Plant type
     * @param {number} distance - New distance value
     */
    updatePlantDistance(type, distance) {
        this.ecosystem.updatePlantDistance(type, distance);
    }

    /**
     * Update simulation speed
     * @param {number} speed - New speed value
     */
    updateSpeed(speed) {
        this.timeSpeed = speed;
    }

    /**
     * Get current simulation settings
     * @returns {Object} Current settings
     */
    getSettings() {
        return {
            timeSpeed: this.timeSpeed,
            minDistances: { ...config.plantDistances }
        };
    }

    /**
     * Update garden simulation
     */
    update() {
        // Run multiple updates based on simulation speed
        for (let i = 0; i < this.timeSpeed; i++) {
            this.ecosystem.update();
        }
    }

    /**
     * Draw garden on canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ecosystem.draw(this.ctx);
    }

    /**
     * Register a new plant type
     * @param {string} type - Plant type name
     * @param {class} plantClass - Plant class constructor
     */
    registerPlantType(type, plantClass) {
        this.ecosystem.registerPlantType(type, plantClass);
    }
}