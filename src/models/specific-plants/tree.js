/**
 * Tree plant class for the Digital Garden simulation
 */
import { Plant } from '../plant.js';
import { config } from '../../config.js';
import { random, randomInt, randomColor, fadeToTransparent } from '../../utils.js';

export class Tree extends Plant {
    /**
     * Create a new tree
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    constructor(x, y) {
        super(x, y, 'tree');
        
        // Override with tree-specific attributes
        this.crownSize = 20 * (0.9 + random(0, 0.2));
        this.trunkColor = this.getTrunkColor();
        this.leafColor = this.getLeafColor();
    }

    /**
     * Draw tree on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        let trunkColor = this.trunkColor;
        let leafColor = this.leafColor;
        
        // Apply fading if dying
        if (this.isDying) {
            const fadeProgress = this.getFadeProgress();
            trunkColor = fadeToTransparent(this.trunkColor, fadeProgress);
            leafColor = fadeToTransparent(this.leafColor, fadeProgress);
        }
        
        // Draw trunk
        ctx.fillStyle = trunkColor;
        ctx.fillRect(this.x - this.width/2, this.y - this.height, this.width, this.height);
        
        // Draw crown if tall enough
        if (this.height >= this.maxHeight * 0.5) {
            ctx.fillStyle = leafColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y - this.height, this.crownSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /**
     * Get random trunk color
     * @returns {string} RGB color string
     */
    getTrunkColor() {
        const r = randomInt(80, 120);
        const g = randomInt(40, 80);
        const b = randomInt(0, 40);
        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Get random leaf color
     * @returns {string} RGB color string
     */
    getLeafColor() {
        return randomColor(config.colors.tree);
    }
}