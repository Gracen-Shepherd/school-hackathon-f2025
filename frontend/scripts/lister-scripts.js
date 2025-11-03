const mapContainer = document.querySelector(".map");
let dot = document.querySelector(".dot")
containerRect = mapContainer.getBoundingClientRect();


mapContainer.addEventListener('click', (event) => {
    dot.style.left = String(event.pageX + mapContainer.scrollLeft - (containerRect.x + 7)) + "px";
    dot.style.top = String(event.pageY + mapContainer.scrollTop - (containerRect.y + 7)) + "px";
    dot.style.opacity = "75%";
    currentCoords[1] = coords[1] + (event.pageX + mapContainer.scrollLeft - (containerRect.x + 7)) * 0.00001;
    currentCoords[0] = coords[0] - (event.pageY + mapContainer.scrollTop - (containerRect.y + 7)) * 0.00001;
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
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            else console.log('everything is cool')
            return response.json();
        })

    currentCoords = [...coords];
    dot.style.opacity = '0';
})