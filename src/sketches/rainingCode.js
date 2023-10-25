let options = {
    glyphSize: 20,
    opacity: 100,
    speed: 1,
    glitchSpeed: 1,
    streamLength: 10,
}

export default function matrix(p) {
    let canvas
    let streams = []

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.position(0, 0)

        const { glyphSize, speed, glitchSpeed, streamLength } = options
        for (let i = 0; i < p.width; i += parseInt(glyphSize)) {
            streams.push(new Stream(p, i, glyphSize, speed, glitchSpeed, streamLength));
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
        const { opacity } = options
        if (opacity >= 255) {
            canvas.clear()
        } else {
            p.background(0,0,0, opacity);
        }

        streams.forEach(stream => stream.rain());
    }
}

class Stream {
    constructor(p, x, size, speed, glitchSpeed, streamLength) {
        this.p = p
        this.x = x;
        this.glyphs = [];

        speed = speed * p.round(p.random(2, 6));
        let count = Math.min(p.round(streamLength*.06*(p.height/size), streamLength*.09*(p.height/size)), p.height/size)
        let stagger = p.round(p.random(100, 1000));

        for (let i = 0; i < count; i++) {
            let interval = p.round(p.random(1/glitchSpeed * 50, 1/glitchSpeed * 100));
            let head = i === 0 && p.random() < .5;
            let glyph = new Glyph(p, this.x, -size * i - stagger, speed, interval, head, size);
            this.glyphs.push(glyph);
        }
    }

    rain() {
        this.glyphs.forEach(glyph => glyph.rain());
    }
}

// Creates a katakana character that rains down the screen
class Glyph {
    constructor(p, x, y, speed, interval, head, size) {
        this.p = p
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.interval = interval;
        this.head = head;
        this.size = size;

        this.char = '_';
        this.setChar();
    }

    setChar() {
        let letter = this.p.random(0, 90);
        this.char = String.fromCharCode(0x30A0 + letter);
    }

    render() {
        const { p } = this
        this.head ? p.fill(220, 255, 220) : p.fill(50, 255, 150);
        p.textSize(this.size);
        p.text(this.char, this.x, this.y);
    }

    rain() {
        if (this.y >= this.p.height + this.size) this.y = 0;
        this.y += this.speed;
        if (this.p.frameCount % this.interval === 0) this.setChar();
        this.render();
    }
}