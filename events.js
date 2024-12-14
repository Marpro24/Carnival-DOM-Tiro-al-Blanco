//  Start Game

// Initiate a new game, not yet started.
let newGame = new Game();

function playGame() {
  // Coge el valor del elmento input de nombre del form
  const playerName = document.getElementById("id_name").value;

  // Pone el nombre en el elemento de player name bienvenida
  document.getElementById("player_name").innerHTML = playerName;

  // Start a new game and pass along the name of the player
  newGame.play(playerName)
  console.log(newGame)

  // Esconde player form
  document.getElementById("player_form").setAttribute("hidden", "");

  // Muestra en lugar el elemento de game play
//   document.getElementById("game_play").removeAttribute("hidden");
//Kat Aquí he borrado esto para "game_play" y lo he aplicado a "game_area_container", que engloba todo el area del juego

  // Kat - NEW Mostrar el area del juego
  document.getElementById("game_area_container").removeAttribute("hidden", "");

  // Mostrar botones
  document.getElementById("start_button").removeAttribute("hidden");
  document.getElementById("reset_button").removeAttribute("hidden");
  document.getElementById("timer-wrapper").removeAttribute("hidden");
  document.getElementById("score").removeAttribute("hidden");
}

document
  .getElementById("player_form_submit_button")
  .addEventListener("click", playGame);

// HIDDEN BUTTONS AND COUNTER

document.getElementById("start_button").setAttribute("hidden", "");
document.getElementById("reset_button").setAttribute("hidden", "");
document.getElementById("timer-wrapper").setAttribute("hidden", "");
document.getElementById("score").setAttribute("hidden", "");

// Kat sábado por la mañana
// Game-area hidden - contenedor nuevo que engloba todo el area del juego
document.getElementById("game_area_container").setAttribute("hidden", "");

function resetGame(){
  location.reload();
}

window.onload = function () {
  //startGame() // TODO remove this, temporary to not show the form every time ...
  var startButton = document.getElementById('start_button');
  var resetButton = document.getElementById('reset_button')
  //startButton.addEventListener('click', startCountdown);
  startButton.addEventListener('click', function () { newGame.start() });
  resetButton.addEventListener('click', resetGame);

  setTimeout(function () {
    document.getElementById('overlay').hidden = true
  }, 3000)
}

// Class that handles the state and every action for the game
function Game() {
  // these are all variables linked to the game and set to their default values
  this.score = 0;
  this.name = "";
  this.duckies
  this.timer = 10
  this.timerDisplay = document.querySelector('#time'); // this is the element that will show the timer
  this.isRunning = false

  // this is the entry point of the game. It will initialize all variables
  // - reset the score to zero
  // - set the name of the player
  // - add the necessary event listeners
  this.play = function (name) {
    this.score = 0
    this.name = name

    // these are all the duck targets
    this.duckies = document.querySelectorAll('#game_play input');
    // because we have a lot of ducks, we need to iterate over them and add the eventlistener click separately to each duck
    for (const duck of this.duckies) {
      duck.addEventListener('click', () => this.hit())
    }
  }

  // This will start the actual gameplay
  this.start = function (){
    // @TODO disable start button when gameplay has started or change with a restart ???

    this.isRunning = true
    // Run the timer.
    this.startTimer()
    // @TODO:
    // - the ducks need to be shown
    // - the score needs to be shown
  }

  this.startTimer = function (){
    // We can not use 'this' inside the setInterval as it is a different scope and 'this' will refer to the interval function and not the game one.
    // To circumvent this we copy it in a self constant so we can use that one.
    const self = this
    let minutes, seconds;
    // we save the identifier of the setInterval function so we later can stop it when we want it to stop.
    const id = setInterval(function () {
      minutes = parseInt(self.timer / 60, 10);
      seconds = parseInt(self.timer % 60, 10);
  
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      self.timerDisplay.textContent = minutes + ":" + seconds;

      let allDuckies = self.duckies.length
      for (const duck of self.duckies) {
        // for each duck we check if the checkbox is checked
        if (duck.checked === true) {
          // Every time a duckie is checked we decrease the amount of allDuckies
          allDuckies--
        }
      }

      // If our allDuckies equals 0 we know that there are no more duckies to be checked/hit and we can stop
      // the timer.
      if (allDuckies === 0) {
        clearInterval(id)
      }
  
      // When the timer goes below 0 (-1 because we actually count 11 :3) we stop the execution of the interval
      if (--self.timer <= -1) {
        // this function will stop the loop of the given identifier
        clearInterval(id)
        // Do whatever we want to do when the player loses the game.
        self.lostGame()
      }
    }, 1000);
  }

  // function to increase the score counter every time a duck is hit
  this.hit = function () {
    if (this.isRunning === false) {
      return
    }
    this.score += 1
    document.getElementById("score").innerHTML = this.score;

    // @TODO show +1s on hit through showing and hiding something on the background

    // loop over all of the ducks
    for (const duck of this.duckies) {
      // for each duck we check if the checkbox is unchecked
      if (duck.checked === false) {
        // if a checkbox is unchecked we know that there are still duckies not hit. so we can continue our game
        return
      }
    }

    // If we did not encounter any unchecked duckies this means they all have been hit and we can end the game as WON.
    this.wonGame()
  }

  // Everything related to a lost game goes here
  this.lostGame = function () {
    this.isRunning = false
    console.log('game over !!!!!!!!!!!')
    // @TODO : show a pop up that the player ran out of time.
    // note for myself: add here a reset or trigger an event
  }

  // Everything related to a won game goes here
  this.wonGame = function () {
    this.isRunning = false
    console.log('hooray you won!!')
    // @TODO : show a pop up that the player has won
  }
}