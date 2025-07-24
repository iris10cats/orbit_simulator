export class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        
        this.orbitTrail = [];
        this.maxTrailLength = 1000;
    }
    
    clear() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawStar(position, mass) {
        const radius = Math.log(mass) / 3;
        
        this.ctx.beginPath();
        this.ctx.arc(this.centerX + position.x, this.centerY + position.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
        
        const gradient = this.ctx.createRadialGradient(
            this.centerX + position.x, this.centerY + position.y, radius,
            this.centerX + position.x, this.centerY + position.y, radius * 2
        );
        gradient.addColorStop(0, 'rgba(255, 255, 100, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(this.centerX + position.x, this.centerY + position.y, radius * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawPlanet(position, velocity) {
        this.orbitTrail.push({
            x: this.centerX + position.x,
            y: this.centerY + position.y
        });
        
        if (this.orbitTrail.length > this.maxTrailLength) {
            this.orbitTrail.shift();
        }
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.orbitTrail[0].x, this.orbitTrail[0].y);
        for (let i = 1; i < this.orbitTrail.length; i++) {
            this.ctx.lineTo(this.orbitTrail[i].x, this.orbitTrail[i].y);
        }
        this.ctx.strokeStyle = 'rgba(100, 150, 255, 0.5)';
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(this.centerX + position.x, this.centerY + position.y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fill();
    }
    
    render(simulation) {
        this.clear();
        this.drawStar(simulation.star.position, simulation.star.mass);
        this.drawPlanet(simulation.planet.position, simulation.planet.velocity);
    }
    
    resetTrail() {
        this.orbitTrail = [];
    }
}
