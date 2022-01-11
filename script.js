
const rowItem = "<div class='grid-item-row'></div>";
const colItem = "<div class='grid-item-col'></div>";

const grid = document.getElementsByClassName("grid")[0];
let size = "";
let numOfRows = 0;
let numOfColumns = 0;

function addCol(){
    
    size+=" 50px";
    grid.style.gridTemplateColumns = size;

    if(numOfRows == 0){
        numOfRows = 1;
        grid.innerHTML+=rowItem;
    } else {
        let total = document.getElementsByClassName("grid-item-row").length;
        for(let i = 0; i < total; i++){
            grid.innerHTML+=colItem;
        }
    }

    numOfColumns++;
}