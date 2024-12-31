class Plant {
    constructor(x, y, type = 'grass') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.height = 10;
        this.health = 100;
        this.age = 0;
        this.isDying = false;
        this.hasDroppedSeeds = false;
        this.seedDropDelay = Math.random() * 500; // Random delay after reaching maturity
        
        // Set characteristics based on plant type
        switch(this.type) {
            case 'flower':
                this.maxHeight = 60 * (0.8 + Math.random() * 0.4);
                this.growthRate = 0.15 * (0.9 + Math.random() * 0.2);
                this.color = this.getRandomFlowerColor();
                this.width = 8;
                this.lifespan = 1000 + Math.random() * 500; // About 1000-1500 frames
                this.numSeeds = Math.floor(1 + Math.random() * 2); // 1-2 seeds
                this.seedDropDelay = Math.random() * 1000; // Longer delay for flowers
                break;
            case 'tree':
                this.maxHeight = 200 * (0.85 + Math.random() * 0.3);
                this.growthRate = 0.05 * (0.9 + Math.random() * 0.2);
                this.color = this.getRandomTreeColor();
                this.width = 15 * (0.9 + Math.random() * 0.2);
                this.lifespan = 8000 + Math.random() * 2000; // About 8000-10000 frames
                this.numSeeds = Math.floor(3 + Math.random() * 4); // 3-6 seeds
                this.seedDropDelay = Math.random() * 500; // Medium delay
                break;
            case 'grass':
            default:
                this.maxHeight = 100 * (0.7 + Math.random() * 0.6);
                this.growthRate = 0.1 * (0.9 + Math.random() * 0.2);
                this.color = this.getRandomGrassColor();
                this.width = 5;
                this.lifespan = 2000 + Math.random() * 1000; // About 2000-3000 frames
                this.numSeeds = Math.floor(2 + Math.random() * 3); // 2-4 seeds
                this.seedDropDelay = Math.random() * 300; // Shorter delay for grass
                break;
        }
    }

    grow(weather) {
        this.age++;
        
        // Normal growth phase
        if (this.height < this.maxHeight && !this.isDying) {
            this.height += this.growthRate * weather.growthModifier;
            // Add debug log when reaching maturity
            if (this.height >= this.maxHeight * 0.95 && !this.hasDroppedSeeds) {
                console.log(`Plant reached maturity: ${this.type}`);
            }
        }
        
        // Start dying when reaching lifespan
        if (this.age >= this.lifespan) {
            this.isDying = true;
        }
        
        return this.isDying && this.getFadeProgress() >= 1;
    }

    getFadeProgress() {
        const fadeLength = this.lifespan * 0.2; // Fade over 20% of lifespan
        return Math.min(1, (this.age - this.lifespan) / fadeLength);
    }

    draw(ctx) {
        // Calculate fade to white
        let currentColor = this.color;
        if (this.isDying) {
            currentColor = this.fadeToTransparent(this.color, this.getFadeProgress());
        }
        
        ctx.fillStyle = currentColor;
        
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

    fadeToTransparent(color, progress) {
        // Handle hex colors
        if (color.startsWith('#')) {
            color = this.hexToRgb(color);
        }
        // Handle rgb colors
        const rgb = color.match(/\d+/g).map(Number);
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${1 - progress})`
    }

    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r},${g},${b})`;
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

    dropSeeds() {
        if (this.hasDroppedSeeds) return [];
        
        // Add debug logging to check conditions
        const isFullyGrown = this.height >= this.maxHeight * 0.95;
        const isReadyToDrop = this.age > this.seedDropDelay;
        
        if (isFullyGrown && !this.isDying && isReadyToDrop) {
            console.log(`Dropping seeds: 
                Type: ${this.type}
                Height: ${this.height}/${this.maxHeight}
                Age: ${this.age}
                Seeds: ${this.numSeeds}`);
            
            this.hasDroppedSeeds = true;
            const seeds = [];
            
            const getSpreadRadius = (type) => {
                switch(type) {
                    case 'tree': return 150 + Math.random() * 50; // 150-200 units
                    case 'flower': return 80 + Math.random() * 40; // 80-120 units
                    case 'grass': return 60 + Math.random() * 30; // 60-90 units
                    default: return 50;
                }
            };

            for (let i = 0; i < this.numSeeds; i++) {
                const spreadRadius = getSpreadRadius(this.type);
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * spreadRadius;
                
                const seedX = this.x + Math.cos(angle) * distance;
                const seedY = this.y;
                
                seeds.push({
                    x: seedX,
                    y: seedY,
                    type: this.type,
                    delay: Math.floor(Math.random() * 1000) // Make sure delay is an integer
                });
            }
            
            return seeds;
        }
        
        return [];
    }
}
