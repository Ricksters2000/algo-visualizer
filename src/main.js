import setupInput from './handleInput';
import pathfinding from './pathfinding/grid';
import setArray from './services/arrayMethods';

// let canvas, canvasContext;
const canvas = document.getElementsByTagName('canvas').item(0);
const canvasContext = canvas.getContext('2d');

let fps = 30;

const update = () => {
    pathfinding();
}

window.onload = () => {
    setupInput();

    setArray();

    setInterval(update, 1000 / fps);
}

export {canvas, canvasContext};