let original = [];
const user = [];
const buttonColors = {
    1: "red",
    2: "blue",
    3: "yellow",
    4: "green"
};

let start = false;
let isShowingSequence = false;
let currentRound = 1;

function generateSequence() {
    return new Array(20).fill(0).map(() => Math.floor(Math.random() * 4) + 1);
}

function resetGameState() {
    start = false;
    isShowingSequence = false;
    currentRound = 1;
    user.length = 0;
}

function startGame() {
    original = generateSequence();
    start = true;
    isShowingSequence = false;
    currentRound = 1;
    user.length = 0;
    document.getElementById("guide").textContent = "Watch the pattern carefully.";
    playSequence();
}

document.addEventListener("click", () => {
    if (!start) {
        startGame();
    }
});

function blinkButton(id, delay) {
    setTimeout(() => {
        const button = document.getElementById(String(id));

        button.style.opacity = "0.5";
        button.style.backgroundColor = "black";

        setTimeout(() => {
            button.style.opacity = "1";
            button.style.backgroundColor = buttonColors[id];
        }, 400);
    }, delay);
}

function playSequence() {
    isShowingSequence = true;
    user.length = 0;

    let index = 0;
    
    for (index = 0; index < currentRound; index++) {
        blinkButton(original[index], (index+1) * 900);
    }

    setTimeout(() => {
        isShowingSequence = false;
       // console.log(`Round ${currentRound}: now click the buttons in the same order.`);
        document.getElementById("guide").textContent = `Round ${currentRound}: now click the buttons in the same order.`;
    }, (currentRound+1) * 900+ 500); 
}

function evalv(event, n) {
    event.stopPropagation();

    if (!start) {
        document.getElementById("guide").textContent = "Click on the page to start the game";
        return;
    }

    if (isShowingSequence) {
        document.getElementById("guide").textContent = "Wait for the blinking to finish";
      //  console.log("Wait for the blinking to finish");
        return;
    }

    if (n !== original[user.length]) {
        
        document.getElementById("guide").textContent = "Game Over! Click on Page to restart.";
        resetGameState();
        return;
    }

    // console.log(`${n} is correct`);
    document.getElementById("guide").textContent = `${n} is correct`;
    user.push(n);

    if (user.length === currentRound && currentRound < original.length) {
        currentRound += 1;
       // console.log(`Good job! Starting round ${currentRound}`);
        document.getElementById("guide").textContent = `Good job! Starting round ${currentRound}`;
        playSequence(); 
        return;
    }

    if (user.length === original.length) {
        document.getElementById("guide").textContent = "You won! Click on the page to play again.";
        resetGameState();
    }
}



