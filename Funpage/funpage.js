let grid = document.getElementById("grid");
let nextMove = 'X';

const gridArray = [];
let vinnerRad = [];
const vinnerLinjer = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8] 
]

class GridCells{
    constructor(element, index){
        this.element = element;
        this.index = index;
        this.state = "";
    }
    clicked(){
        this.element.style.backgroundColor = "transparent";
        this.element.classList.remove('notClicked');
        this.state = nextMove;
        this.element.querySelector('p').innerHTML = nextMove;
        nextMove == 'X' ? (nextMove = 'O') : (nextMove = 'X');
        this.element.onclick = function(){
            return false;
        }
        vinner();
        if(vinner()){
            console.log('Tre på rad med ' + this.state);
        }
    }
}

function vinner() {
    
    for(let linje in vinnerLinjer){
        let plass1 = vinnerLinjer[linje][0];
        let plass2 = vinnerLinjer[linje][1];
        let plass3 = vinnerLinjer[linje][2];
        if(gridArray[plass1].state == gridArray[plass2].state && gridArray[plass1].state == gridArray[plass3].state){
            if(gridArray[plass1].state == 'X'){
                vinnerRad = linje;
                gameOver();
            } else if (gridArray[plass1].state == 'O'){
                return true;
            } else {
                return false;
            }
        }
    }
}

function uavgjort() {  
}

function gameOver() {  
    for(let tall of vinnerLinjer[vinnerRad]){
        gridArray[tall].element.classList.add('vinner');
    }
}

for(let index = 0; index < 9; index++){
    let div = document.createElement('div');
    div.classList.add('notClicked', 'cell');
    div.appendChild(document.createElement('p'));
    const cell = new GridCells(div, index);
    gridArray.push(cell);
    div.onclick = function(){
        cell.clicked();
    }
    grid.appendChild(div);
};
