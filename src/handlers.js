import * as THREE from "three";

// handle user controls input
export function handleKeyDown(event, keypress) {
    if (event.key == "ArrowUp") keypress['up'] = true;
    if (event.key == "ArrowDown") keypress['down'] = true;
    if (event.key == "ArrowLeft") keypress['left'] = true;
    if (event.key == "ArrowRight") keypress['right'] = true;
}

// terminate the action caused by user controls input
export function handleKeyUp(event, keypress) {
    if (event.key == "ArrowUp") keypress['up'] = false;
    if (event.key == "ArrowDown") keypress['down'] = false;
    if (event.key == "ArrowLeft") keypress['left'] = false;
    if (event.key == "ArrowRight") keypress['right'] = false;
}

export function handlePlayerAControls(scene, keypress, playerA) {
    let playerA = scene.getObjectByName(playerA);
    let speed = 0.1;
    if (keypress['up']) {
        playerA.position.z -= speed;
    }
    if (keypress['down']) {
        playerA.position.z += speed;
    }
    if (keypress['left']) {
        playerA.position.x -= speed;
    }
    if (keypress['right']) {
        playerA.position.x += speed;
    }
}

export function handlePlayerBControls(scene, keypress, playerB) {
    let playerB = scene.getObjectByName(playerB);
    let speed = 0.1;
    if (keypress['w']) {
        playerA.position.z -= speed;
    }
    if (keypress['a']) {
        playerA.position.z += speed;
    }
    if (keypress['s']) {
        playerA.position.x -= speed;
    }
    if (keypress['d']) {
        playerA.position.x += speed;
    }
}