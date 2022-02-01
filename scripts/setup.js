import { countIslands } from "./countIslands.js";
import { evolveGOL } from "./evolveGOL.js";


// Parameter setup
let dimension = 49;//parseInt(window.prompt("Choose a grid width from 1 to 100"));
while ( isNaN(dimension) || dimension < 1 || dimension > 100 ){
  dimension = parseInt(window.prompt("Error: Enter a number from 1 to 100"));
}
const SECONDS_PER_TURN = 0.1;

const numberOfSquares = dimension * dimension;
const className = "land";

// Setup CSS grid
const board = document.getElementById('board');
board.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
board.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;

// Create square element
const div = document.createElement("div");
div.classList.add("square");

// Add elements to grid
for (let i=0; i<numberOfSquares; i++){
  board.appendChild(div.cloneNode());
}

// Add event listeners
const squares = [...board.children];
squares.forEach( x => {
  // Left click - marker
  x.addEventListener( 'click', (e) => {
    e.target.classList.add(className);
    updateCount();
  })
  // Right click - eraser
  x.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.target.classList.remove(className);
    updateCount();
  });
})

// Play button
let PLAY = false;
let lastTime = 0;
document.getElementsByClassName("play")[0].addEventListener("click", () => {
  PLAY = true;
  window.requestAnimationFrame(loop);
})


// Reset button
document.getElementsByClassName("reset")[0].addEventListener("click", () => {
  PLAY = false;
  squares.forEach( x => x.classList.remove(className));
  document.getElementsByClassName("count")[0].innerHTML = 0;
})

// Update Count
function updateCount(){
  document.getElementsByClassName("count")[0].innerHTML = countIslands(board, dimension, className);
}

// Event loop
function loop(currentTime){
  // Check if game has been stopped
  if (!PLAY) return;

  // loop should be called in all following situations so call here. (the following lines are still carried out)
  window.requestAnimationFrame(loop)

  // Get time since last action
  let timeDifference = currentTime - lastTime

  // If not enough time has passed, recall loop()
  if (timeDifference < SECONDS_PER_TURN * 1000) return;

  // If enough time has passed, reassign lastTime
  lastTime = currentTime;

  // Make changes
  evolveGOL(board, dimension, className);
  updateCount();
}
