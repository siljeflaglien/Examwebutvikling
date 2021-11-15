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
}

const clicked = (index) =>{
    let object = gridArray[index];
    object.element.classList.remove('notClicked');
    object.state = nextMove;

    if(nextMove == 'X'){
        object.element.classList.add('x', 'contentColor');
    } else if(nextMove = 'O'){
        object.element.classList.add('o', 'contentColor');
    }
    nextMove == 'X' ? (nextMove = 'O') : (nextMove = 'X');
    object.element.onclick = function(){
        return false;
    }
    finnVinner();
}

const resetSpill = () => {
    nextMove = "X";
    for(let i = 0; i < 9; i++){
        let objekt = gridArray[i];
        gridArray[i].element.classList.remove('x', 'o', 'contentColor', 'vinnerColor');
        gridArray[i].element.classList.add('notClicked');
        gridArray[i].state = "";
        document.getElementById(i).onclick = function(){
            clicked(i);
        };
    }
}

const visResetKnapp = () => {
    document.getElementById('reset').style.visibility = "visible";
    document.getElementById('reset').onclick = function(){
        resetSpill();
    }
}

const finnVinner = () => {  
    for(let linje in vinnerLinjer){
        //Fiks indexene så man ikke trenger variablene.
        let plass1 = vinnerLinjer[linje][0];
        let plass2 = vinnerLinjer[linje][1];
        let plass3 = vinnerLinjer[linje][2];
        if(gridArray[plass1].state == gridArray[plass2].state && gridArray[plass1].state == gridArray[plass3].state){
            if(gridArray[plass1].state == 'X' || gridArray[plass1].state == 'O'){
                vinnerRad = linje;
                gameOver();
            }
        }
    }
}

function gameOver() {  
    for(let tall of vinnerLinjer[vinnerRad]){
        gridArray[tall].element.classList.add('vinnerColor');
        gridArray[tall].element.classList.remove('contentColor');
    }
    for(let i = 0; i < 9; i++){
        gridArray[i].element.classList.remove('notClicked');
        gridArray[i].element.onclick = function(){
            return false;
        }
    }
    visResetKnapp();
}

for(let index = 0; index < 9; index++){
    let div = document.createElement('div');
    div.classList.add('notClicked', 'cell');
    div.setAttribute('id', index);
    const cell = new GridCells(div, index);
    gridArray.push(cell);
    div.onclick = function(){
        clicked(index);
    }
    grid.appendChild(div);
};
