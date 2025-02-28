/**
 * UI Controller for the Digital Garden simulation
 */
import { config } from '../config.js';
import { EventEmitter } from '../utils.js';

export class UIController extends EventEmitter {
    constructor() {
        super();
        this.setupEventListeners();
        this.plantTypes = ['grass', 'flower', 'tree'];
        this.currentPlantType = 0;
    }

    /**
     * Set up event listeners for UI controls
     */
    setupEventListeners() {
        // Speed control
        document.getElementById('time-speed').addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            document.getElementById('speed-value').textContent = `${speed.toFixed(1)}x`;
            this.emit('speed-change', speed);
        });

        // Distance sliders
        document.getElementById('tree-distance').addEventListener('input', (e) => {
            const distance = parseInt(e.target.value);
            document.getElementById('tree-distance-value').textContent = distance;
            this.emit('distance-change', { type: 'tree', distance });
        });

        document.getElementById('flower-distance').addEventListener('input', (e) => {
            const distance = parseInt(e.target.value);
            document.getElementById('flower-distance-value').textContent = distance;
            this.emit('distance-change', { type: 'flower', distance });
        });

        document.getElementById('grass-distance').addEventListener('input', (e) => {
            const distance = parseInt(e.target.value);
            document.getElementById('grass-distance-value').textContent = distance;
            this.emit('distance-change', { type: 'grass', distance });
        });

        // Add plant button
        document.getElementById('add-plant').addEventListener('click', () => {
            const plantType = this.plantTypes[this.currentPlantType];
            this.emit('add-plant', { type: plantType });
            // Cycle through plant types
            this.currentPlantType = (this.currentPlantType + 1) % this.plantTypes.length;
        });

        // Clear garden button
        document.getElementById('clear-garden').addEventListener('click', () => {
            this.emit('clear-garden');
        });

        // Resize event
        window.addEventListener('resize', () => {
            this.emit('resize');
        });
    }

    /**
     * Update UI controls to match current settings
     * @param {Object} settings - Current simulation settings
     */
    updateControls(settings) {
        // Update speed slider
        document.getElementById('time-speed').value = settings.timeSpeed;
        document.getElementById('speed-value').textContent = `${settings.timeSpeed.toFixed(1)}x`;
        
        // Update distance sliders
        document.getElementById('tree-distance').value = settings.minDistances.tree;
        document.getElementById('tree-distance-value').textContent = settings.minDistances.tree;
        
        document.getElementById('flower-distance').value = settings.minDistances.flower;
        document.getElementById('flower-distance-value').textContent = settings.minDistances.flower;
        
        document.getElementById('grass-distance').value = settings.minDistances.grass;
        document.getElementById('grass-distance-value').textContent = settings.minDistances.grass;
    }
}