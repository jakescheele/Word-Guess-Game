let guessesLeft = 10;
// Write number of guesses into page
document.getElementById("guessesLeft").innerHTML = guessesLeft;

let wins = 0;
document.getElementById("wins").innerHTML = wins;

let losses = 0;
document.getElementById("losses").innerHTML = losses;

let wordList = [
    "TYRANNOSAURS",
    "VELOCIRAPTOR",
    "PTERANODON",
    "STEGOSAURUS",
    "SPINOSAURUS",
    "ANKYLOSAURUS",
    "JURASSIC",
    "PREHISTORIC",
    "FOSSIL",
];

let wordLength = 0;

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
    checkGuess(letterGuessed)

    afterGuess();
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


let youWin = function () {
    alert("Congrats! You won!");
    wins++;
    resetGame();
}

let youLose = function () {
    setTimeout(youLose, 5000);
    alert("You lose!")
    losses++;
    resetGame();
}



let resetGame = function () {
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

