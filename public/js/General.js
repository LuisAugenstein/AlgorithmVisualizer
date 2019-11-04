document.getElementById("menue").addEventListener("click", () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width == 0 + "px" || sidebar.style.width == "") {
        sidebar.style.width = 220 + "px";
    } else {
        sidebar.style.width = 0 + "px";
    }
});

//resize the canvas
resize();
window.addEventListener('resize', () => {
    resize();
});

function resize() {
    const main_window = document.getElementById('main-window');
    main_window.width = 0;
    main_window.height = 0;
    main_window.width = main_window.parentElement.clientWidth;
    main_window.height = main_window.parentElement.clientHeight;
}

//offset
function cumulativeOffset(element) {
    let top = 0;
    let left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return { top: top, left: left };
}