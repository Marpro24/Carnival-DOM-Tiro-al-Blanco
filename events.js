// let scope = document.querySelector(".scope");

//  //scope movement
//  document.scope.addEventListener("mousemove", (e) => {
//     scope.style.left = e.pageX-150+ "px";
//     scope.style.top = e.pageY-150+ "px";
//   });

// var timeLeft = 30;
// var elem = document.getElementById('some_div');
// var timerId = setInterval(countdown, 1000);

// function countdown() {
//     if (timeLeft == -1) {
//         clearTimeout(timerId);
//         doSomething();
//     } else {
//         elem.innerHTML = timeLeft + ' seconds remaining';
//         timeLeft--;
//     }
// }

// function doSomething() {
//     alert("Hi");
// }

function startGame() {
    // Coge el valor del elmento input de nombre del form
    const playerName = document.getElementById("id_name").value;

    // Pone el nombre en el elemento de player name bienvenida
    document.getElementById("player_name").innerHTML = playerName;

    // Esconde player form
    document.getElementById("player_form").setAttribute("hidden", "");

    // Muestra en lugar el elemento de game play
    document.getElementById("game_play").removeAttribute("hidden");
}

document.getElementById("player_form_submit_button").addEventListener("click", startGame);

