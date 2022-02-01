import { gridToArray, arrayToGrid } from "./module.js";

// Main function ######################################################################################################

export function evolveGOL(board, dimension, className){
  let islandArray = gridToArray(board, dimension, className);


  islandArray = addCellLayer(islandArray);

  islandArray =   updateCells(islandArray);

  cropCells(islandArray);

  arrayToGrid(board, className, islandArray);
  return;
}

// Stage functions ######################################################################################################

function addCellLayer(inputMatrix){
  // Surround the matrix in dead cells so edge cases can be handled with the normal logic

  // Add columns by extending the rows
  const rowsExtended = inputMatrix.map( x => {
    x.unshift(0);
    x.push(0);
    return x
  })
  
  // Add rows 
  const deadRow = new Array(rowsExtended[0].length).fill(0);
  rowsExtended.unshift(deadRow)
  rowsExtended.push(deadRow)
  return rowsExtended;
}

function updateCells(inputMatrix) {
  const outputMatrix = deadMatrixClone(inputMatrix);
  // Cycle through all cells and check if it will live or die
  for ( let rowIndex = 0; rowIndex < inputMatrix.length; rowIndex++ ){
    for ( let columnIndex = 0; columnIndex < inputMatrix[0].length; columnIndex++ ){
      const aliveNeighbours = countNeighbours(inputMatrix, rowIndex, columnIndex);
      outputMatrix[rowIndex][columnIndex] = deadOrAlive(inputMatrix[rowIndex][columnIndex], aliveNeighbours);
    }
  }
  return outputMatrix;
}

function cropCells(inputMatrix) {
  inputMatrix.pop();
  inputMatrix.shift();
  inputMatrix.map( x => {
    x.pop();
    x.shift();
    return x;
  })
}

// Dependent functions ######################################################################################################

function deadMatrixClone(inputMatrix){
  const deadMatrix = inputMatrix.map( x => {
    return x.map( x => {
      return 0;
    })
  })
  return deadMatrix
}

function countNeighbours(inputMatrix, rowIndex, columnIndex) {
  const status = inputMatrix[rowIndex][columnIndex] // Records whether the cell is dead or alive      
  let aliveNeighbours = 0
  // Check number of living neighbours
  for (let neighbourRowIndex = -1; neighbourRowIndex <= 1; neighbourRowIndex++){
    for (let neighbourColumnIndex = -1; neighbourColumnIndex <= 1; neighbourColumnIndex++){
      // The indices are added -1, 0, or +1 to access the cells' neighbours
      const row = inputMatrix[rowIndex + neighbourRowIndex];
      if (!row) continue; // undefined rows are ignored
      aliveNeighbours += row[columnIndex + neighbourColumnIndex] || 0; // If element is undefined, add zero
    }
  }
  aliveNeighbours -= status; // The count process includes the cell itself in the count so its status must be subtracted
  return aliveNeighbours;
}

function deadOrAlive(status, neighbours) {
  if (neighbours == 3) return 1;
  if (neighbours == 2 && status == 1) return 1;
  return 0;
}