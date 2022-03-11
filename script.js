const DEFAULT_MODE = "selected-color";
const DEFAULT_COLOR = "#0D67CE";

let selectedMode = DEFAULT_MODE;
let selectedColor = DEFAULT_COLOR;

const getRandomColor = () => {
    const blueValue = Math.floor(Math.random() * 256 + 127);
    const greenValue = Math.floor(Math.random() * 256 + 127);
    const redValue = Math.floor(Math.random() * 256 + 127);
    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

const colorGridCell = (e, color) => {
    (selectedMode === "erase-color")
        ? e.target.removeAttribute("data-color", true)
        : e.target.setAttribute("data-color", true);
    e.target.style.backgroundColor = color;
}

const checkMode = (e) => {
    switch (selectedMode) {
        case "random-colors":
            const randomColor = getRandomColor();
            colorGridCell(e, randomColor);
            break;
        case "erase-color":
            colorGridCell(e, "#fefefe");
            break;
        default:    // default_mode = "selected-color"
            colorGridCell(e, selectedColor);
    }
}

const createGrid = (size) => {
    const gridContainer = document.querySelector("#grid-container");
    gridContainer.innerHTML = ``; // need to reset the grid otherwise new divs will add on top of it
    // Create size x size grid
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    // Create new divs/cells and add them to the grid-container
    const totalSize = size * size;
    for (let i = 1; i <= totalSize; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridContainer.append(gridCell);
    }
    // call event listener on each and check the mode
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(gridCell => gridCell.addEventListener("mousemove", checkMode));
}

const setMode = (e) => {
    selectedMode = e.target.getAttribute("data-mode");
}

// Set the selected color from input first then set the mode 
// [it may be random-colors/erase-color previously so have to set it again]
const setSelectedColor = (e) => {
    selectedColor = e.target.value;
    setMode(e);
}

const setBgColor = () => {
    const gridCells = [...document.querySelectorAll(".grid-cell")];
    const notColoredCells = gridCells.filter(gridCell => gridCell.getAttribute("data-color") === null);
    notColoredCells.forEach(notColoredCell => notColoredCell.style.backgroundColor = selectedColor);
}

const toggleGridLines = () => {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(gridCell => gridCell.classList.toggle("grid-lines"));
}

const clearColoredGrid = () => {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(gridCell => {
        gridCell.style.backgroundColor = "#fefefe";
        gridCell.removeAttribute("data-color")
    });
}

const changeGridSize = (e) => {
    // Need to clear all divs first otherwise the new ones will keep adding on top of the previous divs/grid-Cells
    clearColoredGrid();
    // Create a new grid from the selected size
    const selectedGridSize = e.target.value;
    const GridSizeValue = document.querySelector("#grid-size-value");
    GridSizeValue.textContent = `${selectedGridSize} x ${selectedGridSize}`;
    createGrid(selectedGridSize);
}

// Getting all the grid controlling elments
const randomColorsBtn = document.querySelector("#random-colors-btn");
const eraseColorBtn = document.querySelector("#erase-color-btn");
const setBgColorBtn = document.querySelector("#set-bg-color-btn");
const clearGridBtn = document.querySelector("#clear-grid-btn");
const toggleGridLinesBtn = document.querySelector("#toggle-grid-lines-btn");
const colorPickerInput = document.querySelector("#color-picker");
const selectedGridSize = document.querySelector("#grid-size");

// Adding required Event listener to each
randomColorsBtn.addEventListener("click", setMode);
eraseColorBtn.addEventListener("click", setMode);
setBgColorBtn.addEventListener("click", setBgColor);
clearGridBtn.addEventListener("click", clearColoredGrid);
toggleGridLinesBtn.addEventListener("click", toggleGridLines);
colorPickerInput.addEventListener("input", setSelectedColor);
colorPickerInput.addEventListener("click", setSelectedColor);
selectedGridSize.addEventListener("change", changeGridSize);

// On window load, create a default 16x16 grid
window.onload = () => {
    createGrid(16);
}