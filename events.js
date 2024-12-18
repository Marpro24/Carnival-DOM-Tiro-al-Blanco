const rulesPopup = document.getElementById("rules-popup");
function openRules() {
  document.getElementById("rules-popup").style.display = "block";
}

let newGame = new Game();

const form = document.getElementById("player_form");
const errorMessagesDiv = document.getElementById("errorMessages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = [];
  const name = document.getElementById("id_name").value.trim();

  if (name.length < 3) {
    errors.push("Your name must contain a minimum of 3 characters");
  }
  const isValid = /^[a-zA-Z\s]+$/.test(name);
  if (!isValid) {
    errors.push("Your name cannot contain special characters");
  }

  if (errors.length > 0) {
    errorMessagesDiv.innerText = errors[0];
    const audio = new Audio("/images/audio/validation_name.mp3");
    audio.play();
  } else {
    errorMessagesDiv.innerText = "";
    document.getElementById("rules-popup").style.display = "block";
    playGame();
  }
});

function playGame() {
  const playerName = document.getElementById("id_name").value;

  document.getElementById("player_name").innerHTML = playerName;

  newGame.play(playerName);

  document.getElementById("player_form").setAttribute("hidden", "");

  document.getElementById("game_area_container").removeAttribute("hidden", "");

  function animateDucks() {
    const initiateGame = document.getElementById("game_play");
    initiateGame.classList.add("animate");
  }

  document
    .getElementById("start_button")
    .addEventListener("click", animateDucks);

  document.getElementById("start_button").removeAttribute("hidden");
  document.getElementById("reset_button").removeAttribute("hidden");
  document.getElementById("timer-wrapper").removeAttribute("hidden");
  document.getElementById("score").removeAttribute("hidden", "");
  document.getElementById("music-player").removeAttribute("hidden");
}

document.getElementById("start_button").setAttribute("hidden", "");
document.getElementById("reset_button").setAttribute("hidden", "");
document.getElementById("timer-wrapper").setAttribute("hidden", "");
document.getElementById("score").setAttribute("hidden", "");
document.getElementById("alert-message").setAttribute("hidden", "");
document.getElementById("game_area_container").setAttribute("hidden", "");

function resetGame() {
  newGame.stop();
  newGame.play();
}

window.onload = function () {
  var startButton = document.getElementById("start_button");
  var resetButton = document.getElementById("reset_button");
  startButton.addEventListener("click", function () {
    newGame.start();
  });
  resetButton.addEventListener("click", resetGame);

  setTimeout(function () {
    document.getElementById("overlay").hidden = true;
  }, 3000);
};

function Game() {
  this.score = 0;
  this.name = "";
  this.duckies;
  this.timer = 10;
  this.timerId;
  this.timerDisplay = document.querySelector("#time");
  this.audioBackground = document.getElementById("music-player");
  this.alertMessage = document.getElementById("alert-message");
  this.isRunning = false;
  this.succesfulHit = new Audio("/images/audio/shoot_winning.wav");
  this.missHit = new Audio("/images/audio/shoot.mp3");
  this.plusOnes = document.querySelectorAll(".plus-one");

  this.stop = function () {
    this.audioBackground.pause();

    this.score = 0;
    document.getElementById("score").innerHTML = this.score;

    this.timer = 10;
    this.timerDisplay.textContent = "0:10";
    clearInterval(this.timerId);

    // Uncheck all duckies
    for (const duck of document.querySelectorAll("#game_play input")) {
      duck.checked = false;
    }

    this.isRunning = false;
  };

  this.play = function (name) {
    this.score = 0;
    this.name = name;

    this.duckies = document.querySelectorAll("#game_play input");
    for (const duck of this.duckies) {
      duck.addEventListener("click", () => this.hit());
    }

    const self = this;
    document
      .getElementById("game_area")
      .addEventListener("click", function (event) {
        if (self.isRunning === false) {
          return;
        }
        if (event.target.classList.contains("duck")) {
          return;
        }

        if (event.target.tagName === "INPUT") {
          self.succesfulHit.play();
          return;
        } else {
          self.missHit.play();
        }
      });
  };

  this.start = function () {
    this.isRunning = true;
    this.startTimer();
    this.audioBackground.play();

    const audio = new Audio("/images/audio/go.wav");
    audio.play();
  };

  this.startTimer = function () {
    const self = this;
    let minutes, seconds;
    this.timerId = setInterval(function () {
      minutes = parseInt(self.timer / 60, 10);
      seconds = parseInt(self.timer % 60, 10);

      seconds = seconds < 10 ? "0" + seconds : seconds;

      self.timerDisplay.textContent = minutes + ":" + seconds;

      let allDuckies = self.duckies.length;
      for (const duck of self.duckies) {
        if (duck.checked === true) {
          allDuckies--;
        }
      }

      if (allDuckies === 0) {
        clearInterval(self.timerId);
      }

      if (--self.timer <= -1) {
        clearInterval(self.timerId);
        self.lostGame();
      }
    }, 1000);
  };

  this.hit = function () {
    if (this.isRunning === false) {
      return;
    }
    this.score += 1;
    document.getElementById("score").innerHTML = this.score;

    this.alertMessage.removeAttribute("hidden");

    const self = this;
    setTimeout(function () {
      self.alertMessage.setAttribute("hidden", "");
    }, 400);

    const maxHeight = window.screen.availHeight;
    const maxWidth = window.screen.availWidth;
    for (const plusOne of this.plusOnes) {
      plusOne.hidden = false;
      plusOne.style.top = Math.floor(Math.random() * (maxHeight + 1)) + "px";
      plusOne.style.left = Math.floor(Math.random() * (maxWidth + 1)) + "px";
    }

    setTimeout(() => {
      for (const plusOne of this.plusOnes) {
        plusOne.hidden = true;
      }
    }, 500);

    for (const duck of this.duckies) {
      if (duck.checked === false) {
        return;
      }
    }

    this.wonGame();
  };

  this.lostGame = function () {
    this.isRunning = false;
    console.log("Game over!");

    const losePopup = document.createElement("div");
    losePopup.id = "lose-popup";
    losePopup.classList.add("popup-lose");
    losePopup.innerHTML = `
      <button class="closepopupsButtons" id="closeLosePopup">X</button>
      <img id="duckieLose" src="/images/duckie_lose.svg" alt="You lose!">
      <h2>You lose!</h2>`;

    document.body.appendChild(losePopup);

    const closeLosePopupButton = document.getElementById("closeLosePopup");
    closeLosePopupButton.addEventListener("click", () => {
      losePopup.setAttribute("hidden", "");
      window.location.reload();
    });

    const audio = new Audio("/images/audio/you_lose.wav");
    audio.play();
  };

  this.wonGame = function () {
    this.isRunning = false;
    console.log("you won!");

    const winPopup = document.createElement("div");
    winPopup.id = "win-popup";
    winPopup.classList.add("popup-won");
    winPopup.innerHTML = `
    <button class="closepopupsButtons" id="closeWinPopup">X</button>
    <img id="duckieWin" src="/images/duckie_win.svg" alt="You win!">
    <h2>You win!</h2>`;
    document.body.appendChild(winPopup);

    const closeWinPopupButton = document.getElementById("closeWinPopup");
    closeWinPopupButton.addEventListener("click", () => {
      winPopup.setAttribute("hidden", "");
      resetGame();
    });

    const audio = new Audio("/images/audio/you_win.wav");
    audio.play();
  };
}

function closeRules() {
  document.getElementById("rules-popup").style.display = "none";
}
document
  .getElementById("close-rules-button")
  .addEventListener("click", closeRules);
