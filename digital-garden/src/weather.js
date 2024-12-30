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
}
