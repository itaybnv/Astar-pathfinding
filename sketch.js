// Unrelated to A* algorithm
let cols = 10;
let rows = 10;
let grid = new Array(cols);

// Related to A* algorithm
let openSet = [];
let closedSet = [];
let start = null;
let target = null;

setup = () => {
	createCanvas(600, 600);
	makeEmptyGrid();

	// Set static end and start for testing
	start = grid[2][2];
	target = grid[6][8];

	// Add start to the openSet
	openSet.push(start);
};

draw = () => {
	// Draw the grid
	drawGrid(width / cols);

	// If openSet is empty, algorithm is done / no path found
	if (!openSet) {
		noLoop();
		return;
	}
	// If start and end aren't set yet, don't start algorithm

	// Find lowest f score node
	let currNodeIndex = lowestFScoreNodeIndex();
	let currNode = openSet[currNodeIndex];

	// Remove current node from openSet array
	openSet.splice(currNodeIndex, 1);

	// Add current node to closedSet array
	closedSet.push(currNode);

	// If true, current = target -> path found!
	if (currNode === target) {
		drawPath(width / cols);
		noLoop();
	}

	let neighbours = getNeighbours(currNode);
	// For each neighbour
	for (let i = 0; i < neighbours.length; i++) {
    if (!neighbours[i]){
      continue;
    }

		// If current neighbour is an obstacle, or is in closedSet, skip to next neighbour
		if (neighbours[i].state === 1 || closedSet.indexOf(neighbours[i]) !== -1) {
			continue;
		}

		let hScore = getHScore(neighbours[i]);
		// This comes from the assumption that every step takes 1 cost
		// no matter in what direction the step was taken in
		let newGScore = 1 + currNode.newGScore;
		let newFScore = newGScore + hScore;
		if (
			openSet.indexOf(neighbours[i]) === -1 ||
			newFScore < neighbours[i].fScore
		) {
			neighbours[i].fScore = newFScore;
			neighbours[i].parent = currNode;
			if (openSet.indexOf(neighbours[i]) === -1) {
				openSet.push(neighbours[i]);
			}
		}
	}
};

getHScore = node => {
	// The heuristic function is the distance from the center of the node to the target
	let nodeCenter = {
		x: node.x + width / (rows * 2),
		y: node.y + height / (cols * 2)
	};
	let targetCenter = {
		x: target.x + width / (rows * 2),
		y: node.y + height / (cols * 2)
	};

	return Math.sqrt(
		Math.pow(nodeCenter.x - targetCenter.x, 2) +
			Math.pow(nodeCenter.y - targetCenter.y, 2)
	);
};

getNeighbours = node => {
	// Go through the adjacent nodes and add them to neighbours array
	let neighbours = [];

	//   THIS INCLUDES CORNERS
	// for (let i = node.y - 1; i <= node.y + 1; i++) {
	// 	for (let j = node.x - 1; j < node.x + 1; j++) {
	// 		// Add only neighbours that are in the boundries and aren't in closedSet
	// 		if (closedSet.indexOf(grid[i][j]) === -1) {
	// 			try {
	// 				neighbours.push(grid[i][j]);
	// 			} catch (error) {
	// 				console.log("Tried adding a node out of bounds");
	// 			}
	// 		}
	// 	}
	// }
	try {
		neighbours.push(grid[node.y - 1][node.x]);
	} catch (error) {
		console.log("Edge");
	}
	try {
		neighbours.push(grid[node.y + 1][node.x]);
	} catch (error) {
		console.log("Edge");
	}
	try {
		neighbours.push(grid[node.y][node.x - 1]);
	} catch (error) {
		console.log("Edge");
	}
	try {
		neighbours.push(grid[node.y][node.x + 1]);
	} catch (error) {
		console.log("Edge");
	}

	return neighbours;
};

lowestFScoreNodeIndex = () => {
	let lowestNodeIndex = 0;
	for (let i = 0; i < openSet; i++) {
		if (openSet[i].fScore < openSet[lowestNodeIndex].fScore) {
			lowestNodeIndex = i;
		}
	}

	return lowestNodeIndex;
};

drawGrid = nodeWidth => {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (grid[i][j].state === 0) {
				fill(255);
			} else fill(0);
			rect(j * nodeWidth, i * nodeWidth, nodeWidth, nodeWidth);
		}
	}
};

makeEmptyGrid = () => {
	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	clearGrid();
};

clearGrid = () => {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Node(j, i);
		}
	}
};

drawPath = nodeWidth => {
  fill(255, 204, 100);
  let node = target;
  while(node != start) {
    rect(node.x * nodeWidth, node.y * nodeWidth, nodeWidth, nodeWidth);
    node = node.parent;
  }
}
