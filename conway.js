var ROW = 50;
var COL = 100;
var percentAlive = 15;
var randomNum = 0;
const oneRow = []
const board = [];
const nextBoard = [];
const canvas = document.querySelector('canvas');
canvas.width = 1000;
canvas.height = 500;
const cellSide = 10;
var ctx = canvas.getContext('2d');
var isPlay = 1;
var intervalID;

setBoard();
printBoard();


document.getElementById('Next').onclick = function() {
  play();
}
document.getElementById('Reset').onclick = function() {
  reset();
  printBoard();
}



document.getElementById('Play').onclick = function() {
  intervalID = setInterval(play, 750);
}
Pause.onclick = function(){
  clearInterval(intervalID)
}


function setBoard(){
  for(let j = 0; j < ROW; j++){
    for(let i = 0; i < COL; i++){
      randomNum = Math.floor((Math.random()) * 100);
      if(randomNum < percentAlive){
        oneRow.push('A');
      }
      else {
        oneRow.push('.');
      }//end if
    }//end for
    for(let z = 0; z < oneRow.length; z += COL){
      board.push(oneRow.slice(z, z + COL));
      nextBoard.push(oneRow.slice(z, z + COL));
    }//end for
  }//end for
  reset();
}//end function

function printBoard(){
    for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      let x = j * cellSide;
      let y = i * cellSide;

      cellColor = '#454241';

      if(board[i][j] == 'A'){
        cellColor = '#dedede';
      }
      ctx.beginPath();
      ctx.fillStyle = cellColor;
      ctx.fillRect(x,y,cellSide,cellSide);
    }
  }
}

//counts adjacent cells around current cell to see if they are alive
function countNeighbourAlive(x,y){
  var liveCount = 0;
  for(let i = x-1; i <= x+1; i++){
    //THIS FUCKING LINE COST ME 2 HOURS OF BUG FIXING fuck =<   < gang W
    for(let j = y-1; j <= y+1; j++){
      if((i == x && j == y) || (i < 0 || j < 0) || (i >= ROW || j >= COL)){
        continue;
      }
      else if(board[i][j] == 'A'){
        liveCount += 1;
      }
      
    }//end for j
  }//end for i
  return liveCount;
}//end function



function shiftCells(){
  var liveCount = 0;
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      liveCount = countNeighbourAlive(i,j);
      if(board[i][j] == 'A' && liveCount < 2){
        nextBoard[i][j] = '.';
      }
      else if(board[i][j] == 'A' && liveCount > 3){
        nextBoard[i][j] = '.';
      }
      else if(board[i][j] == '.' && liveCount == 3){
        nextBoard[i][j] = 'A';
      }
      else {
        nextBoard[i][j] = board[i][j];
      }
      
    }//end for j
  }//end for i
  
  //assign board the nextGens value as to reset it for next loop
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      board[i][j] = nextBoard[i][j];
    }
  }
}//end function

function reset(){
  for(let i = 0; i < ROW; i++){
    for(let j = 0; j < COL; j++){
      randomNum = Math.floor((Math.random()) * 100);
      if(randomNum < percentAlive){
        board[i][j] = 'A';
      }
      else {
        board[i][j] = '.'
      }//end if
    }//end for
  }//end for
}

function play(){
  shiftCells();
  printBoard();
}

function isEmpty(){
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board.length; j++){
      if(board[i][j] == 'A')
        return 1;
    }
  }
  return 0;
}