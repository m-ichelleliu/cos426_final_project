import INSTRUCTIONS from "./instructions.html"
// import GAMEOVER from "./gameover.html"

export function init_page(document) {
    document.body.innerHTML = '';
    // document.body.appendChild(menuCanvas);
    let main = document.createElement('div');
    main.id = 'main';
    main.innerHTML = INSTRUCTIONS;
    document.body.appendChild(main);
}

export function start_game(document, canvas) {
    document.getElementById('main').remove();
    document.body.appendChild(canvas);
}

export function game_over(document, p1won) {
    document.body.innerHTML = '';
    let over = document.createElement('div');
    over.id = 'over';
    // over.innerHTML = GAMEOVER;
    let winner;
    if (p1won) {
        winner = "Player 1";
    } else {
        winner = "Player 2";
    }
    document.getElementById('message').innerHTML = "Congratulations to " + winner + " for Winning!";
}