// Unrelated to A* algorithm
let cols = 50;
let rows = 50;
let grid = new Array(cols);
let isStart = false;

// Related to A* algorithm
let openSet = [];
let closedSet = [];
let start = null;
let target = null;

setup = () => {
	createCanvas(800, 800);
	makeEmptyGrid();
};

draw = () => {
	drawGrid(width / cols);
	if (!isStart) {
		// Draw the grid
		return;
	}
	// If openSet is empty, algorithm is done / no path found
	if (!openSet) {
		noLoop();
		return;
	}
	drawPath(width / cols);
	// If start and end aren't set yet, don't start algorithm

	// Find lowest f score cell
	let currCellIndex = lowestFScoreCellIndex();
	let currCell = openSet[currCellIndex];
	// Remove current cell from openSet array
	openSet.splice(currCellIndex, 1);

	// Add current cell to closedSet array
	closedSet.push(currCell);

	// If true, current = target -> path found!
	if (currCell === target) {
		noLoop();
	}

	let neighbours = getNeighbours(currCell);
	// For each neighbour
	for (let i = 0; i < neighbours.length; i++) {
		// If current neighbour is an obstacle, or is in closedSet, skip to next neighbour
		if (
			!neighbours[i] ||
			neighbours[i].state === 5 ||
			closedSet.indexOf(neighbours[i]) !== -1
		) {
			continue;
		}

		// The hueristic function is the distance from the neighbour to the target
		let hScore = neighbours[i].distanceFrom(target);

		// The g score is the distance from neighbour to the current cell + the path it took until now
		let newGScore =
			neighbours[i].distanceFrom(currCell) +
			(currCell.gScore === -1 ? 0 : currCell.gScore);

		let newFScore = newGScore + hScore;
		// If neighbour isn't in openSet or the new path is shorter than the known path, update it.
		if (
			neighbours[i].fScore === -1 ||
			openSet.indexOf(neighbours[i]) === -1 ||
			newFScore < neighbours[i].fScore
		) {
			neighbours[i].fScore = newFScore;
			neighbours[i].gScore = newGScore;
			neighbours[i].parent = currCell;
			if (openSet.indexOf(neighbours[i]) === -1) {
				openSet.push(neighbours[i]);
			}
		}
	}

	// Update the state of open and closed
	for (let i = 0; i < openSet.length; i++) {
		openSet[i].state = 1;
	}
	for (let i = 0; i < closedSet.length; i++) {
		closedSet[i].state = 2;
	}
};

keyPressed = () => {
	// If enter pressed and there is a start and target, start the algorithm
	if ((keyCode == ENTER || keyCode == 32) && start && target) {
		// Add start to the openSet
		openSet.push(start);
		isStart = true;
	}
};

mousePressed = () => {
	let cellWidth = width / cols;

	// Get the rect the mouse pressed
	let i = Math.floor(mouseX / cellWidth);
	let j = Math.floor(mouseY / cellWidth);
	// If start wasn't defined yet
	if (!start) {
		start = grid[j][i];
		start.state = 3;
	}
	// If target wasn't defined yet
	else if (!target) {
		target = grid[j][i];
		target.state = 4;
	}
};

mouseDragged = () => {
	let cellWidth = width / cols;

	// Get the rect the mouse pressed
	let i = Math.floor(mouseX / cellWidth);
	let j = Math.floor(mouseY / cellWidth);

	// Set obstacles only if algorithm hasn't started yet
	if (!isStart && grid[j][i].state !== 3 && grid[j][i].state !== 4) {
		grid[j][i].state = 5;
	}
};

getNeighbours = cell => {
	// Go through the adjacent cells and add them to neighbours array
	let neighbours = [];
	for (let i = cell.y - 1; i <= cell.y + 1; i++) {
		for (let j = cell.x - 1; j <= cell.x + 1; j++) {
			try {
				// Add only neighbours that are in the boundries and aren't in closedSet
				if (closedSet.indexOf(grid[i][j]) === -1) {
					neighbours.push(grid[i][j]);
				}
			} catch (error) {
				console.log("Tried adding a cell out of bounds");
			}
		}
	}
	return neighbours;
};

lowestFScoreCellIndex = () => {
	let lowestCellIndex = 0;
	for (let i = 0; i < openSet.length; i++) {
		let iFScore =
			openSet[i].fScore === -1 ? Number.MAX_SAFE_INTEGER : openSet[i].fScore;
		let lowestFscore =
			openSet[lowestCellIndex].fScore === -1
				? Number.MAX_SAFE_INTEGER
				: openSet[lowestCellIndex].fScore;

		if (iFScore < lowestFscore) {
			lowestCellIndex = i;
		}
	}
	return lowestCellIndex;
};

drawGrid = cellWidth => {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			// state = 0 -> not checked, 1 -> checking, 2 -> checked and closed,
			//3 -> start, 4 -> target, 5 -> obstacle
			if (grid[i][j].state === 0) {
				fill(255);
			} else if (grid[i][j].state === 1) {
				fill("rgb(20,150,200)");
			} else if (grid[i][j].state === 2) {
				fill("rgb(255,20,20)");
			} else if (grid[i][j].state === 3) {
				fill("rgb(109,200,109)");
			} else if (grid[i][j].state === 4) {
				fill("rgb(0,255,0)");
			} else if (grid[i][j].state === 5) {
				fill(0);
			}
			rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
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
			grid[i][j] = new Cell(j, i);
		}
	}
};

drawPath = cellWidth => {
	fill(255, 204, 100);
	let cell = openSet[lowestFScoreCellIndex()];
	while (cell != start) {
		rect(cell.x * cellWidth, cell.y * cellWidth, cellWidth, cellWidth);
		cell = cell.parent;
	}
};
