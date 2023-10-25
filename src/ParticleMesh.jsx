import p5 from 'p5'
import React from 'react'
import styled from 'styled-components'

export default class ParticleMesh extends React.Component {
    state = {
        options: {
            // particleCount: 70,
            pullDistance: 300,
            attractionForce: 2,
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
    }

    constructor(props) {
        super(props)
        this.particleRef = React.createRef()
    }

    componentDidUpdate(prevProps) {
        if (this.props.disperse != prevProps.disperse) {
            this.setState({
                ...this.state,
                options: {
                    ...this.state.options,
                    nodesAttract: !this.props.disperse,
                    keepInbounds: !this.props.disperse,
                    attractedToMouse: !this.props.disperse
                }
            })
        }
    }

    componentDidMount() {
        if (!this.sketch) this.sketch = new p5(this.Sketch, this.particleRef.current)
    }

    componentWillUnmount() {
        this.sketch.remove()
    }

    Sketch = p => {
        let canvas
        let particles = []
        const parentId = 'sketch-container'
        let i = 0
        let cooldownTime = 150 // ms cooldown after spawning particle
        let timer = null
    
        // get an object holding the dimensions of the element matching given id
        function dim(id) {
            const a = document.getElementById(id)
            if (!a) return { top: 0, left: 0, width: 0, height: 0 }
            return {
                top: a.getBoundingClientRect().top,
                left: a.getBoundingClientRect().left,
                width: a.clientWidth,
                height: a.clientHeight,
            }
        }
    
        // vec: p5 vector, box: dimentions object returned from dim()
        function vectorInBox(vec, box) {
            return (vec.x > 0 && vec.x < box.width) && (vec.y > 0 && vec.y < box.height)
        }
    
        const getMouse = () => p.createVector(p.mouseX, p.mouseY)
    
        p.setup = () => {
            const d = dim(parentId)
            canvas = p.createCanvas(d.width, d.height);
            canvas.position(0,0)
            i++
            console.log(`setup has been called ${i} times`)
        }
    
        p.mouseClicked = e => {
            if (timer === null && !this.props.disperse) {
                const d = dim(parentId)
                particles.push(new Particle(p, p.createVector(e.clientX - d.left, e.clientY - d.top)))
                timer = setTimeout(() => timer = null, cooldownTime)
            }
        }
    
        p.draw = () => {
            const options = this.state.options
            const mouse = getMouse()
            
            p.clear()
            
            // perimeter of mouse's attraction
            if (options.debug) {
                p.noFill()
                p.stroke('#fff1')
                p.strokeWeight(1)
                p.ellipse(mouse.x, mouse.y, options.pullDistance*2)
            }

            p.windowResized = () => {
                const d = dim(parentId)
                p.resizeCanvas(d.width, d.height)
            }

            particles.forEach(particle => {
                if (particle.dead) return
                particle.move(options.keepInbounds, options.bounceDecay);
                
                if (options.drawParticles) particle.draw();

                if (options.debug && options.nodesAttract) {
                    p.noFill()
                    p.stroke('#fff1')
                    p.strokeWeight(1)
                    p.ellipse(particle.pos.x, particle.pos.y, options.pullDistance)
                }

    
                if (options.attractedToMouse) {
                    let mouseDist = particle.pos.copy().dist(mouse);
                    
                    if (options.debug && (mouseDist < options.pullDistance)) {
                        p.strokeWeight(1)
                        p.stroke('#ff02')
                        p.line(mouse.x, mouse.y, particle.pos.x, particle.pos.y)
                    }
                
        
                    if ((mouseDist < options.pullDistance) && vectorInBox(mouse, dim(parentId))) {
                        let dir = mouse.copy().sub(particle.pos);
                        if (p.mouseIsPressed) {
                            if (options.repelOnPress) dir.mult(-1*options.repelMultiplier);
                        }
                        
                        const strength = 2/Math.pow(mouseDist, 2)
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

    render() {
        return (
            <SketchContainer id='sketch-container'>
                <div ref={this.particleRef} />
            </SketchContainer>
        )
    }
}

const SketchContainer = styled.div`
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0
    z-index: -999;
`

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
        let rate = this.p.random(.2, .4);
        this.pos = this.p.createVector(this.p.random(-100, this.p.width + 100), -100);
        this.vel = this.p.createVector(this.p.random(-rate, rate), this.p.random(-rate + rate, rate));
        this.potential = this.p.random(3,7);
    }
}