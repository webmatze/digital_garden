class Garden {
    constructor() {
        this.canvas = document.getElementById('garden-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.plants = [];
        this.seeds = [];
        this.weather = new Weather();
        this.timeSpeed = 1;
        
        // Add minimum distances for different plant types
        this.minDistances = {
            tree: 7,     // Changed from 15
            flower: 3,   // Changed from 9
            grass: 5     // Kept at 5
        };
        
        this.setupCanvas();
        this.setupEventListeners();
        this.startSimulation();
    }

    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    isPositionAvailable(x, y, minDistance = 30) {
        return !this.plants.some(plant => {
            // Calculate base distance between plants
            const distance = Math.sqrt(
                Math.pow(plant.x - x, 2) + 
                Math.pow(plant.y - y, 2)
            );
            
            // Adjust minimum distance based on plant types
            let requiredDistance = minDistance;
            
            // If either plant is grass, reduce the required distance
            if (plant.type === 'grass' || plant.type === 'flower') {
                requiredDistance *= 0.7; // Reduce minimum distance by 30%
            }
            
            return distance < requiredDistance;
        });
    }

    setupEventListeners() {
        const plantTypes = ['grass', 'flower', 'tree'];
        let currentPlantType = 0;

        document.getElementById('time-speed').addEventListener('input', (e) => {
            this.timeSpeed = parseFloat(e.target.value);
            document.getElementById('speed-value').textContent = `${this.timeSpeed.toFixed(1)}x`;
        });

        // Distance sliders
        document.getElementById('tree-distance').addEventListener('input', (e) => {
            this.minDistances.tree = parseInt(e.target.value);
            document.getElementById('tree-distance-value').textContent = this.minDistances.tree;
        });

        document.getElementById('flower-distance').addEventListener('input', (e) => {
            this.minDistances.flower = parseInt(e.target.value);
            document.getElementById('flower-distance-value').textContent = this.minDistances.flower;
        });

        document.getElementById('grass-distance').addEventListener('input', (e) => {
            this.minDistances.grass = parseInt(e.target.value);
            document.getElementById('grass-distance-value').textContent = this.minDistances.grass;
        });

        document.getElementById('add-plant').addEventListener('click', () => {
            const x = Math.random() * this.canvas.width;
            const y = this.canvas.height;
            this.plants.push(new Plant(x, y, plantTypes[currentPlantType]));
            // Cycle through plant types
            currentPlantType = (currentPlantType + 1) % plantTypes.length;
        });

        document.getElementById('clear-garden').addEventListener('click', () => {
            this.plants = [];
            this.seeds = [];
        });
    }

    update() {
        for (let i = 0; i < this.timeSpeed; i++) {
            this.weather.update();
            
            // Update existing seeds
            this.seeds = this.seeds.map(seed => {
                seed.delay--;
                return seed;
            });
            
            // Create new plants from ready seeds
            const readySeeds = this.seeds.filter(seed => seed.delay <= 0);
            readySeeds.forEach(seed => {
                if (seed.x >= 0 && 
                    seed.x <= this.canvas.width && 
                    this.isPositionAvailable(seed.x, seed.y, this.minDistances[seed.type])) {
                    this.plants.push(new Plant(seed.x, seed.y, seed.type));
                }
            });
            
            // Keep only unready seeds
            this.seeds = this.seeds.filter(seed => seed.delay > 0);
            
            // Update plants and collect new seeds
            this.plants = this.plants.filter(plant => {
                const newSeeds = plant.dropSeeds();
                if (newSeeds.length > 0) {
                    console.log(`Plant at (${plant.x}, ${plant.y}) dropped ${newSeeds.length} seeds`);
                    this.seeds = this.seeds.concat(newSeeds);
                }
                return !plant.grow(this.weather);
            });
        }
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
