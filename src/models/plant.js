/**
 * Base Plant class for the Digital Garden simulation
 */
import { config } from '../config.js';
import { random, randomInt, fadeToTransparent, randomColor, hexToRgb } from '../utils.js';

export class Plant {
    /**
     * Create a new plant
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {string} type - Plant type (tree, flower, grass)
     */
    constructor(x, y, type = 'grass') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.height = 10;
        this.health = 100;
        this.age = 0;
        this.isDying = false;
        this.hasDroppedSeeds = false;
        
        // Get plant type config
        const plantConfig = config.plants[this.type];
        
        // Set characteristics based on plant type
        this.maxHeight = plantConfig.maxHeight.base * (0.8 + random(0, plantConfig.maxHeight.variance));
        this.growthRate = plantConfig.growthRate.base * (0.9 + random(0, plantConfig.growthRate.variance));
        this.width = typeof plantConfig.width === 'number' ? plantConfig.width : plantConfig.width.base * (0.9 + random(0, plantConfig.width.variance));
        this.lifespan = random(plantConfig.lifespan.min, plantConfig.lifespan.max);
        this.numSeeds = randomInt(plantConfig.numSeeds.min, plantConfig.numSeeds.max);
        this.seedDropDelay = random(0, plantConfig.seedDropDelay.max);
        
        // Set color based on plant type
        this.color = this.getColor();
    }

    /**
     * Get plant color based on type
     * @returns {string} Color string
     */
    getColor() {
        switch(this.type) {
            case 'flower':
                const flowers = config.plants.flower.colors;
                return flowers[randomInt(0, flowers.length - 1)];
            case 'tree':
                return randomColor(config.colors.tree);
            case 'grass':
            default:
                return randomColor(config.colors.grass);
        }
    }

    /**
     * Update plant growth
     * @param {Weather} weather - Current weather conditions
     * @returns {boolean} True if plant should be removed
     */
    grow(weather) {
        this.age++;
        
        // Normal growth phase
        if (this.height < this.maxHeight && !this.isDying) {
            this.height += this.growthRate * weather.growthModifier;
            
            // Add debug log when reaching maturity
            if (this.height >= this.maxHeight * 0.95 && !this.hasDroppedSeeds) {
                console.log(`Plant reached maturity: ${this.type}`);
            }
        }
        
        // Start dying when reaching lifespan
        if (this.age >= this.lifespan) {
            this.isDying = true;
        }
        
        // Return true if plant should be removed
        return this.isDying && this.getFadeProgress() >= 1;
    }

    /**
     * Get plant fade progress
     * @returns {number} Fade progress (0-1)
     */
    getFadeProgress() {
        const fadeLength = this.lifespan * 0.2; // Fade over 20% of lifespan
        return Math.min(1, (this.age - this.lifespan) / fadeLength);
    }

    /**
     * Draw plant on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        // Calculate fade to transparent
        let currentColor = this.color;
        if (this.isDying) {
            currentColor = fadeToTransparent(this.color, this.getFadeProgress());
        }
        
        ctx.fillStyle = currentColor;
        
        if (this.type === 'flower' && this.height >= this.maxHeight * 0.8) {
            // Draw flower petals
            ctx.beginPath();
            ctx.arc(this.x, this.y - this.height, 8, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'tree' && this.height >= this.maxHeight * 0.5) {
            // Draw tree crown
            ctx.beginPath();
            ctx.arc(this.x, this.y - this.height, 20, 0, Math.PI * 2);
            ctx.fill();
        }
        // Draw stem/trunk
        ctx.fillRect(this.x - this.width/2, this.y - this.height, this.width, this.height);
    }

    /**
     * Generate seeds for reproduction
     * @returns {Array} Array of seed objects
     */
    dropSeeds() {
        if (this.hasDroppedSeeds) return [];
        
        // Check conditions for dropping seeds
        const isFullyGrown = this.height >= this.maxHeight * 0.95;
        const isReadyToDrop = this.age > this.seedDropDelay;
        
        if (isFullyGrown && !this.isDying && isReadyToDrop) {
            console.log(`Dropping seeds: 
                Type: ${this.type}
                Height: ${this.height.toFixed(1)}/${this.maxHeight.toFixed(1)}
                Age: ${this.age}
                Seeds: ${this.numSeeds}`);
            
            this.hasDroppedSeeds = true;
            const seeds = [];
            const plantConfig = config.plants[this.type];
            
            // Generate seeds
            for (let i = 0; i < this.numSeeds; i++) {
                const minRadius = plantConfig.seedSpreadRadius.min;
                const maxRadius = plantConfig.seedSpreadRadius.max;
                const spreadRadius = random(minRadius, maxRadius);
                const angle = random(0, Math.PI * 2);
                const distance = random(0, spreadRadius);
                
                const seedX = this.x + Math.cos(angle) * distance;
                const seedY = this.y;
                
                seeds.push({
                    x: seedX,
                    y: seedY,
                    type: this.type,
                    delay: randomInt(0, 1000)
                });
            }
            
            return seeds;
        }
        
        return [];
    }
}