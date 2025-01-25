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

const sizeUp = document.getElementById("sizeUp");
const sizeDown = document.getElementById("sizeDown");

const penCursor = 'assets/pixil-frame-0.png';
const eraserCursor = 'assets/pixil-frame-1.png';

let color = 'black';
let area = 0;
let mouseDown = false;
let c_width = 0;
let c_height = 0;
let brushSize = 1;
var eventStack = [];

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
    
        // eventStack.push({event.target, color});
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

        // add event listener for when painting
        square.addEventListener('mouseover', (event) => {

            if (mouseDown) {
                if (brushSize == 1) {
                    square.style.backgroundColor = color;
                }
                else {
                    // draws surrounding pixels for larger brush sizes
                    let allPixels = Array.from(canvas.children);
                    let toPaint = allPixels.indexOf(event.target);
                    
                    let lowerLimit = -Math.floor(brushSize / 2);
                    let upperLimit = Math.floor(brushSize / 2);

                    // populates space around target square
                    for (let r = lowerLimit; r <= upperLimit; r++) {
                        for (let c = lowerLimit; c <= upperLimit; c++) {
                            // bottom right toPaint index is width^2
                            // top left corner is index 0, index = col * row
                            let rowIndex = Math.floor(toPaint / c_width) + r;
                            let colIndex = (toPaint % c_width) + c;
                            // takes the target square and paints the indexes around it, rowIndex/colIndex changed to a 3x3 or 5x5 block which is painted
                            // debugging

                            // console.log(`row: ${rowIndex}`);
                            // console.log(`col: ${colIndex}`);

                            if (rowIndex >= 0 && rowIndex < c_width && colIndex >= 0 && colIndex < c_width) {
                                let neighourIndex = rowIndex * c_width + colIndex;
                                allPixels[neighourIndex].style.backgroundColor = color;
                            }
                        }
                    }
                }
            }
        });
        // stops text dragging, prevent default behaviour
        square.addEventListener('dragstart', (event) => {
            event.preventDefault();
        })
        // inserts squares
        square.style.backgroundColor = 'white';
        canvas.insertAdjacentElement('beforeend', square);
    }
}

// changes brush size
sizeUp.addEventListener('click', () => {
    brushSize += 2;
    if (brushSize > 5) {
        brushSize = 5;
    }
    console.log(`changesize: ${brushSize}`);
})

sizeDown.addEventListener('click', () => {
    brushSize -= 2;
    if (brushSize < 1) {
        brushSize = 1;
    }
    console.log(`changesize: ${brushSize}`);
})

// changes event listener of square to change color
colorPicker.addEventListener('input', (event) => {
    color = event.target.value;
    canvas.style.cursor = `url('${penCursor}') 0 20, auto`;
})
// turns to eraser
erase.addEventListener('click', () => {
    color = 'white';
    canvas.style.cursor = `url('${eraserCursor}') 10 17, auto`;
})

// clears drawing board
clear.addEventListener('click', () => {
    populateContainer(canvas, c_width, c_height, notify, c_width * c_height);
})

drawCanvas.addEventListener('click', () => populateContainer(canvas, width.value, height.value, notify, area));
// add undo function
// add export