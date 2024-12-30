class Weather {
    constructor() {
        this.conditions = ['sunny', 'rainy', 'cloudy'];
        this.current = 'sunny';
        this.growthModifier = 1.0;
    }

    update() {
        if (Math.random() < 0.01) {
            this.current = this.conditions[Math.floor(Math.random() * this.conditions.length)];
            this.updateGrowthModifier();
        }
    }

    updateGrowthModifier() {
        switch(this.current) {
            case 'sunny':
                this.growthModifier = 1.0;
                break;
            case 'rainy':
                this.growthModifier = 1.5;
                break;
            case 'cloudy':
                this.growthModifier = 0.5;
                break;
        }
    }

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

    drawRain(ctx, canvasWidth, canvasHeight) {
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvasWidth;
            const y = Math.random() * canvasHeight;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 1, y + 10);
            ctx.stroke();
        }
    }

    drawSun(ctx) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(80, 80, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw sun rays
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            ctx.beginPath();
            ctx.moveTo(
                80 + Math.cos(angle) * 40,
                80 + Math.sin(angle) * 40
            );
            ctx.lineTo(
                80 + Math.cos(angle) * 50,
                80 + Math.sin(angle) * 50
            );
            ctx.stroke();
        }
    }

    drawClouds(ctx) {
        ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
        // Draw a simple cloud shape
        this.drawCloud(ctx, 60, 80, 30);
        this.drawCloud(ctx, 160, 60, 40);
    }

    drawCloud(ctx, x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size, y, size * 0.8, 0, Math.PI * 2);
        ctx.arc(x + size/2, y - size/2, size * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}
