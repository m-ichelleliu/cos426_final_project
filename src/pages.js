import INSTRUCTIONS from "./instructions.html"
import GAMEOVER from "./gameover.html"
import INIT from "./init.html"

export function init_page(document, canvas) {
    document.body.innerHTML = INIT;

}

export function start_game(document, canvas) {
    document.body.innerHTML = '';
    document.body.appendChild(canvas);

    let instructions = document.createElement('div');
    instructions.id = 'instructions';
    instructions.innerHTML = INSTRUCTIONS;
    document.body.appendChild(instructions);
    document.getElementById('pauseText').innerHTML = '';
    document.getElementById('resumeInstructions').innerHTML = "Press Space to Start!";
    instructions.classList.add('invisible')
}

export function quit(document, canvas) {
    let ending = document.createElement('div');
    ending.id = 'over';
    ending.innerHTML = GAMEOVER;
    document.body.appendChild(ending)
}

export function game_over(document, p1won) {
    // console.log("document", document)
    // console.log("document body", document.body)
    document.body.innerHTML = '';
    let over = document.createElement('div');
    over.id = 'over';
    over.innerHTML = GAMEOVER;
    let winner;
    if (p1won) {
        winner = "Player 1";
    } else {
        winner = "Player 2";
    }
    document.body.appendChild(over);
    document.getElementById('message').innerHTML = "Congratulations to " + winner + " for Winning!";
}