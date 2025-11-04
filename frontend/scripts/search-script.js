const map = document.querySelector('.map');
const dotsAndData = {}
const coords = [30.42454333155956, -91.08618485649713]
const reserveButton = document.getElementById('reset');

async function getDots() {
    try {
        const response = await fetch(`https://gracenatschoolshepherd.pythonanywhere.com/receive_data`);

        if (!response.ok) {
            console.log('Error! HTTP response was not ok');
        }

        const data = await response.json();
        console.log(data);
        for (const item of data) {
            let newDot = document.createElement("div");
            newDot.classList.add("dot");
            newDot.style.left = String(((item['coords'][1]) - coords[1]) / 0.00001) + "px"
            newDot.style.top = String(((item['coords'][0]) - coords[0]) / -0.00001) + "px"
            newDot.id = item['id'];
            map.appendChild(newDot);
            dotsAndData[item['id']] = item
        }

    } catch (error) {
        console.log(error);
    }
}

getDots(); // Gets data initially

map.addEventListener("click", (event) => {
    if (event.target.classList.contains("dot")) {
        for (const child of map.children) {
            if (child.classList.contains("active")) {
                child.classList.remove("active");
            }
        }

        event.target.classList.add("active");
        let dataToUse = dotsAndData[event.target.id]
        document.querySelector('#address').textContent = dataToUse['address'];
        document.querySelector('#price').textContent = dataToUse['price'];
        document.querySelector('#spots').textContent = dataToUse['spots'];
        console.log(dataToUse)
    }
});

reserveButton.addEventListener("click", () => {
    const spots = document.querySelector('#spots');
    if (spots.textContent != '' && Number(spots.textContent) > 0) {
        spots.textContent = Number(spots.textContent) - 1;
    }
})