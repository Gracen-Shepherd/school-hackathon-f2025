const container = document.querySelector(".map");
let dot = document.querySelector(".dot")
containerRect = container.getBoundingClientRect();
let coordsElement = document.querySelector(".coords");

function TruncateSixDigits(num) {
    return Math.round(num * (10 ** 6)) / (10 ** 6)
}

container.addEventListener('click', (event) => {
    dot.style.left = String(event.pageX + container.scrollLeft - (containerRect.x + 5)) + "px";
    dot.style.top = String(event.pageY + container.scrollTop - (containerRect.y + 5)) + "px";
    dot.style.opacity = "50%";
    currentCoords[1] = coords[1] + (event.pageX + container.scrollLeft - (containerRect.x + 5)) * 0.00001;
    currentCoords[0] = coords[0] - (event.pageY + container.scrollTop - (containerRect.y + 5)) * 0.00001;

    coordsElement.textContent = '' + TruncateSixDigits(currentCoords[0]) + ' ' + TruncateSixDigits(currentCoords[1]);
})

const coords = [30.42454333155956, -91.08618485649713]
let currentCoords = [...coords];

const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', () => {
    currentCoords = [...coords];
    coordsElement.textContent = '(none selected)';
    dot.style.opacity = '0';
})