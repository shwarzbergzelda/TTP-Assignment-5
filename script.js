
const rowItem = "<div class='grid-item-row'></div>";
const colItem = "<div class='grid-item-col'></div>";

const grid = document.getElementsByClassName("grid")[0];
let size = "";
let numOfRows = 0;
let numOfColumns = 0;

function removeCol(){
    let items = grid.children;
    const len = items.length;
    
    for(let i = len-1; i >= numOfColumns-1; i-=numOfColumns){
        grid.removeChild(items[i]);
    }

    size = size.substring(0,size.lastIndexOf(" "));
    grid.style.gridTemplateColumns = size;

    numOfColumns--;

    if(numOfColumns == 0){
        numOfRows = 0;
        resetGrid();
    }
}