let options = {
    pullDistance: 300,
    attractionForce: 1,
    repelMultiplier: 3,
    bounceDecay: .5,
    keepInbounds: true,
    nodesAttract: true,
    repelOnPress: true,
    drawConnections: true,
    drawParticles: true,
    attractedToMouse: true,
    debug: false,
}

export default function particles(p) {
    let canvas
    let particles = []
    let ready = false
    
    const getMouse = () => p.createVector(p.mouseX, p.mouseY)

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0,0)

        setTimeout(() => ready=true, 1000)
    }

    p.keyPressed = () => {
        // toggle interactions
        if (p.key == 'g') {
            options = {
                ...options,
                attractedToMouse: !options.attractedToMouse,
                nodesAttract: !options.nodesAttract
            }
        }

        // toggle connections
        if (p.key == 'c') {
            options = { ...options, drawConnections: !options.drawConnections }
        }


        if (p.key == '[' || p.key == ']') {
            const str = options.attractionForce
            const newStrength = p.key=='[' ? str-0.5 : str+0.5
            options = { ...options, attractionForce: Math.max(0.5, newStrength) }
        }

        if (p.key == 'x') particles = []

        if (p.key === 'b') {
            options = { ...options, keepInbounds: !options.keepInbounds }
        }
    }

    p.mouseClicked = e => {
        if (!ready) return

        document.getElementById('particles-instructions').classList.add('hidden');
        particles.push(new Particle(p, p.createVector(p.mouseX, p.mouseY)))
    }

    p.draw = () => {
        const mouse = getMouse()
        p.clear()

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight)
        }

        particles.forEach(particle => {
            if (particle.dead) return
            particle.move(options.keepInbounds, options.bounceDecay);
            if (options.drawParticles) particle.draw();

            if (options.attractedToMouse) {
                let mouseDist = particle.pos.copy().dist(mouse);
                
                if (options.debug && (mouseDist < options.pullDistance)) {
                    p.strokeWeight(1)
                    p.stroke('#ff02')
                    p.line(mouse.x, mouse.y, particle.pos.x, particle.pos.y)
                }
            
    
                if (mouseDist < options.pullDistance) {
                    let dir = mouse.copy().sub(particle.pos);
                    if (p.mouseIsPressed) {
                        if (options.repelOnPress) dir.mult(-1*options.repelMultiplier);
                    }
                    
                    const strength = 3/Math.pow(mouseDist, 2)
                    dir.mult(p.constrain(options.attractionForce * strength, 0, options.attractionForce*.001))
                    particle.applyForce(dir);
                }
            }
            

            particles.forEach(other => {
                if (particle !== other) {

                    let dist = particle.pos.dist(other.pos);

                    if (options.drawConnections && dist < options.pullDistance) {
                        let str = Math.pow(15 / dist, 2);
                        str = p.constrain(str, 0, 2);
                        p.stroke(255);
                        p.strokeWeight(str);
                        p.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
                    }
                    if (options.nodesAttract && dist < options.pullDistance) {
                        let dir = other.pos.copy().sub(particle.pos)
                        const strength = 1/Math.pow(dist, 2)
                        dir.mult(p.constrain(options.attractionForce * strength, 0, options.attractionForce*.001))
                        particle.applyForce(dir)
                    }
                }
            });
        });
    }
}


class Particle {
    constructor(p, pos) {
        this.p = p
        this.size = 0
        this.growthRate = .1
        this.respawn()
        this.pos = pos || p.createVector(p.random(-100, p.width+100), p.random(-100, p.height+100))
        this.dead = false
    }

    move(keepInbounds=true, bounceDecay=1) {
        this.pos.add(this.vel);
        
        if (keepInbounds) {
            this.checkBounce(bounceDecay)
        } else this.checkPos();

        if (this.size < this.potential) this.size += this.growthRate
    }

    draw() {
        this.p.strokeWeight(this.size);
        this.p.stroke(255);
        this.p.point(this.pos.x, this.pos.y);
    }

    applyForce(force) { this.vel.add(force); }

    checkBounce(bounceDecay) {
        let { x, y } = this.pos
        let { width, height } = this.p
        let { x:vx, y:vy } = this.vel
        let r = this.size/2
        const d = Math.min(1, bounceDecay)

        if (x <= r) { // left wall
            this.pos.x = r
            this.vel = this.p.createVector(vx*-d, vy)
        } else if (x >= (width-r)) { // right wall
            this.pos.x = width-r
            this.vel = this.p.createVector(vx*-d, vy)
        } else if (y <= r) { // top wall
            this.pos.y = r
            this.vel = this.p.createVector(vx, vy*-d)
        } else if (y >= (height-r)) { // bottom
            this.pos.y = height-r
            this.vel = this.p.createVector(vx, vy*-d)
        } 
    }

    checkPos() {
        let { x, y } = this.pos
        let s = 100;
        if ((x < 0 - s) || (x > this.p.width + s) || (y < 0 - s) || (y > this.p.height + s)) {
            this.dead = true
            this.pos = this.p.createVector(9999, 9999)
        }
    }

    respawn() {
        let rate = 0;
        this.pos = this.p.createVector(this.p.random(-100, this.p.width + 100), -100);
        this.vel = this.p.createVector(this.p.random(-rate, rate), this.p.random(-rate + rate, rate));
        this.potential = this.p.random(3,7);
    }
}