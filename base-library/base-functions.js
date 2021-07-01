const countRows = (level) => {
    return level.length
}
// based on the provided level, calculate the numer of columns
const countCols = (level) => {
    return level[0].length
}


// Helper function to remove an item from an array
function removeFromArray(arr, nodeToRemove) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == nodeToRemove) {
            arr.splice(i, 1);
        }
    }
}
// Manhattan distance
function heuristicManhattan(a, b) {
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j)
}

