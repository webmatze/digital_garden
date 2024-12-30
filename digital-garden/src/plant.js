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
                this.maxHeight = 60;
                this.growthRate = 0.15;
                this.color = '#FF69B4'; // pink
                this.width = 8;
                break;
            case 'tree':
                this.maxHeight = 200;
                this.growthRate = 0.05;
                this.color = '#228B22'; // forest green
                this.width = 15;
                break;
            case 'grass':
            default:
                this.maxHeight = 100;
                this.growthRate = 0.1;
                this.color = '#32CD32'; // lime green
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
}
