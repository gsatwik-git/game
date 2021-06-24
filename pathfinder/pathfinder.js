function findPath(level) { // actually, we don't need the end!
    function Spot(i, j) {
        this.i = i; // the X coordinate
        this.j = j; // the y coordinate
        this.f = 0; // the total score for this node, which we'll calculate later in the code
        this.g = 0; // the cost of getting to this node since the beginning
        this.h = 0; // the cost of getting from this node to the end.
        this.invalid = false; // whether or not this field is a valid move or not
        this.neighbors = []; // An array that holds all the neighbor nodes
        this.parent = undefined; // Here we'll store the node that we came from
        this.addNeighbors = function(grid) {
            let i = this.i; // did this just to not have to write this.i and this.j all the time
            let j = this.j;
            if (i < cols - 1) {
                this.neighbors.push(grid[i + 1][j]);
            }
            if (i > 0) {
                this.neighbors.push(grid[i - 1][j]);
            }
            if (j < rows - 1) {
                this.neighbors.push(grid[i][j + 1]);
            }
            if (j > 0) {
                this.neighbors.push(grid[i][j - 1]);
            }
        }
    }
  
    // based on the provided level, calculate the number of rows
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
    function heuristic(a, b) {
        return Math.abs(a.i - b.i) + Math.abs(a.j - b.j)
    }
    // setup
    let cols = countCols(level);
    let rows = countRows(level);
    let grid = new Array(cols);
    let openSet = [];
    let closedSet = [];
    let startNode;
    let end;
    let path = [];


    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
      }
  
    // Set up the grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j); // This creates a "spot" in our at the given i and j coordinates. 
        }
    }
  
    // set whether or not the Spot is valid or not
    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level.length; j++) {
            if (level[i][j] === fieldCharacter) { // if the variable is fieldCharacter
                grid[j][i].invalid = false; // set its invalid value in the grid of spots to false
            } else if (level[i][j] === hole) {
                grid[j][i].invalid = true;
            } else {
                grid[j][i].invalid = false;
            }
        }
    }
  
    // add the neighbors for each Spot
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }
  
    startNode = grid[0][0];
    end = grid[cols - 1][rows - 1];
    startNode.invalid = false;
    end.invalid = false;
  
    openSet.push(startNode); // initializing our openSet array with the starting node
  
    // While there's something in the openSet
    while (openSet.length != 0) {
        // Figuring out the "best" next move by comparing fScores
        let lowestFscore = 0; // index of the lowest fScore node
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestFscore].f) { // If the node at i's fScore is less than the winners
                lowestFscore = i; // set the winner to be the index of the this one
            }
        }
  
        var currentNode = openSet[lowestFscore];
  
        // If I finish, what do I do!?
        if (currentNode === end) {
            // noLoop(); // this is a p5.js function...
            console.log("Done")
        }
  
        // Move the best option from the openSet to closedSet
        removeFromArray(openSet, currentNode);
        closedSet.push(currentNode);
  
        // Check all the neighbors of the currentNode
        let neighbors = currentNode.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
  
            // Check if the next move is valid:
            if (!closedSet.includes(neighbor) && !neighbor.invalid) {
                let tempG = currentNode.g + heuristic(neighbor, currentNode) // we may get to the neighbor in "another" way, so we need to see if there's a better way actually...
  
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }
  
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = currentNode;
            }
        }
  
        path = [];
        let temp = currentNode;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }

        console.log(path);
  
        let nextThree = path.slice(Math.max(path.length - 4, 0))

        console.log(nextThree);
    }
  }


  
const hat = '^'.magenta;        // The item to find at the end of each level
const hole = 'O'.black;       // areas to avoid by the player. They will lose a life every time they land in one of these
const fieldCharacter = '░'.green;    // areas to walk through safely by the player 
const pathCharacter = '*'.blue;      // the player's position is indicated by this icon
const gap = 'X'.yellow // these are hurdles the player must pass by collecting a rope (~)
const rope = '~'.cyan     // this is a rope that 
let level1 = [[fieldCharacter,fieldCharacter,hole,fieldCharacter],[fieldCharacter,fieldCharacter,hole,fieldCharacter],[hole,fieldCharacter,fieldCharacter,hole],[fieldCharacter,hole,fieldCharacter,fieldCharacter]]

findPath(level1)