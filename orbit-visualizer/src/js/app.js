// This file serves as the entry point for the JavaScript application.
// It initializes the canvas, sets up the simulation, and handles user interactions.

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let simulation;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    simulation = new OrbitSimulation(ctx);
    simulation.start();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', handleCanvasClick);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    simulation.resize();
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    simulation.addBody(x, y);
}

window.onload = init;