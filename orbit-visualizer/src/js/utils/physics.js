// This file contains utility functions related to physics calculations for the orbit visualizer.

export function gravitationalForce(m1, m2, distance) {
    const G = 6.67430e-11; // gravitational constant
    return (G * m1 * m2) / (distance * distance);
}

export function calculateAcceleration(force, mass) {
    return force / mass;
}

export function calculateVelocity(initialVelocity, acceleration, time) {
    return initialVelocity + acceleration * time;
}

export function calculatePosition(initialPosition, velocity, time) {
    return initialPosition + velocity * time;
}