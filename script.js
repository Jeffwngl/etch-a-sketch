// check DOM loaded
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
  });

const canvas = document.querySelector(".drawingBoard");
const drawCanvas = document.getElementById("submit");
const width = document.getElementById("width");
const height = document.getElementById("height");
const notify = document.querySelector(".notify");
let color = 'black';

// populate canvas
function populateContainer(canvas, width, height, notify) {
    // dimension check
    if (width != height) {
        notify.textContent = `Please choose a square canvas size! ^^`;
        return
    }
    // size check
    if (width > 500 || height > 500) {
        notify.textContent = `Please choose a smaller size! ^^`;
        return
    }

    // removes all squares from previous grid if it exists
    let squares = canvas.querySelectorAll("div");
    squares.forEach((div) => div.remove());

    let area = height * width;

    // creates grid
    canvas.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    // populates grid
    for (i = 0; i < area; i++) {
        let square = document.createElement('div');
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = 'black';
        });
        square.style.backgroundColor = 'white';
        canvas.insertAdjacentElement('beforeend', square);
    }
}

drawCanvas.addEventListener('click', () => populateContainer(canvas, width.value, height.value, notify));