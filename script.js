const rowItem = "<div class='grid-item-row'></div>";
const colItem = "<div class='grid-item-col'></div>";
const fillEmptyButton = document.getElementById("fillEmpty");
const fillAllButton = document.getElementById("fillAll");
const clearAllButton = document.getElementById("clearAll");
const inputRows = document.getElementById("inputRows");
const inputCols = document.getElementById("inputCols");
const removeRows = document.getElementById("removeRows");
const removeCols = document.getElementById("removeCols");

const grid = document.getElementsByClassName("grid")[0];
let size = "";
let numOfRows = 0;
let numOfColumns = 0;

/* ADD ROW */
inputRows.addEventListener("click", addRow);
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
}


/* ADD COLUMN */
inputCols.addEventListener("click", addCol)
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
    }
    numOfColumns++;
}


/* REMOVE ROW */
removeRows.addEventListener("click", removeRow);
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
}


/* REMOVE COLUMN */
removeCols.addEventListener("click", removeCol);
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
}


/* RESET GRID TO CONTAIN NOTHING WHEN REMOVING LAST ROW/COLUMN */
function resetGrid() {
    grid.innerHTML = "";
    size = "";
    grid.style.gridTemplateColumns = size;
}


/* RETRIEVES SELECTED COLOR FROM CLICKDOWN MENU */
function getColor() {
    const color = document.getElementById("colors");
    return color.value;
}


/* FILL ALL EMPTY/WHITE GRID CELLS */
fillEmptyButton.addEventListener("click", () => {
    const gridItems = grid.children;

    for (let item of gridItems) {
        if (
            window.getComputedStyle(item).getPropertyValue("background-color") ==
            "rgb(255, 255, 255)"
        ) {
            item.style.backgroundColor = getColor();
        }
    }
});


/* FILLS ALL GRID CELLS, REGARDLESS OF CURRENT FILL STATE/COLOR */
fillAllButton.addEventListener("click", () => {
    const gridItems = grid.children;

    for (let item of gridItems) {
        item.style.backgroundColor = getColor();
    }
});


/* RESET GRID CELLS' COLORS TO WHITE */
clearAllButton.addEventListener("click", () => {
    const gridItems = grid.children;

    for (let item of gridItems) {
        item.style.backgroundColor = "white";
    }
});


/* RETURNS TRUE IF TARGET IS GRID CELL */
function isGridItem(e) {
    return (
        (e.target.getElementsByClassName("grid-item-col") ||
            e.target.getElementsByClassName("grid-item-row")) &&
        e.target !== grid
    );
}


/* CLICK ON SINGLE BUTTON TO CHANGE COLOR */ 
grid.addEventListener("click", (e) => {
    if (isGridItem(e)) {
        e.target.style.backgroundColor = getColor();
    }
});

/* CLICK AND DRAG TO CHANGE GRID CELLS' COLORS */
grid.addEventListener("mousedown", mouseDownListener, true);
grid.addEventListener("mouseup", mouseUpListener, true);

function mouseMoveListener(e) {
    isGridItem(e) && (e.target.style.backgroundColor = getColor());
} // Fill grid cells that mouse is moving over

function mouseDownListener(e) {
    grid.addEventListener("mousemove", mouseMoveListener, true);
} // While mouse is down, call function to fill grid cells

function mouseUpListener(e) {
    grid.removeEventListener("mousemove", mouseMoveListener, true);
} // Stop event listener to prevent it from filling cells after ceased click/drag