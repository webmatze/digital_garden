/**
 * Environment class for managing terrain and environmental conditions
 */
import { Weather } from './weather.js';

export class Environment {
    /**
     * Create a new environment
     * @param {number} width - Environment width
     * @param {number} height - Environment height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.weather = new Weather();
        
        // Default background color
        this.backgroundColor = 'rgba(135, 206, 235, 0.2)';
    }

    /**
     * Update environment state
     */
    update() {
        this.weather.update();
    }

    /**
     * Draw environment on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        // Draw background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw weather effects
        this.weather.draw(ctx, this.width, this.height);
    }

    /**
     * Get current weather conditions
     * @returns {Weather} Weather object
     */
    getWeather() {
        return this.weather;
    }

    /**
     * Set environment dimensions
     * @param {number} width - New width
     * @param {number} height - New height
     */
    setDimensions(width, height) {
        this.width = width;
        this.height = height;
    }
}