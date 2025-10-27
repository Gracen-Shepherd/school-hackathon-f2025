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
    dot.style.opacity = "75%";
    currentCoords[1] = coords[1] + (event.pageX + container.scrollLeft - (containerRect.x + 5)) * 0.00001;
    currentCoords[0] = coords[0] - (event.pageY + container.scrollTop - (containerRect.y + 5)) * 0.00001;

    coordsElement.textContent = '' + TruncateSixDigits(currentCoords[0]) + ' ' + TruncateSixDigits(currentCoords[1]);
})

const coords = [30.42454333155956, -91.08618485649713]
let currentCoords = [...coords];

const resetButton = document.querySelector("#reset");


resetButton.addEventListener('click', () => {
    const address = document.querySelector("#address").value;
    const price = document.querySelector("#price").value;
    const spots = document.querySelector("#spots").value;
    const objectToSend = {
        coords: currentCoords,
        address: address,
        price: price,
        spots: spots,
    }
    fetch('http://127.0.0.1:5000/send_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToSend),
    })
    currentCoords = [...coords];
    coordsElement.textContent = '(none selected, click map location)';
    dot.style.opacity = '0';
})