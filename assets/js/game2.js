let guessesLeft = 10;
// Write number of guesses into page
document.getElementById("guessesLeft").innerHTML = guessesLeft;

let wins = 0;
document.getElementById("wins").innerHTML = wins;

let losses = 0;
document.getElementById("losses").innerHTML = losses;

let wordList = [
    "TYRANNOSAURUS",
    "VELOCIRAPTOR",
    "PTERANODON",
    "STEGOSAURUS",
    "SPINOSAURUS",
    "ANKYLOSAURUS",
    "JURASSIC",
];

let wordLength = 0;

let gameStatus = "play";

// Set random word from word list
let currentWord = wordList[Math.floor(Math.random() * wordList.length)];
// Set number of blanks var to length of current word
let numberBlanks = currentWord.length
// Create array for correct guesses and blanks with number of blanks in current word
let blanksMixed = [];
for (i = 0; i < numberBlanks; i++) {
    blanksMixed[i] = "_"
}
blankWord.innerHTML = (blanksMixed.join(" "))
// Create array for wrong guesses
let wrongGuesses = [];


let startGame = function () {
    // Reset guesses to 10
    guessesLeft = 10;

}

let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

let imgTag = document.getElementById('end-image');
// Hide winning image
imgTag.setAttribute('class', 'hide')

// Check to see if letter guessed is in current word
let checkGuess = function (guess) {

    // If character entered is not A-Z
    if (!alphabet.includes(guess)) {
        alert("Enter a letter.")
    }
    
    // If guess has already been guessed
    else if (wrongGuesses.includes(guess) || blanksMixed.includes(guess)) {
        alert("Letter already guessed!");
    }

    // If Letter Guessed IS in the word
    else if (currentWord.includes(guess)) {
        console.log("Nice guess!")
        // Compares each letter to see if it matches guess
        for (i = 0; i < numberBlanks; i++) {
            // With guess if it matches
            if (guess == currentWord[i]) {
                blanksMixed[i] = guess
            }
        }
    }

    // If Letter Guessed is NOT in the word
    else {
        console.log("Guess again");
        wrongGuesses.push(guess);
        guessesLeft--;
        console.log(wrongGuesses);
        let lettersWrong = document.getElementById('letters-guessed');
        lettersWrong.innerHTML = wrongGuesses.join(", ");
    };
}

// Run funtction on letter press
document.onkeypress = function (event) {
    const letterGuessed = event.key.toUpperCase();
    console.log(letterGuessed)
    if (gameStatus = "play") {
    checkGuess(letterGuessed)
    afterGuess(); }
}

// Runs after each guess
let afterGuess = function () {
    // Updates display data
    blankWord.innerHTML = blanksMixed.join(" ");
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    // Checks remaining guesses to see if you lost
    if (guessesLeft == 0) {
        youLose();
    }
    // // Checks to see if any blanks are remaining and game is won
    if (!blanksMixed.includes("_")) {
        youWin()
    }
}

console.log(currentWord, numberBlanks)
console.log("assets/images/dinosaurs/" + currentWord + ".png")
let imgPath = "assets/images/dinosaurs/" + currentWord + ".png";


let youWin = function () {
    gameStatus = "over";
    // Update winning image
    imgTag.classList.remove('hide');
    imgTag.src = imgPath;
    // Play winning audio
    let audio = new Audio('assets/audio/' +  currentWord + ".wav");
    audio.play();
    // Pause for 2.5 seconds then reset game
    setTimeout(resetGame, 2500);
    wins++;
}

let youLose = function () {
    gameStatus = "over";
    // Update losing gifs
    imgTag.classList.remove('hide');
    imgTag.src = "assets/images/youlose.gif";
    // Play losing audio
    let losingAudio = new Audio('assets/audio/didntsaymagicwords.mp3.m4a');
    losingAudio.play();
    // Pause for 2.5 seconds then reset game
    setTimeout(resetGame, 2500);
    losses++;  
}



let resetGame = function () {
    gameStatus = "play";
    // Reset Blanks
    blanksMixed = [];
    // Reset word to new random word
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    // Fill correct number of blanks
    numberBlanks = currentWord.length;
    // Reset wrong guesses to empty array
    wrongGuesses = [];
    // Reset number of guesses left
    guessesLeft = 10;
    // Reset Image Path for winning image
    imgPath = "assets/images/dinosaurs/" + currentWord + ".png";
    // Emtpy Image
    imgTag.setAttribute('class', 'hide')
    // Update display data
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById('letters-guessed').innerHTML = wrongGuesses;
    for (i = 0; i < numberBlanks; i++) {
        blanksMixed[i] = "_"
    }
    document.getElementById("blankWord").innerHTML = blanksMixed.join(" ");
    console.log(currentWord, numberBlanks)
    
};

// Start New Game Button
let startButton = document.getElementById('reset-game');
startButton.onclick = resetGame;