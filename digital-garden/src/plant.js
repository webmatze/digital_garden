class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 10;
        this.maxHeight = 100;
        this.growthRate = 0.1;
        this.health = 100;
    }

    grow(weather) {
        if (this.height < this.maxHeight) {
            this.height += this.growthRate * weather.growthModifier;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - this.height, 5, this.height);
    }
}
