// let scope = document.querySelector(".scope");

//  //scope movement
//  document.scope.addEventListener("mousemove", (e) => {
//     scope.style.left = e.pageX-150+ "px";
//     scope.style.top = e.pageY-150+ "px";
//   });

var timeLeft = 30;
var elem = document.getElementById('some_div');
var timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        doSomething();
    } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

function doSomething() {
    alert("Hi");
}