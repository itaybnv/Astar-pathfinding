// x = the x location in the node grid
// y = the y location in the node grid
// state = 0 -> not checked, 1 -> checking, 2 -> checked and closed, 3 -> start, 4 -> target, 5 -> obstacle
// parent = the previous node that makes the shortest known path to this node
class Node {
	constructor(_x, _y) {
		this.x = _x;
		this.y = _y;
        this.fScore = -1;
        this.gScore = -1;
		this.state = 0;
		this.parent = null;
	}

	distanceFrom = node => {
		let thisCenter = {
			x: this.x + width / (rows * 2),
			y: this.y + height / (cols * 2)
		};
		let nodeCenter = {
			x: node.x + width / (rows * 2),
			y: node.y + height / (cols * 2)
		};

		return Math.sqrt(
			Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2)
		);
	};
}
