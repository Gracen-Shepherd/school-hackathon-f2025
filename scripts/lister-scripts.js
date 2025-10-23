const container = document.querySelector(".map");
let dot = document.querySelector(".dot")
containerRect = container.getBoundingClientRect();


container.addEventListener('click', (event) => {

    dot.style.left = String(event.pageX - (containerRect.x + 10)) + "px";
    dot.style.top = String(event.pageY - (containerRect.y + 10)) + "px";
    dot.style.opacity = "50%";
    currentCoords[0] = coords[0] + (event.pageX - (containerRect.x + 10)) * 0.001;
    currentCoords[1] = coords[1] + (event.pageY - (containerRect.y + 10)) * 0.001;
})

const coords = [30.42454333155956, -91.08618485649713]
let currentCoords = coords;