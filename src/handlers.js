import * as THREE from "three";

// handle user controls input
export function handleKeyDown(event, keypress) {

    // player A controls
    if (event.key == "ArrowUp") keypress['up'] = true;
    if (event.key == "ArrowDown") keypress['down'] = true;
    if (event.key == "ArrowLeft") keypress['left'] = true;
    if (event.key == "ArrowRight") keypress['right'] = true;

    // player B controls
    if (event.key == "w") keypress['w'] = true;
    if (event.key == "a") keypress['a'] = true;
    if (event.key == "s") keypress['s'] = true;
    if (event.key == "d") keypress['d'] = true;
}

// terminate the action caused by user controls input
export function handleKeyUp(event, keypress) {
    // player A controls
    if (event.key == "ArrowUp") keypress['up'] = false;
    if (event.key == "ArrowDown") keypress['down'] = false;
    if (event.key == "ArrowLeft") keypress['left'] = false;
    if (event.key == "ArrowRight") keypress['right'] = false;

    // player B controls
    if (event.key == "w") keypress['w'] = false;
    if (event.key == "a") keypress['a'] = false;
    if (event.key == "s") keypress['s'] = false;
    if (event.key == "d") keypress['d'] = false;
}

export function handlePlayerAControls(scene, keypress, character) {
    let playerA = scene.getObjectByName(character);
    let speed = 0.1;
    if (keypress['up']) {
        // switch direction to into the page
        // move forward
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

    // bind keys for jumping and shooting
}

export function handlePlayerBControls(scene, keypress, character) {
    let playerB = scene.getObjectByName(character);
    let speed = 0.1;
    if (keypress['w']) {
        playerB.position.z -= speed;
    }
    if (keypress['s']) {
        playerB.position.z += speed;
    }
    if (keypress['a']) {
        playerB.position.x -= speed;
    }
    if (keypress['d']) {
        playerB.position.x += speed;
    }

    // bind keys for jumping and shooting
}