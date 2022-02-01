import { gridToArray } from "./module.js";

export function countIslands( board, dimension, className ){

  // Takes the html grid element and returns an array that maps out cells of class "className"
  const islandArray = gridToArray(board, dimension, className);

  // Looks through the array for land
  let numberOfIslands = 0;
  for (let row=0; row<dimension; row++ ){
    for (let column=0; column<dimension; column++){
      
      // Ignores water
      if ( !islandArray[row][column] ) continue;
      
      // Search through the island and remove the land cells from the islandArray
      removeIsland( row, column, islandArray);

      // Add the single-cell/multi-cell island to the tally
      numberOfIslands++;
    }
  }

  return numberOfIslands;
}

function removeIsland( row, column, islandArray) {
  // Function removes all land cells connected to the cell defined by the coordinates (removes from islandArray)

  // Remove current land cell from the islandArray
  islandArray[row][column] = 0;

  // Looks through 3x3 grid surrounding the current cell and recalls the function on neighbours until island is removed
  for(let i=-1; i<=1; i++ ){
    for(let j=-1; j<=1; j++){
      const x = row+i;
      const y = column+j;
      if ( !islandArray[x] ) continue; // Ignores undefined cells
      if ( islandArray[x][y] ) removeIsland( x, y, islandArray); // Recalls the function on neighbours
    }
  }
  
  // The current and connected cells have been removed so can safely return
  return;
}