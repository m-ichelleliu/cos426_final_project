import * as THREE from "three";
import * as pages from "./pages.js"

import { Land as Land } from '/src/components/objects/Land/index.js';
import { PlayerA } from "./components/objects";

const DIRECTION_VECTOR =
{'N' : new THREE.Vector3(0,0,-1),
'E' : new THREE.Vector3(1,0,0),
'S' : new THREE.Vector3(0,0,1),
'W' : new THREE.Vector3(-1,0,0)
};

const DIRECTION_IDX =
{'N' : 0,
'E' : 1,
'S' : 2,
'W' : 3
};

// handle user controls input
// key pressed
export function handleKeyDown(event, keypress) {

    // player A controls
    if (event.key == "ArrowUp") keypress['up'] = true;
    if (event.key == "ArrowDown") keypress['down'] = true;
    if (event.key == "ArrowLeft") keypress['left'] = true;
    if (event.key == "ArrowRight") keypress['right'] = true;
    if (event.key == "m" || event.key == "M" ) keypress['m'] = true;
    if (event.key == "Enter") keypress['enter'] = true;

    // player B controls
    if (event.key == "w" || event.key == "W" ) keypress['w'] = true;
    if (event.key == "a" || event.key == "A" ) keypress['a'] = true;
    if (event.key == "s" || event.key == "S" ) keypress['s'] = true;
    if (event.key == "d" || event.key == "D" ) keypress['d'] = true;
    if (event.key == " ") keypress['space'] = true;
    if (event.key == "Shift") keypress['shift'] = true;
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

export function handlePlayerAControls(scene, keypress, character, timeStamp) {
    let playerA = scene.getObjectByName(character);
    let speed = playerA.state.speed;
    if (keypress['up']) {
        // check if reached bounds
        let newZ = playerA.position.z - speed;
        if (newZ < -1 * Land.height / 2 || newZ >= Land.height + 5) {
            newZ = playerA.position.z
        }
        playerA.position.z = newZ;
        playerA.state.direction = 'N';
    }
    if (keypress['down']) {
        let newZ = playerA.position.z + speed;
        // console.log(playerA.position.z);
        if (newZ < -1 * Land.height / 2 || newZ >= Land.height + 5)  {
            newZ = playerA.position.z
        }
        playerA.position.z = newZ;
        playerA.state.direction = 'S';
    }
    if (keypress['left']) {
        let newX = playerA.position.x - speed;
        // console.log(playerA.position.z);
        if (newX < -1 * Land.height / 2 - 1|| newX >= Land.height + 6)  {
            newX = playerA.position.x
        }
        playerA.position.x = newX;
        playerA.state.direction = 'W';
    }
    if (keypress['right']) {
        let newX = playerA.position.x + speed;
        // console.log(playerA.position.z);
        if (newX < -1 * Land.height / 2 - 5 || newX >= Land.height + 6)  {
            newX = playerA.position.x
        }
        playerA.position.x = newX;

        // // determine how much to turn player model
        // const rotationOffset = DIRECTION_IDX[playerA.state.direction] - DIRECTION_IDX['E'] * Math.PI/4;
        // playerA.rotation.y += rotationOffset;

        // update player direction
        playerA.state.direction = 'E';
        // console.log(playerA.state.direction);
    }

    // bind keys for jumping and shooting
    if (keypress['m']) {
        keypress['m'] = false;
        playerA.state.jump = true;
    }
    if (keypress['enter']) {
        keypress['enter'] = false;

        playerA.state.shoot = true;
    }

}

export function handlePlayerBControls(scene, keypress, character, timeStamp) {
    let playerB = scene.getObjectByName(character);
    let speed = playerB.state.speed;
    if (keypress['w']) {
        // check if reached bounds
        let newZ = playerB.position.z - speed;
        if (newZ < -1 * Land.height  || newZ >= Land.height + 1) {
            newZ = playerB.position.z
        }
        playerB.position.z = newZ;
        playerB.state.direction = 'N';
    }
    if (keypress['s']) {
        let newZ = playerB.position.z + speed;
        // console.log(playerA.position.z);
        if (newZ < -1 * Land.height || newZ >= Land.height + 1)  {
            newZ = playerB.position.z
        }
        playerB.position.z = newZ;
        playerB.state.direction = 'S';
    }
    if (keypress['a']) {
        let newX = playerB.position.x - speed;
        // console.log(playerA.position.z);
        if (newX < -1 * Land.height - 2|| newX >= Land.height )  {
            newX = playerB.position.x
        }
        playerB.position.x = newX;
        playerB.state.direction = 'W';
    }
    if (keypress['d']) {
        let newX = playerB.position.x + speed;
        // console.log(playerA.position.z);
        if (newX < -1 * Land.height - 2 || newX >= Land.height )  {
            newX = playerB.position.x
        }
        playerB.position.x = newX;
        playerB.state.direction = 'E';
    }

    if (keypress['space']) {
        keypress['space'] = false;
        playerB.state.jump = true;
    }
    if (keypress['shift']) {
        console.log("playerB shifted")
        keypress['shift'] = false;
        playerB.state.shoot = true;
    }

    // bind keys for jumping and shooting
}


export function handleScreens(event, screens, document, canvas, scene) {
    // // quit: game -> ending
    // if (event.key == 'q' && !screens['ending'] && !screens['menu']) {
    //     screens['menu'] = false;
    //     screens['pause'] = false;
    //     screens['ending'] = true;
    //     pages.game_over(document); // character: winner
    // }
    // restart: ending -> menu
    if (event.key == " " && screens["ending"]) {
        // reset game
        screens["ending"] = false;
        screens['pause'] = false;
        screens['menu'] = true;
        pages.init_page(document)
    }
    // start: menu -> game
    else if (event.key == " " && screens["menu"]) {
        screens["menu"] = false;
        pages.start_game(document, canvas);

        // clearTimeout(timer);

    }
    // unpause: pause -> game
    else if (event.key == 'p' && screens["pause"]) {
        screens["pause"] = false;

        let pause = document.getElementById("instructions");
        document.getElementById("pauseText").innerHTML = '';
        pause.classList.add('invisible');
    }
    // pause: game -> pause
    else if (event.key == 'p' && !scene.state.endGame ) {
        screens["pause"] = true;

        let pause = document.getElementById("instructions");
        document.getElementById("pauseText").innerHTML = "Game Paused";
        document.getElementById("resumeInstructions").innerHTML = "Press P to resume!";
        pause.classList.remove('invisible');
    }

}