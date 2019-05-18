//jshint esversion:6

//empty array to keep track of letters the player has already guessed
let dogNames = ["germanshepard", "bulldog", "poodle", "beagle", "doberman", "greyhound", "chihuahua", "husky", "greatdane", "maltese", "boxer", "dachshund", "shibainu", "bloodhound", "terrier", "labradorretriever", "pug", "shihtzu", "bordercollie", "pomeranian"];
//for incorrect guessses
let lettersGuessed = [];

// variables to keep track of game
let numberOfGuesses = 10;
let wins = 0;
let losses = 0;


//FUNCTIONS


//RUNNING THE GAME (Note to self: if there is too much code in this section - add more functions)