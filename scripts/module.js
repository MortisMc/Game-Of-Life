export function gridToArray(board, dimension, className){

  // Convert 1D html collection array to 2D array
  let islandArray = [];
  const htmlArray = [...board.children];
  while(htmlArray.length) islandArray.push(htmlArray.splice(0,dimension));

  islandArray = islandArray.map( row => {
    return row.map( x => {
      return x.classList.contains(className) ? 1 : 0;
    })
  })
  return islandArray;
}

export function arrayToGrid(board, className, islandArray){
  const elements = [...board.children]
  elements.forEach( x => {
    x.classList.remove(className);
  })

  islandArray.join(",").split(",").forEach( ( x, i ) => {
    if ( x == 1) elements[i].classList.add(className);
  })
}