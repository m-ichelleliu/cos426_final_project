import * as THREE from "three";

import { Land as Land } from '/src/components/objects/Land/index.js';

// handle user controls input
// key pressed
export function handleKeyDown(event, keypress) {

    // player A controls
    if (event.key == "ArrowUp") keypress['up'] = true;
    if (event.key == "ArrowDown") keypress['down'] = true;
    if (event.key == "ArrowLeft") keypress['left'] = true;
    if (event.key == "ArrowRight") keypress['right'] = true;
    if (event.key == "m" || event.key == "M" ) keypress['m'] = true;

    // player B controls
    if (event.key == "w" || event.key == "W" ) keypress['w'] = true;
    if (event.key == "a" || event.key == "A" ) keypress['a'] = true;
    if (event.key == "s" || event.key == "S" ) keypress['s'] = true;
    if (event.key == "d" || event.key == "D" ) keypress['d'] = true;
    if (event.key == " ") keypress['space'] = true;

}

// terminate the action caused by user controls input
// key released
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
    let speed = playerA.state.speed;
    if (keypress['up']) {
        // check if reached bounds
        // const newZ = playerA.position.z - speed;
        // if (newZ < -1 * Land.height / 2 || newPos.x >= Land.width / 2) {
        //     this.direction = new THREE.Vector3(this.direction.x * -1, 0, 0);
        // }
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
    if (keypress['m']) {
        keypress['m'] = false;
        playerA.state.jump = true;
    }

}

export function handlePlayerBControls(scene, keypress, character) {
    let playerB = scene.getObjectByName(character);
    let speed = playerB.state.speed;
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

    if (keypress['space']) {
        keypress['space'] = false;
        playerB.state.jump = true;
    }

    // bind keys for jumping and shooting
}