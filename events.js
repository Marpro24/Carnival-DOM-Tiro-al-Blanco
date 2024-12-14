//  Start Game

function startGame() {
  // Coge el valor del elmento input de nombre del form
  const playerName = document.getElementById("id_name").value;

  //Para lanzar la música cuándo le demos a Play
  const musicPlayer = document.getElementById("music-player");

  // Pone el nombre en el elemento de player name bienvenida
  document.getElementById("player_name").innerHTML = playerName;

  // Esconde player form
  document.getElementById("player_form").setAttribute("hidden", "");

  // Muestra en lugar el elemento de game play
  document.getElementById("game_play").removeAttribute("hidden");

  // Mostrar botones
  document.getElementById("start_button").removeAttribute("hidden");
  document.getElementById("reset_button").removeAttribute("hidden");

  // Reproductor de música
  document.getElementById("music-player").removeAttribute("hidden");

  musicPlayer.play();
}

document
  .getElementById("player_form_submit_button")
  .addEventListener("click", startGame);

// Botones start y reset

document.getElementById("start_button").setAttribute("hidden", "");
document.getElementById("reset_button").setAttribute("hidden", "");
