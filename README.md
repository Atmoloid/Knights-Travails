# Knights-Travails

Knights-Travails is a JavaScript project that calculates the shortest path for a knight to move from one position to another on a chessboard.

## Description

The project uses a tree structure to represent the knight's possible moves and employs a breadth-first search algorithm to find the shortest path from the start position to the target position.

## Features

- Calculates valid moves for a knight on a chessboard
- Finds the shortest path using breadth-first search
- Prints the path and the move tree

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Atmoloid/Knights-Travails.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Knights-Travails
   ```

### Usage

1. Open the `script.js` file and modify the `startCoordinates` and `targetCoordinates` variables to set the desired start and target positions:
   ```javascript
   const startCoordinates = [3, 3];
   const targetCoordinates = [4, 3];
   ```

2. Run the script:
   ```bash
   node script.js
   ```

3. The output will display the move tree and the shortest path in the console.

## Code Breakdown

### Node Class
```javascript
class Node {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.children = [];
        this.moves = [
            [1, -2], [-1, -2], [1, 2], [-1, 2],
            [-2, 1], [-2, -1], [2, 1], [2, -1],
        ];
    }
}
```
- Represents each position as a node with possible knight moves.

### Helper Functions
```javascript
function addArrays(arr1, arr2) {
    return [arr1[0] + arr2[0], arr1[1] + arr2[1]];
}

function inRange(arr) {
    return arr[0] >= 0 && arr[0] <= 7 && arr[1] >= 0 && arr[1] <= 7;
}

function areEqual(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}
```
- Provides utility functions for adding coordinates, checking valid ranges, and comparing coordinates.

### Main Logic
```javascript
function findValidMoves(prevCoordinates, moves) {
    return moves.map(move => addArrays(prevCoordinates, move)).filter(inRange);
}

function createNode(currentCoordinates, targetCoordinates) {
    const root = new Node(currentCoordinates);
    const queue = [{ node: root, coordinates: currentCoordinates, path: [currentCoordinates] }];

    while (queue.length > 0) {
        const { node, coordinates, path } = queue.shift();
        if (areEqual(coordinates, targetCoordinates)) {
            return { node: root, path };
        }

        const validMoves = findValidMoves(coordinates, node.moves);
        validMoves.forEach(currentMove => {
            const childNode = new Node(currentMove);
            node.children.push(childNode);
            const newPath = [...path, currentMove];
            queue.push({ node: childNode, coordinates: currentMove, path: newPath });
        });
    }

    return { node: root, path: [] };
}
```
- Implements BFS to find the shortest path from start to target coordinates.

### Output Functions
```javascript
const prettyPrint = (node, prefix = "", isLast = true) => {
    if (node === null) {
        return;
    }
    console.log(`${prefix}${isLast ? "└── " : "├── "}[${node.coordinates.join(", ")}]`);
    const childCount = node.children.length;
    node.children.forEach((child, index) => {
        const isChildLast = index === childCount - 1;
        prettyPrint(child, `${prefix}${isLast ? "    " : "│   "}`, isChildLast);
    });
};

const printPath = (path) => {
    const moves = path.length;
    console.log(`Shortest path in ${moves - 1} moves:`);
    path.forEach(coordinates => {
        console.log(`[${coordinates[0]},${coordinates[1]}]`);
    });
};
```
- Functions to print the move tree and path.

### Example Usage
```javascript
const startCoordinates = [3, 3];
const targetCoordinates = [4, 3];
const { node, path } = createNode(startCoordinates, targetCoordinates);
prettyPrint(node);
printPath(path);
```
- Demonstrates how to use the functions to find and print the shortest path.
