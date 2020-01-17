// x = the x location in the cell grid
// y = the y location in the cell grid
// state = 0 -> not checked, 1 -> checking, 2 -> checked and closed, 3 -> start, 4 -> target, 5 -> obstacle
// parent = the previous cell that makes the shortest known path to this cell
class Cell {
	constructor(_x, _y) {
		this.x = _x;
		this.y = _y;
        this.fScore = -1;
        this.gScore = -1;
		this.state = 0;
		this.parent = null;
	}

	distanceFrom = cell => {
		let thisCenter = {
			x: this.x + width / (rows * 2),
			y: this.y + height / (cols * 2)
		};
		let cellCenter = {
			x: cell.x + width / (rows * 2),
			y: cell.y + height / (cols * 2)
		};

		return Math.sqrt(
			Math.pow(this.x - cell.x, 2) + Math.pow(this.y - cell.y, 2)
		);
	};
}
