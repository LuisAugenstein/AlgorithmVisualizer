const main_window = document.getElementById('main-window');
const canvas = new Canvas(main_window);
const slider = document.getElementById('slider');
let slider_value = 0.5;
slider.value = slider.max * slider_value;
slider.addEventListener('input', () => {
    const t_text = document.getElementById('t-text');
    slider_value = slider.value / slider.max;
    t_text.innerHTML = "t = " + slider_value;
    repaint();
});

document.getElementById('create-button').addEventListener('click', () => {
    canvas.addPoint();
    repaint();
});

document.getElementById('remove-button').addEventListener('click', () => {
    canvas.removePoint();
    repaint();
});

window.addEventListener('resize', () => {
    repaint();
});

//DRAG AND DROP SECTION
main_window.addEventListener('mousedown', (mouse) => {
    const offset = cumulativeOffset(main_window);
    const mousePosition = {
        x: mouse.clientX - offset.left,
        y: mouse.clientY - offset.top
    }
    canvas.clicked(mousePosition);
});
window.addEventListener('mousemove', (mouse) => {
    const offset = cumulativeOffset(main_window);
    const mousePosition = {
        x: mouse.clientX - offset.left,
        y: mouse.clientY - offset.top
    }
    if (canvas.mouseMoved(mousePosition)) {
        repaint();
    }
});
main_window.addEventListener('mouseup', () => {
    canvas.mouseUp();
});

//DRAW SECTION
const ctx = main_window.getContext("2d");

//repaints the whole canvas
function repaint() {
    ctx.clearRect(0, 0, main_window.clientWidth, main_window.clientHeight);
    ctx.fillStyle = "#000000";
    canvas.points.forEach((e) => {
        e.draw(ctx);
    });
    if (canvas.points.length >= 2) {
        drawExample(getNextLevel(canvas.points, slider_value), slider_value);
        drawBezierCurve(canvas.points);
    }
}

//visualizes the bezier curve from 0 to t which is the current slider_value
function drawBezierCurve(points) {
    for (let t = 0; t < slider_value; t += 20 / slider.max) {
        const line = new Line(getBezierPoint(points, t), getBezierPoint(points, t + 20 / slider.max));
        ctx.strokeStyle = "#ff0000";
        line.draw(ctx);
    }
}

//visualizes one calculation of the bezierpoint corresponding to t
function drawExample(level, t) {
    while (level.points.length != 1) {
        ctx.fillStyle = "#666666";
        ctx.strokeStyle = "#666666";
        level.lines.forEach((e) => {
            e.draw(ctx);
        });
        level.points.forEach((e) => {
            e.draw(ctx);
        });
        level = getNextLevel(level.points, t);
    }
    ctx.fillStyle = "#ff0000";
    level.lines[0].draw(ctx);;
    level.points[0].draw(ctx);

}

// returns the point on the curve
function getBezierPoint(points, t) {
    while (points.length != 1) {
        points = getNextLevel(points, t).points;
    }
    return points[0];
}

//returns the points and the lines that belongs to the next level
function getNextLevel(points, t) {
    let nextLevelPoints = [];
    let lines = [];
    for (let i = 0; i < points.length - 1; i++) {
        let line = new Line(points[i], points[i + 1]);
        lines.push(line);
        nextLevelPoints.push(line.getPointFromScalar(t));
    }
    return { points: nextLevelPoints, lines: lines };
}