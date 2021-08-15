import { colorRect } from "../services/graphicsCommon";

export class Tile {
    constructor(point, type) {
        this.point = new Point(point.x, point.y);
        this.type = type;
    }

    draw = (size, outline, outlineColor) => {
        const gap = size + outline;
        const x = this.point.x * gap;
        const y = this.point.y * gap;

        colorRect(x, y, size+outline, size+outline, outlineColor);
        colorRect(x+outline-1, y+outline-1, size, size, this.type);
    }
}

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals = (point) => {
        if(this.x === point.x && this.y === point.y)
            return true;
        return false;
    }
}

export class Cell {
    f = 0;
    g = 0;
    h = 0;
    parent = null;

    constructor(point) {
        this.p = new Point(point.x, point.y);
    }

    calculateDest = (dest) => {
        const dx = Math.abs(this.p.x - dest.x);
        const dy = Math.abs(this.p.y - dest.y);

        this.h = 1 * (dx + dy) + (Math.sqrt(2) - 2 * 1) * Math.min(dx, dy);
    }

    calculateF = (cell, dest) => {
        this.g = cell.g + 1;
        this.calculateDest(dest);
        this.f = this.g + this.h;
    }
}