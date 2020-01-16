let cols = 10;
let rows = 10;
let grid = new Array(cols);

setup = () => {
	createCanvas(600, 600);
	makeEmptyGrid();
};

draw = () => {
	let nodeWidth = width / cols;
	drawGrid(nodeWidth);
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
