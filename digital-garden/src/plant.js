class Plant {
    constructor(x, y, type = 'grass') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.height = 10;
        this.health = 100;
        
        // Set characteristics based on plant type
        switch(this.type) {
            case 'flower':
                this.maxHeight = 60 * (0.8 + Math.random() * 0.4);
                this.growthRate = 0.15 * (0.9 + Math.random() * 0.2);
                this.color = this.getRandomFlowerColor();
                this.width = 8;
                break;
            case 'tree':
                this.maxHeight = 200 * (0.85 + Math.random() * 0.3);
                this.growthRate = 0.05 * (0.9 + Math.random() * 0.2);
                this.color = this.getRandomTreeColor();
                this.width = 15 * (0.9 + Math.random() * 0.2);
                break;
            case 'grass':
            default:
                this.maxHeight = 100 * (0.7 + Math.random() * 0.6);
                this.growthRate = 0.1 * (0.9 + Math.random() * 0.2);
                this.color = this.getRandomGrassColor();
                this.width = 5;
                break;
        }
    }

    grow(weather) {
        if (this.height < this.maxHeight) {
            this.height += this.growthRate * weather.growthModifier;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
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

    getRandomFlowerColor() {
        const flowers = [
            '#FF69B4', // pink
            '#FF1493', // deep pink
            '#FFB6C1', // light pink
            '#FFA07A', // light salmon
            '#FF0000'  // red
        ];
        return flowers[Math.floor(Math.random() * flowers.length)];
    }

    getRandomTreeColor() {
        const r = 34 + Math.floor(Math.random() * 20);
        const g = 139 + Math.floor(Math.random() * 20);
        const b = 34 + Math.floor(Math.random() * 20);
        return `rgb(${r}, ${g}, ${b})`;
    }

    getRandomGrassColor() {
        const r = 50 + Math.floor(Math.random() * 20);
        const g = 205 + Math.floor(Math.random() * 50);
        const b = 50 + Math.floor(Math.random() * 20);
        return `rgb(${r}, ${g}, ${b})`;
    }
}
