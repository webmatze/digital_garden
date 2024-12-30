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
        document.getElementById('add-plant').addEventListener('click', () => {
            const x = Math.random() * this.canvas.width;
            const y = this.canvas.height;
            this.plants.push(new Plant(x, y));
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
        this.plants.forEach(plant => plant.grow(this.weather));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.plants.forEach(plant => plant.draw(this.ctx));
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
