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

function addArrays(arr1,arr2) {
    return [arr1[0] + arr2[0],arr1[1] + arr2[1]];
}

function inRange(arr) {
    return arr[0] >= 0 && arr[0] <= 7 && arr[1] >= 0 && arr[1] <= 7;
}

function areEqual(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
  }

//need to refix

function findValidMoves (prevCoordinates, moves){
    return moves.map(move => addArrays(prevCoordinates, move)).filter(inRange)
}

// compile all in one

function createNode (currentCoordinates, targetCoordinates) {

    const root = new Node (currentCoordinates);

    const queue = [{node: root, coordinates: currentCoordinates, path: [currentCoordinates] }];

    while (queue.length > 0){

        const { node, coordinates, path } = queue.shift();

        if(areEqual(coordinates, targetCoordinates)){
            return {node: root, path};
        }

        const validMoves = findValidMoves (coordinates, node.moves);

        validMoves.forEach(currentMove => {
            const childNode = new Node (currentMove);
            node.children.push(childNode);

            const newPath = [...path, currentMove];

            queue.push({node: childNode, coordinates: currentMove, path: newPath});
        })
    }

    return {node: root, path: []};
}

const prettyPrint = (node, prefix = "", isLast = true) => {
    if (node === null) {
        return;
    }

    // Print current node
    console.log(`${prefix}${isLast ? "└── " : "├── "}[${node.coordinates.join(", ")}]`);

    // Iterate over the children of the current node
    const childCount = node.children.length;
    node.children.forEach((child, index) => {
        // Recursively print each child
        const isChildLast = index === childCount - 1;
        prettyPrint(child, `${prefix}${isLast ? "    " : "│   "}`, isChildLast);
    });
};

const printPath = (path) => {
    const moves = path.length;
    console.log(`Shortest path in ${moves-1} moves:`);
    path.forEach(coordinates => {
        console.log(`[${coordinates[0]},${coordinates[1]}]`);
    })
};


// Example usage
const startCoordinates = [3, 3];
const targetCoordinates = [4, 3];
const {node, path} = createNode(startCoordinates, targetCoordinates);

// Print the tree
prettyPrint(node);
printPath(path);
