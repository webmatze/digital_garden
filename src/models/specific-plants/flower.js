/**
 * Flower plant class for the Digital Garden simulation
 */
import { Plant } from '../plant.js';
import { config } from '../../config.js';
import { random, randomInt, fadeToTransparent } from '../../utils.js';

export class Flower extends Plant {
    /**
     * Create a new flower
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    constructor(x, y) {
        super(x, y, 'flower');
        
        // Override with flower-specific attributes
        const flowerColors = config.plants.flower.colors;
        this.color = flowerColors[randomInt(0, flowerColors.length - 1)];
        this.petalSize = 8 * (0.8 + random(0, 0.4));
        this.numPetals = randomInt(5, 8);
        this.stemColor = 'rgb(50, 150, 50)';
    }

    /**
     * Draw flower on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        let stemColor = this.stemColor;
        let petalColor = this.color;
        
        // Apply fading if dying
        if (this.isDying) {
            const fadeProgress = this.getFadeProgress();
            stemColor = fadeToTransparent(this.stemColor, fadeProgress);
            petalColor = fadeToTransparent(this.color, fadeProgress);
        }
        
        // Draw stem
        ctx.fillStyle = stemColor;
        ctx.fillRect(this.x - this.width/2, this.y - this.height, this.width, this.height);
        
        // Draw flower petals if tall enough
        if (this.height >= this.maxHeight * 0.8) {
            ctx.fillStyle = petalColor;
            
            // Draw petals
            const centerX = this.x;
            const centerY = this.y - this.height;
            
            // Draw simple circle for now
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.petalSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw center
            ctx.fillStyle = 'rgb(255, 255, 0)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.petalSize * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}