const original =new Array(20).fill(0).map(() => Math.floor(Math.random() * 4) + 1);
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

document.addEventListener("click", () => {
    
        start = true;
        currentRound = 1;
        user.length = 0;
        playSequence();
    

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
        blinkButton(original[index], index * 800);
    }

    setTimeout(() => {
        isShowingSequence = false;
       // console.log(`Round ${currentRound}: now click the buttons in the same order.`);
        document.getElementById("guide").textContent = `Round ${currentRound}: now click the buttons in the same order.`;
    }, currentRound * 950);
}

function evalv(n) {
    if (!start) {
       // console.log("Press Enter to start the game");
        document.getElementById("guide").textContent = "Press Enter to start the game";
        return;
    }

    if (isShowingSequence) {
        document.getElementById("guide").textContent = "Wait for the blinking to finish";
      //  console.log("Wait for the blinking to finish");
        return;
    }

    if (n !== original[user.length]) {
        document.getElementById("guide").textContent = "Game Over! Press Enter to restart.";
       // console.log("Game Over");
        start = false;
        currentRound = 1;
        user.length = 0;
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
        document.getElementById("guide").textContent = "You won! Press Enter to play again.";
      //  console.log("You won!");
        start = false;
        currentRound = 1;
        user.length = 0;
    }
}




