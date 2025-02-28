/**
 * Configuration settings for the Digital Garden simulation
 */
export const config = {
    // Canvas settings
    canvas: {
        width: 800,
        height: 600
    },
    
    // Simulation settings
    simulation: {
        defaultSpeed: 1.0,
        minSpeed: 0.1,
        maxSpeed: 5.0
    },
    
    // Plant distance settings - minimum distance between plants
    plantDistances: {
        tree: 7,
        flower: 3,
        grass: 5
    },
    
    // Plant characteristics
    plants: {
        tree: {
            maxHeight: { base: 200, variance: 0.3 },
            growthRate: { base: 0.05, variance: 0.2 },
            width: { base: 15, variance: 0.2 },
            lifespan: { min: 8000, max: 10000 },
            numSeeds: { min: 3, max: 6 },
            seedDropDelay: { max: 500 },
            seedSpreadRadius: { min: 150, max: 200 }
        },
        
        flower: {
            maxHeight: { base: 60, variance: 0.4 },
            growthRate: { base: 0.15, variance: 0.2 },
            width: 8,
            lifespan: { min: 1000, max: 1500 },
            numSeeds: { min: 1, max: 2 },
            seedDropDelay: { max: 1000 },
            seedSpreadRadius: { min: 80, max: 120 },
            colors: [
                '#FF69B4', // pink
                '#FF1493', // deep pink
                '#FFB6C1', // light pink
                '#FFA07A', // light salmon
                '#FF0000'  // red
            ]
        },
        
        grass: {
            maxHeight: { base: 100, variance: 0.6 },
            growthRate: { base: 0.1, variance: 0.2 },
            width: 5,
            lifespan: { min: 2000, max: 3000 },
            numSeeds: { min: 2, max: 4 },
            seedDropDelay: { max: 300 },
            seedSpreadRadius: { min: 60, max: 90 }
        }
    },
    
    // Weather settings
    weather: {
        changeChance: 0.01,
        types: {
            sunny: {
                growthModifier: 1.0
            },
            rainy: {
                growthModifier: 1.5,
                raindrops: 100
            },
            cloudy: {
                growthModifier: 0.5,
                clouds: 2
            }
        }
    },
    
    // Colors for random generation
    colors: {
        tree: {
            r: { min: 34, max: 54 },
            g: { min: 139, max: 159 },
            b: { min: 34, max: 54 }
        },
        grass: {
            r: { min: 50, max: 70 },
            g: { min: 205, max: 255 },
            b: { min: 50, max: 70 }
        }
    }
};