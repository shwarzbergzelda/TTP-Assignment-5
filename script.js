const rowItem = "<div class='grid-item-row'></div>";
const colItem = "<div class='grid-item-col'></div>";

const grid = document.getElementsByClassName("grid")[0];
let size = "";
let numOfRows = 0;
let numOfColumns = 0;

function addRow() {
    if (numOfColumns == 0) {
        numOfColumns = 1;
        size = "";
        for (let i = 0; i < numOfColumns; i++) {
            size += " 50px";
        }
        grid.style.gridTemplateColumns = size;
    }
    grid.innerHTML += rowItem;

    for (let i = 0; i < numOfColumns - 1; i++) {
        grid.innerHTML += colItem;
    }
    numOfRows++;
    printResults();
}

function addCol() {
    size += " 50px";
    grid.style.gridTemplateColumns = size;

    if (numOfRows == 0) {
        numOfRows = 1;
        grid.innerHTML += rowItem;
    } else {
        for (let i = 0; i < numOfRows; i++) {
            grid.innerHTML += colItem;
        }
    } numOfColumns++;
    printResults();
}

function removeRow() {
    let items = grid.children;

    for (let i = 0; i < numOfColumns; i++) {
        grid.removeChild(items[0]);
    }

    numOfRows--;

    if (numOfRows < 0) {
        numOfRows = 0;
        size = "";
        grid.style.gridTemplateColumns = size;
    }

    if (numOfRows == 0) {
        numOfColumns = 0;
        resetGrid();
    }
    console.log(items);
    printResults();
}

function removeCol() {
    let items = grid.children;
    const len = items.length;

    for (let i = len - 1; i >= numOfColumns - 1; i -= numOfColumns) {
        grid.removeChild(items[i]);
    }

    size = size.substring(0, size.lastIndexOf(" "));
    grid.style.gridTemplateColumns = size;

    numOfColumns--;

    if (numOfColumns < 0) {
        numOfRows = 0;
        size = "";
        grid.style.gridTemplateColumns = size;
    }

    if (numOfColumns == 0) {
        numOfRows = 0;
        resetGrid();
    }
    console.log(items);
    printResults();
}

function resetGrid() {
    grid.innerHTML = "";
    size = "";
    grid.style.gridTemplateColumns = size;
}

function printResults() {
    console.log("rows: " + numOfRows + "\ncols: " + numOfColumns);
}

function getColor() {
    const color = document.getElementById("colors");
    return color.value;
}

grid.addEventListener("click", (e) => {
    if ((e.target.getElementsByClassName("grid-item-col") || e.target.getElementsByClassName("grid-item-row")) && e.target !== grid) {
        e.target.style.backgroundColor = getColor();
    }
});

const fillEmptyButton = document.getElementById("fillEmpty");

fillEmptyButton.addEventListener("click", () => {
    const gridItems = grid.children;

    for (let item of gridItems) {
        if (window.getComputedStyle(item).getPropertyValue("background-color") == "rgb(255, 255, 255)") {
            item.style.backgroundColor = getColor();
        }
    }
});

const fillAllButton = document.getElementById("fillAll");
fillAllButton.addEventListener("click", () => {
    const gridItems = grid.children;

    for (let item of gridItems) {
        item.style.backgroundColor = getColor();
    }
});

const clearAllButton = document.getElementById("clearAll");
clearAllButton.addEventListener("click", () => {
    const gridItems = grid.children;

    for (let item of gridItems) {
        item.style.backgroundColor = "white";
    }
});