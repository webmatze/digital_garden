/**
 * Grass plant class for the Digital Garden simulation
 */
import { Plant } from '../plant.js';
import { config } from '../../config.js';
import { random, randomInt, randomColor, fadeToTransparent } from '../../utils.js';

export class Grass extends Plant {
    /**
     * Create a new grass plant
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    constructor(x, y) {
        super(x, y, 'grass');
        
        // Override with grass-specific attributes
        this.color = randomColor(config.colors.grass);
        this.blades = randomInt(1, 3);
        this.swayAmount = random(0, 5);
        this.swayOffset = random(0, Math.PI * 2);
    }

    /**
     * Draw grass on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        let grassColor = this.color;
        
        // Apply fading if dying
        if (this.isDying) {
            grassColor = fadeToTransparent(this.color, this.getFadeProgress());
        }
        
        ctx.fillStyle = grassColor;
        
        // Calculate blade sway
        const sway = Math.sin(Date.now() / 1000 + this.swayOffset) * this.swayAmount;
        
        // Draw main blade
        ctx.fillRect(this.x - this.width/2, this.y - this.height, this.width, this.height);
        
        // Draw additional blades if grass is tall enough
        if (this.height >= this.maxHeight * 0.5 && this.blades > 1) {
            // Left blade
            ctx.fillRect(
                this.x - this.width*1.5 + sway, 
                this.y - this.height * 0.9, 
                this.width * 0.8, 
                this.height * 0.9
            );
            
            // Right blade (if needed)
            if (this.blades > 2) {
                ctx.fillRect(
                    this.x + this.width*0.7 - sway, 
                    this.y - this.height * 0.85, 
                    this.width * 0.8, 
                    this.height * 0.85
                );
            }
        }
    }
}