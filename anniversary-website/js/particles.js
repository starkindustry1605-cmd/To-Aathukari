/**
 * ===================================================================
 * ✨ ROMANTIC PARTICLE & CANVAS ENGINE
 * ===================================================================
 * Renders floating hearts, cherry blossom petals, fireflies & starlight
 */

class RomanticParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 65;
        this.mouseX = null;
        this.mouseY = null;
        this.cursorParticles = [];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });

        // Seed initial floating elements
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle(true));
        }

        this.animate();
    }

    resize() {
        this.dpr = window.devicePixelRatio || 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }

    createParticle(randomY = false) {
        const types = ['heart', 'petal', 'sparkle', 'firefly'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        return {
            x: Math.random() * this.width,
            y: randomY ? Math.random() * this.height : this.height + 20,
            size: Math.random() * 12 + 6,
            speedY: -(Math.random() * 1.2 + 0.4),
            speedX: Math.sin(Math.random() * Math.PI * 2) * 0.8,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 1.8,
            opacity: Math.random() * 0.6 + 0.25,
            color: this.getRandomColor(type),
            type: type,
            swing: Math.random() * 0.02 + 0.01,
            swingOffset: Math.random() * Math.PI * 2
        };
    }

    getRandomColor(type) {
        if (type === 'heart') {
            const colors = ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#ff758f'];
            return colors[Math.floor(Math.random() * colors.length)];
        } else if (type === 'petal') {
            const colors = ['#fbcfe8', '#f472b6', '#ec4899', '#f9a8d4', '#fed7aa'];
            return colors[Math.floor(Math.random() * colors.length)];
        } else if (type === 'firefly') {
            return '#fef08a';
        } else {
            return '#fef9c3';
        }
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.spawnCursorSparkle(e.clientX, e.clientY);
    }

    handleTouchMove(e) {
        if (e.touches && e.touches[0]) {
            this.mouseX = e.touches[0].clientX;
            this.mouseY = e.touches[0].clientY;
            this.spawnCursorSparkle(this.mouseX, this.mouseY);
        }
    }

    spawnCursorSparkle(x, y) {
        if (Math.random() > 0.4) return;
        this.cursorParticles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            size: Math.random() * 6 + 3,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5 - 0.5,
            opacity: 0.9,
            color: ['#f43f5e', '#ec4899', '#fbbf24', '#fbcfe8'][Math.floor(Math.random() * 4)],
            life: 1.0
        });
    }

    drawHeart(x, y, size, color, opacity, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate((rotation * Math.PI) / 180);
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;

        this.ctx.beginPath();
        const topCurveHeight = size * 0.3;
        this.ctx.moveTo(0, topCurveHeight);
        // Top left curve
        this.ctx.bezierCurveTo(
            -size / 2, -topCurveHeight,
            -size, topCurveHeight / 3,
            0, size
        );
        // Top right curve
        this.ctx.bezierCurveTo(
            size, topCurveHeight / 3,
            size / 2, -topCurveHeight,
            0, topCurveHeight
        );
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawPetal(x, y, size, color, opacity, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate((rotation * Math.PI) / 180);
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;

        this.ctx.beginPath();
        this.ctx.moveTo(0, -size);
        this.ctx.quadraticCurveTo(size * 0.6, 0, 0, size);
        this.ctx.quadraticCurveTo(-size * 0.6, 0, 0, -size);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawSparkle(x, y, size, color, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = color;

        this.ctx.beginPath();
        this.ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update & draw background drifting particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            p.y += p.speedY;
            p.x += Math.sin(p.swingOffset + p.y * p.swing) * 0.7;
            p.rotation += p.rotationSpeed;

            // Soft reaction to cursor
            if (this.mouseX !== null && this.mouseY !== null) {
                const dx = p.x - this.mouseX;
                const dy = p.y - this.mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.x += (dx / dist) * 1.5;
                    p.y += (dy / dist) * 1.5;
                }
            }

            // Draw based on type
            if (p.type === 'heart') {
                this.drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
            } else if (p.type === 'petal') {
                this.drawPetal(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
            } else {
                this.drawSparkle(p.x, p.y, p.size, p.color, p.opacity);
            }

            // Reset when leaving screen
            if (p.y < -30 || p.x < -30 || p.x > this.width + 30) {
                this.particles[i] = this.createParticle(false);
            }
        }

        // Update & draw cursor trail sparkles
        for (let i = this.cursorParticles.length - 1; i >= 0; i--) {
            const cp = this.cursorParticles[i];
            cp.x += cp.speedX;
            cp.y += cp.speedY;
            cp.life -= 0.025;
            cp.opacity = Math.max(0, cp.life);

            if (cp.life <= 0) {
                this.cursorParticles.splice(i, 1);
            } else {
                this.drawSparkle(cp.x, cp.y, cp.size * cp.life, cp.color, cp.opacity);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

window.RomanticParticleEngine = RomanticParticleEngine;
