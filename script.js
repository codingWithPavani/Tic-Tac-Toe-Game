let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");
let rePlay = document.querySelector("#replay");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let bg_music = document.getElementById("bg-music");
let click_sound = document.getElementById("click-sound");
let winning_sound = document.getElementById("winning-sound");
let draw_sound = document.getElementById("draw-sound");


// let player1 = prompt("enter player1 name:");
// let player2 = prompt("enter player2 name:");


let startBtn = document.querySelector("#start-btn");
let gameContainer = document.querySelector(".game-container");

let isMuted = false;

function toggleMusic() {
    if (isMuted) {
        bg_music.play();
        document.getElementById("musicIcon").innerHTML = '<img src="unmute.png">'
    } else {
        bg_music.pause();
        document.getElementById("musicIcon").innerHTML = '<img src="mute.png">'
    }
    isMuted = !isMuted;
}



startBtn.addEventListener('click', () => {
    player1 = prompt("Enter Player 1 name:") || "Player 1";
    player2 = prompt("Enter Player 2 name:") || "Player 2";
    bg_music.play();
  
    startBtn.classList.add('hide');
    gameContainer.classList.remove('hide'); // show the game container
});



let turnO = true;



let winningPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];

window.onload = () => {
    bg_music.volume = 0.2;
    bg_music.play();
}


boxes.forEach((box) => {
    box.addEventListener('click',() => {
        
        click_sound.play();
        
        if(turnO){
            box.innerText = "O";
            turnO= false;
            
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        
        let allFilled = [...boxes].every(box => box.innerText !== "");
        
          if (allFilled && !checkWinner()) {
            
                setTimeout(() => {
                    msg.innerText = `It's a Draw!`;
                    msgContainer.classList.remove("hide");
                    draw_sound.play();
                },600);  
                    disableBoxes();
                    turnO = true;
                        
            }

    });
});

const newGame = () => {
    player1 = prompt("Enter Player 1 name:") || "Player 1";
    player2 = prompt("Enter Player 2 name:") || "Player 2";

    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}
const replayGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
   setTimeout(() => {
    winning_sound.play();
    msg.innerText = `Congratulations, Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");

},500)  
    disableBoxes();

}


const checkWinner = () => { 
    for(let pattern of winningPatterns){
           let pos1Val = boxes[pattern[0]].innerText
           let pos2Val = boxes[pattern[1]].innerText
           let pos3Val = boxes[pattern[2]].innerText

          if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                let winnerName = (pos2Val === "O") ? player1 : player2;
                showWinner(winnerName);


                return true;
                
                
            }
           
          }
    }  return false;
  
};




newGameBtn.addEventListener('click',newGame);
resetBtn.addEventListener('click',resetGame);
rePlay.addEventListener('click',replayGame);


