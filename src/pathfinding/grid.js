import aStar, { resetStep } from "./aStar";
import { canvas } from "../main";
import { colorRect } from "../services/graphicsCommon";
import { Point, Tile } from "./classes";
import { randomNum } from "../services/random";
import { STEP } from "./constants";

let rows = 10;
let cols = 10;

let size = 38;
let outline = 2;
let gap = size+outline;

let stepStarted = false;

let outlineColor = 'black';
let srcColor = 'blue';
let destColor = 'yellow';
let floorColor = 'white';
let wallColor = 'gray';
let pathColor = 'purple';
let prevPath = 'pink';
let possiblePath = 'red';

let chanceToSpawnWall = 25;
let src;
let dest;

let grid;
// let grid = [
//     [2,0,0,0,1,0,0,1,1,1],
//     [1,1,0,1,0,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0],
//     [0,0,0,0,0,0,0,1,1,1],
//     [1,1,1,0,0,0,1,1,0,0],
//     [1,1,1,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,1,1],
//     [3,0,0,0,0,0,0,0,0,0]
// ];

export const createGrid = () => {
    resetStep();

    src = new Point(randomNum(cols), randomNum(rows));
    dest = new Point(randomNum(cols), randomNum(rows));

    grid = new Array(rows);
    for(let r=0; r < rows; r++) {
        grid[r] = new Array(cols);
        for(let c=0; c < cols; c++) {
            if(src.equals(new Point(c, r))) {
                grid[r][c] = 2;
                continue;
            }
            if(dest.equals(new Point(c, r))) {
                grid[r][c] = 3;
                continue;
            }

            if(Math.random() * 100 > 100 - chanceToSpawnWall) {
                grid[r][c] = 1;
                continue;
            }
            grid[r][c] = 0;
        }
    }

    console.log(grid, src, dest, randomNum(cols));
}

const resetGrid = () => {
    grid = grid.map(r => {
        return r.map(c => {
            if(c > 3) return 0;
            return c;
        })
    })
}

export const startSearch = (opts) => {
    if(opts.type === STEP) {
        if(!stepStarted) {
            resetGrid();
            stepStarted = true;
        }
    } else {
        resetGrid();
        stepStarted = false;
    }
    console.log('step started', stepStarted);
    aStar(grid, src, dest, opts);
}

const setSize = () => {
    size = canvas.width / cols - outline;
}

export const setCells = (amt) => {
    rows = amt;
    cols = amt;

    grid = null;

    // console.log(rows, amt);
}

const getColor = (tile) => {
    switch(tile) {
        case 0:
            return floorColor;
        case 1:
            return wallColor;
        case 2:
            return srcColor;
        case 3:
            return destColor;
        case 4:
            return pathColor;
        case 5:
            return prevPath;
        case 6:
            return possiblePath;
    }
}

const drawGrid = () => {  
    if(!grid) createGrid();  
    // console.log(canvas);

    setSize();

    colorRect(0, 0, canvas.width, canvas.height, 'black');
    for(let r=0,y=0; r < rows; r++,y+=gap) {
        for(let c=0,x=0; c < cols; c++,x+=gap) {
            // drawTile(x, y, getColor(grid[r][c]));
            let tile = new Tile(new Point(c, r), getColor(grid[r][c]));
            tile.draw(size, outline, outlineColor);
        }
    }
}

export default drawGrid;