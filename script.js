// check DOM loaded
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
  });

  // was going to make different canvas sizes, hence width and height variables.
const canvas = document.querySelector(".drawingBoard");
const drawCanvas = document.getElementById("submit");
const width = document.getElementById("width");
const height = document.getElementById("height");
const notify = document.querySelector(".notify");
const colorPicker = document.getElementById("colorDisplay");
const erase = document.getElementById("eraser");
const clear = document.getElementById("clear");
let color = 'black';
let area = 0;
let mouseDown = false;
let c_width = 0;
let c_height = 0;

// populate canvas
function populateContainer(canvas, width, height, notify, area) {
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

    c_width = width;
    c_height = height;

    area = height * width;

    // creates grid
    canvas.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    // paints only if mouse is held down
    canvas.addEventListener('mousedown', (event) => {
        mouseDown = true;
        event.target.style.backgroundColor = color;
        console.log('black');
    }) 
    canvas.addEventListener('mouseup', () => {
        mouseDown = false;
        console.log('white');
    })
    canvas.addEventListener('mouseleave', () => {
        mouseDown = false;
        console.log('leave');
    })


    // populates grid
    for (i = 0; i < area; i++) {
        let square = document.createElement('div');
        square.addEventListener('mouseover', (event) => {
            if (mouseDown) {
                square.style.backgroundColor = color;
            }
        });
        // stops text dragging, prevent default behaviour
        square.addEventListener('dragstart', (event) => {
            event.preventDefault();
        })
        square.style.backgroundColor = 'white';
        canvas.insertAdjacentElement('beforeend', square);
    }
}

// changes event listener of square to change color
colorPicker.addEventListener('input', (event) => {
    color = event.target.value;
});
// turns to eraser
erase.addEventListener('click', () => {
    color = 'white';
})

// clears drawing board
clear.addEventListener('click', () => {
    populateContainer(canvas, c_width, c_height, notify, c_width * c_height);
})


drawCanvas.addEventListener('click', () => populateContainer(canvas, width.value, height.value, notify, area));