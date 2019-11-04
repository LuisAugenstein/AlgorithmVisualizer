class Canvas {
    // this class is a model to track the state of the canvas.
    // how many points are on the canvas, where are the points

    constructor(container) {
        this.points = [];
        this.container = container;
    }

    clicked(mouse) {
        this.points.forEach((point) => {
            if (point.contains(mouse.x, mouse.y)) {
                this.moveable = point;
            }
        });
    }

    mouseMoved(mouse) {
        if (this.moveable == null)
            return false;
        if (mouse.x < 0 || mouse.x > this.container.clientWidth ||
            mouse.y < 0 || mouse.y > this.container.clientHeight) {
            this.moveable = null;
            return true;
        }
        this.moveable.setX(mouse.x);
        this.moveable.setY(mouse.y);
        return true;
    }

    mouseUp() {
        this.moveable = null;
    }

    addPoint() {
        if (this.points.length < 8) {
            let x = 0.1 * (this.points.length + 1) * this.container.clientWidth;
            let y = (0.1 + 0.8 * Math.random()) * this.container.clientHeight;
            const point = new Point(x, y, this.container);
            this.points.push(point);
        }
    }

    removePoint() {
        if (this.points.length > 2) {
            this.points.pop();
        }
    }
}