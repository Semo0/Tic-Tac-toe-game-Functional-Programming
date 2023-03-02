const cells = document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["","","","","","","","",""];
let currentPlyer="X";
let running=false;
init();


function init(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent= `${currentPlyer}'s turn`;
    running=true;

}
function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");

    if(options[cellIndex]!="" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();


}
function updateCell(cell,index){
    options[index]=currentPlyer;
    cell.textContent =currentPlyer;
   

}

function restartGame(){
    currentPlyer="X";
    options=["","","","","","","","",""];
    statusText.textContent=`${currentPlyer}'s turn`;
    cells.forEach(cell=> cell.textContent="");
    running=true;

   

}
function changeTurn(){

currentPlyer=(currentPlyer=="X") ? "O" : "X";
    statusText.textContent=`${currentPlyer}'s turn`;
}


function checkWinner(){
    let roundWon=false;

    for(let i=0; i < winConditions.length; i++){
        const conditon =winConditions[i];
        const cellA= options[conditon[0]];
        const cellB= options[conditon[1]];
        const cellC= options[conditon[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon=true;
            break;

        }

    }
    if(roundWon){
        statusText.textContent= `${currentPlyer} Wins`;
        running=false;

    }else if(!options.includes("")){
        statusText.textContent= `Draw !!`
    }
    else{
        changeTurn();
    }

}