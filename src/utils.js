/**
 * Utility functions for the Digital Garden simulation
 */

/**
 * Generate a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
export function random(min, max) {
    return min + Math.random() * (max - min);
}

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer between min and max
 */
export function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

/**
 * Calculate distance between two points
 * @param {number} x1 - X coordinate of first point
 * @param {number} y1 - Y coordinate of first point
 * @param {number} x2 - X coordinate of second point
 * @param {number} y2 - Y coordinate of second point
 * @returns {number} Distance between points
 */
export function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Generate a random color in RGB format
 * @param {Object} colorRange - Object containing min/max values for r, g, b
 * @returns {string} RGB color string
 */
export function randomColor(colorRange) {
    const r = randomInt(colorRange.r.min, colorRange.r.max);
    const g = randomInt(colorRange.g.min, colorRange.g.max);
    const b = randomInt(colorRange.b.min, colorRange.b.max);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convert hex color to rgb format
 * @param {string} hex - Hex color string (e.g. #FF0000)
 * @returns {string} RGB color string (e.g. rgb(255,0,0))
 */
export function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r},${g},${b})`;
}

/**
 * Fade color to transparent
 * @param {string} color - Color string (hex or rgb)
 * @param {number} progress - Progress of fade (0 to 1)
 * @returns {string} RGBA color string with adjusted transparency
 */
export function fadeToTransparent(color, progress) {
    // Handle hex colors
    if (color.startsWith('#')) {
        color = hexToRgb(color);
    }
    // Handle rgb colors
    const rgb = color.match(/\d+/g).map(Number);
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${1 - progress})`;
}

/**
 * Event emitter for component communication
 */
export class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    /**
     * Unsubscribe from an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    /**
     * Emit an event
     * @param {string} event - Event name
     * @param {any} data - Event data
     */
    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    }
}