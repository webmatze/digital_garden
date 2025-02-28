/**
 * Weather system for the Digital Garden simulation
 */
import { config } from '../config.js';
import { random, randomInt } from '../utils.js';

export class Weather {
    constructor() {
        this.conditions = Object.keys(config.weather.types);
        this.current = 'sunny';
        this.growthModifier = config.weather.types.sunny.growthModifier;
    }

    /**
     * Update weather conditions
     */
    update() {
        if (Math.random() < config.weather.changeChance) {
            this.current = this.conditions[randomInt(0, this.conditions.length - 1)];
            this.updateGrowthModifier();
        }
    }

    /**
     * Update plant growth modifier based on current weather
     */
    updateGrowthModifier() {
        this.growthModifier = config.weather.types[this.current].growthModifier;
    }

    /**
     * Draw weather effects on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} canvasWidth - Canvas width
     * @param {number} canvasHeight - Canvas height
     */
    draw(ctx, canvasWidth, canvasHeight) {
        switch(this.current) {
            case 'rainy':
                this.drawRain(ctx, canvasWidth, canvasHeight);
                break;
            case 'sunny':
                this.drawSun(ctx);
                break;
            case 'cloudy':
                this.drawClouds(ctx);
                break;
        }
    }

    /**
     * Draw rain effect
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} canvasWidth - Canvas width
     * @param {number} canvasHeight - Canvas height
     */
    drawRain(ctx, canvasWidth, canvasHeight) {
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        ctx.lineWidth = 1;
        const raindrops = config.weather.types.rainy.raindrops;
        
        for (let i = 0; i < raindrops; i++) {
            const x = random(0, canvasWidth);
            const y = random(0, canvasHeight);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 1, y + 10);
            ctx.stroke();
        }
    }

    /**
     * Draw sun effect
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    drawSun(ctx) {
        const sunX = 80;
        const sunY = 80;
        const sunRadius = 30;
        const rayLength = 10;
        const numRays = 8;
        
        // Draw sun circle
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw sun rays
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        for (let i = 0; i < numRays; i++) {
            const angle = (i * Math.PI) / (numRays / 2);
            ctx.beginPath();
            ctx.moveTo(
                sunX + Math.cos(angle) * (sunRadius + 10),
                sunY + Math.sin(angle) * (sunRadius + 10)
            );
            ctx.lineTo(
                sunX + Math.cos(angle) * (sunRadius + 10 + rayLength),
                sunY + Math.sin(angle) * (sunRadius + 10 + rayLength)
            );
            ctx.stroke();
        }
    }

    /**
     * Draw clouds effect
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    drawClouds(ctx) {
        ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
        // Draw clouds
        this.drawCloud(ctx, 60, 80, 30);
        this.drawCloud(ctx, 160, 60, 40);
    }

    /**
     * Draw a single cloud
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Cloud x position
     * @param {number} y - Cloud y position
     * @param {number} size - Cloud size
     */
    drawCloud(ctx, x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size, y, size * 0.8, 0, Math.PI * 2);
        ctx.arc(x + size/2, y - size/2, size * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}