const rowItem = "<div class='grid-item-row'></div>";
const colItem = "<div class='grid-item-col'></div>";

const grid = document.getElementsByClassName("grid")[0];
let size = "";
let numOfRows = 0;
let numOfColumns = 0;

function removeRow(){
    let items = grid.children;
    
    for(let i = 0; i < numOfColumns; i++){
        grid.removeChild(items[0]);
    }

    numOfRows--;
    
    if(numOfRows == 0){
        numOfColumns = 0;
        resetGrid();
    }
}

function resetGrid(){
    grid.innerHTML="";
}