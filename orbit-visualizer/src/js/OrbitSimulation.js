import { Vector2D } from './utils/vector.js';
import { gravitationalForce, calculateAcceleration } from './utils/physics.js';

export class OrbitSimulation {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.star = {
            position: new Vector2D(0, 0),
            mass: 1.989e30
        };
        
        this.planet = {
            position: new Vector2D(150, 0),
            velocity: new Vector2D(0, 29.8),
            mass: 5.972e24
        };
        
        this.timeStep = 0.1;
        this.scaleFactor = 1e9;
    }
    
    update() {
        const distanceVector = this.planet.position.subtract(this.star.position);
        const distance = distanceVector.magnitude();
        
        const force = gravitationalForce(this.star.mass, this.planet.mass, distance);
        const direction = distanceVector.normalize();
        const acceleration = calculateAcceleration(force, this.planet.mass);
        const accelerationVector = direction.multiply(-acceleration / this.scaleFactor);
        
        this.planet.velocity = this.planet.velocity.add(accelerationVector.multiply(this.timeStep));
        this.planet.position = this.planet.position.add(this.planet.velocity.multiply(this.timeStep));
    }
    
    increaseVelocity(factor = 1.1) {
        this.planet.velocity = this.planet.velocity.multiply(factor);
    }
    
    decreaseVelocity(factor = 0.9) {
        this.planet.velocity = this.planet.velocity.multiply(factor);
    }
}
