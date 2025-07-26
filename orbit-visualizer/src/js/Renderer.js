export class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas dimensions
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        
        // Trail for the planet's orbit
        this.orbitTrail = [];
        this.maxTrailLength = 1000;
        this.scale = 1;
        
        console.log("Renderer initialized");
    }
    
    updateDimensions() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }
    
    resetTrail() {
        this.orbitTrail = [];
    }
    
    render(simulation) {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw star (sun)
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.beginPath();
        this.ctx.arc(
            this.centerX, 
            this.centerY, 
            10, 
            0, 
            Math.PI * 2
        );
        this.ctx.fill();
        
        // Track planet position for trail
        const planetScreenX = this.centerX + simulation.planet.position.x / this.scale;
        const planetScreenY = this.centerY + simulation.planet.position.y / this.scale;
        
        // Update trail
        this.orbitTrail.push({ x: planetScreenX, y: planetScreenY });
        if (this.orbitTrail.length > this.maxTrailLength) {
            this.orbitTrail.shift();
        }
        
        // Draw orbit trail
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.beginPath();
        if (this.orbitTrail.length > 0) {
            this.ctx.moveTo(this.orbitTrail[0].x, this.orbitTrail[0].y);
            for (let i = 1; i < this.orbitTrail.length; i++) {
                this.ctx.lineTo(this.orbitTrail[i].x, this.orbitTrail[i].y);
            }
        }
        this.ctx.stroke();
        
        // Draw planet
        this.ctx.fillStyle = '#00AAFF';
        this.ctx.beginPath();
        this.ctx.arc(
            planetScreenX,
            planetScreenY,
            5,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        
        console.log("Rendering frame");
    }
}
