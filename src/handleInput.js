import { canvas } from "./main";
import { ANIMATION, STEP } from "./pathfinding/constants";
import { createGrid, startSearch, setCells } from "./pathfinding/grid"

let btnPlay;
let btnStep;
let btnRandomize;
let txtSize;
let txtCells;
let txtSpeed;
let rangeSpeed;

let speed = 24;

const setupInput = () => {
    btnPlay = document.getElementById('play');
    btnStep = document.getElementById('step');
    btnRandomize = document.getElementById('random');
    txtSize = document.getElementById('size');
    txtCells = document.getElementById('cells');
    txtSpeed = document.getElementById('text-speed');
    rangeSpeed = document.getElementById('range-speed');

    btnPlay.addEventListener('click', onPlay(ANIMATION));
    btnStep.addEventListener('click', onPlay(STEP));
    btnRandomize.addEventListener('click', onRandomize);
    txtSize.addEventListener('change', onTxtSizeChange);
    txtCells.addEventListener('change', onTxtCellsChange);
    txtSpeed.addEventListener('change', onSpeedChange);
    rangeSpeed.addEventListener('change', onSpeedChange);
}

const onPlay = (type) => () => {
    const opts = {type, speed};

    startSearch(opts);
}

const onRandomize = () => {
    createGrid();
}

const onSpeedChange = (evt) => {
    rangeSpeed.value = evt.target.value;
    txtSpeed.value = rangeSpeed.value;
    speed = rangeSpeed.value;
}

const onTxtSizeChange = (evt) => {
    canvas.width = evt.target.value;
    canvas.height = evt.target.value;
}

const onTxtCellsChange = (evt) => {
    setCells(evt.target.value);
}

export default setupInput;