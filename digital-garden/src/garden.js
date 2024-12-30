class Garden {
    constructor() {
        this.canvas = document.getElementById('garden-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.plants = [];
        this.weather = new Weather();
        
        this.setupCanvas();
        this.setupEventListeners();
        this.startSimulation();
    }

    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    setupEventListeners() {
        const plantTypes = ['grass', 'flower', 'tree'];
        let currentPlantType = 0;

        document.getElementById('add-plant').addEventListener('click', () => {
            const x = Math.random() * this.canvas.width;
            const y = this.canvas.height;
            this.plants.push(new Plant(x, y, plantTypes[currentPlantType]));
            // Cycle through plant types
            currentPlantType = (currentPlantType + 1) % plantTypes.length;
        });

        document.getElementById('toggle-weather').addEventListener('click', () => {
            const conditions = this.weather.conditions;
            const currentIndex = conditions.indexOf(this.weather.current);
            const nextIndex = (currentIndex + 1) % conditions.length;
            this.weather.current = conditions[nextIndex];
            this.weather.updateGrowthModifier();
        });
    }

    update() {
        this.weather.update();
        
        // Create array for new seeds
        let newSeeds = [];
        
        // Update plants and collect seeds
        this.plants = this.plants.filter(plant => {
            const seeds = plant.dropSeeds();
            newSeeds = newSeeds.concat(seeds);
            return !plant.grow(this.weather);
        });
        
        // Add new plants from seeds that are ready to germinate
        newSeeds.forEach(seed => {
            if (seed.delay <= 0) {
                // Check if the position is within canvas bounds
                if (seed.x >= 0 && seed.x <= this.canvas.width) {
                    this.plants.push(new Plant(seed.x, seed.y, seed.type));
                }
            } else {
                seed.delay--;
            }
        });
        
        // Keep viable seeds for next update
        this.seeds = newSeeds.filter(seed => seed.delay > 0);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background (optional - adds a slight blue tint to the sky)
        this.ctx.fillStyle = 'rgba(135, 206, 235, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw plants
        this.plants.forEach(plant => plant.draw(this.ctx));
        
        // Draw weather effects on top
        this.weather.draw(this.ctx, this.canvas.width, this.canvas.height);
    }

    startSimulation() {
        const gameLoop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }
}

// Start the garden simulation when the page loads
window.addEventListener('load', () => {
    new Garden();
});
