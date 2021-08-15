import { Point, Cell } from "./classes";
import { ANIMATION, STEP } from "./constants";
import { isValid, tracePath } from "./helpers";

let currentStep;

export const resetStep = () => currentStep = null;

const checkSuccessor = (grid, open, closed, successor, parent, dest) => {
    if(isValid(grid, successor, parent.p) && !closed[successor.y][successor.x]) {
        let cell = new Cell(successor);
        cell.parent = parent;
        if(successor.equals(dest)) {
            console.log('done');
            tracePath(grid, cell);
            return true;
        }

        cell.calculateF(parent, dest);
        const openIndex = open.findIndex(c => cell.p.equals(c.p));
        if(openIndex !== -1 && open[openIndex].f < cell.f) return false;
        const closedCell = closed[cell.p.y][cell.p.x];
        if(closedCell && closedCell.f < cell.f) return false;

        if(openIndex !== -1) open = open.filter((c, i) => i !== openIndex);
        open.push(cell);
    } else
    return false;
}

const aStar = (grid, src, dest, opts) => {
    let t;
    let prevQ;

    let open = [];
    let closed = new Array(grid.length).fill(0).map(a => new Array(grid.length));
    let done = false;
    
    open.push(new Cell(src));

    const step = () => {
        if((done || open.length <= 0) && t) {
            clearInterval(t);
            return;
        }

        //get the cell with the min f and pop it from the open list
        //then set that cell to q
        let minF = {v: Infinity, i: -1};
        let q;
        open.forEach((c, i) => {
            if(!c.p.equals(src)) grid[c.p.y][c.p.x] = 6;

            if(c.f < minF.v) {
                minF.v = c.f;
                minF.i = i;
            }
        })
        // console.log('open list:', open)
        q = open[minF.i];
        if(!q.p.equals(src)) grid[q.p.y][q.p.x] = 4;
        if(prevQ && !prevQ.equals(src) && !prevQ.equals(q.p)) grid[prevQ.y][prevQ.x] = 5;
        prevQ = new Point(q.p.x, q.p.y);

        //remove q from the open list
        open = open.filter((c, i) => i !== minF.i);
    
        //north
        if(checkSuccessor(grid, open, closed, new Point(q.p.x, q.p.y-1), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
        //south
        if(checkSuccessor(grid, open, closed, new Point(q.p.x, q.p.y+1), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
        //east
        if(checkSuccessor(grid, open, closed, new Point(q.p.x+1, q.p.y), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
        //west
        if(checkSuccessor(grid, open, closed, new Point(q.p.x-1, q.p.y), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
        //north-east
        if(checkSuccessor(grid, open, closed, new Point(q.p.x+1, q.p.y-1), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
        //north-west
        if(checkSuccessor(grid, open, closed, new Point(q.p.x-1, q.p.y-1), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
        //south-east
        if(checkSuccessor(grid, open, closed, new Point(q.p.x+1, q.p.y+1), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
        //south-west
        if(checkSuccessor(grid, open, closed, new Point(q.p.x+1, q.p.y+1), q, dest)) {
            console.log(open, closed);
            done = true;
            return;
        }
    
        closed[q.p.y][q.p.x] = q;
        if(opts.type === STEP)
            currentStep = {open, closed, prevQ};
    }

    switch(opts.type) {
        case STEP:
            if(currentStep) {
                open = currentStep.open;
                closed = currentStep.closed;
                prevQ = currentStep.prevQ;
            } else {
                if(open.length > 0)
                    step();
            }
            console.log(open, closed, currentStep)
            if(open.length > 0)
                step();
            break;
        case ANIMATION:
            currentStep = null;
            t = setInterval(step, 1000 / opts.speed);
            if(open.length <= 0) {
                clearInterval(t);
            }
            break;
        default:
            console.log(`pace: ${opts} doesnt exist`);
    }
}

export default aStar;