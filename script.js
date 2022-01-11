
const rowItem = "<div class='grid-item-row'></div>";
const colItem = "<div class='grid-item-col'></div>";

const grid = document.getElementsByClassName("grid")[0];
let size = "";
let numOfRows = 0;
let numOfColumns = 0;

function addRow(){
    if(numOfColumns == 0){
        numOfColumns = 1;
        size = "";
        for(let i = 0; i < numOfColumns; i++){
            size+=" 50px";
        }
        grid.style.gridTemplateColumns = size;
    }
    grid.innerHTML+=rowItem;

    for(let i = 0; i < numOfColumns-1; i++){
        grid.innerHTML+=colItem;
    }
    numOfRows++;
}
