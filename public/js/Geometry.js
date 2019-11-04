class Point {
    // (x,y) is center of the point
    // container is the canvas where the points are drawn and scaled to
    constructor(x, y, container) {
        this.container = container;
        this.setX(x);
        this.setY(y);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, 2 * Math.PI);
        ctx.fill();
    }

    getRadius() {
        return 7;
    }

    getX() {
        return this.x * this.container.clientWidth;
    }

    getY() {
        return this.y * this.container.clientHeight;
    }

    setX(x) {
        this.x = x / this.container.clientWidth;
    }

    setY(y) {
        this.y = y / this.container.clientHeight;
    }

    getLeft() {
        return this.getX() - this.getRadius();
    }

    getRight() {
        return this.getX() + this.getRadius();
    }

    getTop() {
        return this.getY() - this.getRadius();
    }

    getBottom() {
        return this.getY() + this.getRadius();
    }

    contains(x, y) {
        return (x >= this.getLeft() && x <= this.getRight() &&
            y >= this.getTop() && y <= this.getBottom());
    }
}

class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    draw(ctx) {
        //draw the Line
        ctx.beginPath();
        ctx.moveTo(this.start.getX(), this.start.getY());
        ctx.lineTo(this.end.getX(), this.end.getY());
        ctx.stroke();
    }

    //returns the 2d point: start + t * (end - start)
    getPointFromScalar(t) {
        let x = this.start.getX() + t * (this.end.getX() - this.start.getX());
        let y = this.start.getY() + t * (this.end.getY() - this.start.getY());
        const point = new Point(x, y, this.start.container);
        return point;
    }
}