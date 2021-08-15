import { Point } from "./classes";

//else return false
const inBounds = (grid, point) => {
    if(point.y >= 0 && point.y < grid.length &&
       point.x >= 0 && point.x < grid[point.y].length)
        return true;
    
    return false;
}

//return true if point is not out of bounds
//and is not on a wall
export const isValid = (grid, point, parent) => {
    //check if out of bounds
    if(inBounds(grid, point)) {
        //check if in a wall
        if(grid[point.y][point.x] !== 1) {
            //check if its diagonal from parent to check if 2 walls are blocking it
            if(point.x !== parent.x && point.y !== parent.y) {
                const nearX = new Point(parent.x + (point.x - parent.x), parent.y);
                const nearY = new Point(parent.x, parent.y + (point.y - parent.y));
                if(inBounds(grid, nearX) && inBounds(grid, nearY)) {
                    if(grid[nearX.y][nearX.x] === 1 && grid[nearY.y][nearY.x] === 1) {
                        return false;
                    }
                }
            }
            return true;
        }    
    }

    return false;
}

export const tracePath = (grid, cell) => {
    console.log(cell);
    let root = cell.parent;
    while(root.parent) {
        grid[root.p.y][root.p.x] = 4;
        root = root.parent;
    }
}