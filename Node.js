// x = the x location in the node grid
// y = the y location in the node grid
// state = 0 if its traversable, 1 if its an obstacle
// parent = the previous node that makes the shortest known path to this node
class Node {
	constructor(_x, _y) {
		this.x = _x;
        this.y = _y;
        this.fScore = Number.MAX_SAFE_INTEGER;
        this.gScore = Number.MAX_SAFE_INTEGER;
		this.state = 0;
		this.parent = null;
    }
}
