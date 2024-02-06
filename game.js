var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Event listener for keypress to start the game
$(document).keypress(function () {
  // Check if the game has already started
  if (!started) {
    // Update the level title and start the game
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Event listener for button clicks
$(".btn").click(function () {
  // Get the color of the clicked button
  var userChosenColour = $(this).attr("id");

  // Add the user's choice to the pattern
  userClickedPattern.push(userChosenColour);

  // Play sound and animate the button press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check the user's answer
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check if the user's answer is correct
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if the user has completed the sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Move to the next level after a delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play sound and display "Game Over" message
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove the "game-over" class after a delay
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Restart the game
    startOver();
  }
}

// Function to generate the next sequence
function nextSequence() {
  // Reset user's pattern for the new level
  userClickedPattern = [];

  // Increase the level and update the title
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random number and choose a color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  // Add the color to the game pattern and show the animation
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Play sound for the chosen color
  playSound(randomChosenColour);
}

// Function to animate a button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play a sound based on the color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
