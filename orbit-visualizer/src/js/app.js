import { OrbitSimulation } from './OrbitSimulation.js';
import { Renderer } from './Renderer.js';

console.log("App module loaded");

let canvas;
let simulation;
let renderer;
let animationId;

function init() {
    console.log("Init function called");
    
    // Get canvas element after DOM is loaded
    canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    
    console.log("Canvas found:", canvas);
    
    // Set canvas to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "#111"; // Debug: make sure canvas is visible
    
    // Create simulation and renderer
    try {
        simulation = new OrbitSimulation();
        console.log("Simulation created");
        
        renderer = new Renderer('canvas');
        console.log("Renderer created");
        
        // Start animation loop
        startAnimation();
        
        // Setup event handlers
        window.addEventListener('resize', resizeCanvas);
        
        // Setup control buttons with error checking
        setupButtons();
    } catch (error) {
        console.error("Error during initialization:", error);
    }
}

function setupButtons() {
    console.log("Setting up buttons");
    const increaseBtn = document.getElementById('increaseVelocity');
    const decreaseBtn = document.getElementById('decreaseVelocity');
    const resetBtn = document.getElementById('resetSimulation');
    
    if (!increaseBtn || !decreaseBtn || !resetBtn) {
        console.error("One or more buttons not found!");
        return;
    }
    
    console.log("All buttons found");
    
    increaseBtn.addEventListener('click', () => {
        console.log("Increasing velocity");
        simulation.increaseVelocity();
    });
    
    decreaseBtn.addEventListener('click', () => {
        console.log("Decreasing velocity");
        simulation.decreaseVelocity();
    });
    
    resetBtn.addEventListener('click', () => {
        console.log("Resetting simulation");
        simulation.reset();
        renderer.resetTrail();
    });
}

function startAnimation() {
    console.log("Starting animation");
    function animate() {
        simulation.update();
        renderer.render(simulation);
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.updateDimensions();
}

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', init);
console.log("DOMContentLoaded event listener added");