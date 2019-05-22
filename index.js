//jshint esversion:6

//answer options array
let dogNames = [
  "germanshepard",
  "bulldog",
  "poodle",
  "beagle",
  "doberman",
  "greyhound",
  "chihuahua",
  "husky",
  "dalmatian",
  "greatdane",
  "boxer",
  "dachshund",
  "goldenretriever",
  "jackrussellterrier",
  "labradorretriever",
  "pug",
  "shihtzu",
  "bordercollie"
];
//empty array for incorrect guessses
let wrongLettersGuessed = [];
//empty string to hold the answer and looping
let pickedWord = "";
//ease of use for split/join later. Splitting answer into individual substrings
let lettersInPickedWord = [];
//holds correctly guessed letters and empty blanks (_)
let answersArray = [];

// variables to keep track of game
let numberOfBlanks = 0;
let numberOfGuesses = 10;
let wins = 0;
let losses = 0;

//FUNCTIONS

function initializeRound() {
  //picking random answer from array, splitting the answer into an array and counting the length of the array to determine # of blanks
  pickedWord = dogNames[Math.floor(Math.random() * dogNames.length)];
  lettersInPickedWord = pickedWord.split("");
  numberOfBlanks = lettersInPickedWord.length;

  //reset variables/arrays for each game
  numberOfGuesses = 10;
  wrongLettersGuessed = [];
  answersArray = [];

  //fills up answers array with blanks
  for (i = 0; i < numberOfBlanks; i++) {
    answersArray.push("_");
  }

  //manipulating DOM elements on page
  document.getElementById("guessesAmount").innerHTML = numberOfGuesses;
  document.getElementById("letters").innerHTML = wrongLettersGuessed.join(" ");
  document.getElementById("word").innerHTML = answersArray.join(" ");
}

function checkGuesses(guess) {
  //trying something else
  let letterIsPresent = null;
  //loops through to see if guess is present
  for (i = 0; i < numberOfBlanks; i++) {
    if (pickedWord[i] === guess) {
      letterIsPresent = true;
    }
  }
  //if guess is present, loops through and replaces _ with the letter anytime it appears. If wrong and not already guessed, lose a guess and add to wrong letters array
  if (letterIsPresent) {
    for (a = 0; a < numberOfBlanks; a++) {
      if (pickedWord[a] === guess) {
        answersArray[a] = guess;
      }
    }
  } else if (wrongLettersGuessed.indexOf(guess) === -1) {
    wrongLettersGuessed.push(guess);
    numberOfGuesses--;
  }
}

//play sound upon winning or losing a round
function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

//runs after each player guess
function afterGuess() {
  //update HTML
  document.getElementById("guessesAmount").innerHTML = numberOfGuesses;
  document.getElementById("letters").innerHTML = wrongLettersGuessed.join(" ");
  document.getElementById("word").innerHTML = answersArray.join(" ");

  // converts back to string and check if answer matches or if player loses. Updates HTML and variables accordingly. Initializes new round at the end.
  if (lettersInPickedWord.join() === answersArray.join()) {
    playSound("correct");
    wins++;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("startGame").innerHTML = "You Got it!";
    document
      .querySelector("img#winningDog")
      .setAttribute("src", "images/" + pickedWord + ".png");
    initializeRound();
  } else if (numberOfGuesses == 0) {
    playSound("wrong");
    losses++;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
    document.getElementById("startGame").innerHTML = "Better Luck Next Time!";
    initializeRound();
  }
}

//RUNNING THE GAME (Note to self: if there is too much code in this section - add more functions)
initializeRound();

//check for player key clicks that are letters and then runs appropriate functions
document.addEventListener("keydown", function (event) {
  let key = event.key.toLowerCase();
  let isLetter = key >= "a" && key <= "z";
  if (key.length !== 1) {
    console.log(key);
  } else if (isLetter) {
    checkGuesses(key);
    afterGuess();
  }
});