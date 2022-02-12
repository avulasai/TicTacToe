// // state
// let initialState;
// function buildInitialState() {
// }
// // render
// function renderState() {

// }

// // maybe a dozen or so helper functions for tiny pieces of the interface

// // listeners
// function onBoardClick() {
//   // update state, maybe with another dozen or so helper functions...

//   renderState() // show the user the new state
// }
// // const board = document.getElementById('board');
// // board.addEventListener('click', onBoardClick); // etc


// // add to above
// function tick() {
//     // this is an incremental change that happens to the state every time you update...

//     renderState()
//   }

//   setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible

//   // now you might have things like
//   document.addEventListener('keydown', function (event) {
//     // here you might read which key was pressed and update the state accordingly
//   })

// console.log('clicked');

let player1color = document.getElementById('player1color').value;
let player2color = document.getElementById('player2color').value;
let evenoddcounter = 0;
let singleplayeractive = 0;
let gamewin = 0;

const player1button = document.getElementById('submit1')
const player2button = document.getElementById('submit2')
const tictactable = document.getElementById('tictable')
const boardsize = document.getElementById('boardsize')
const singleplayerbutton = document.getElementById('singleplayer')
const tictactable2 = document.getElementById('tictable2')
player1button.addEventListener('click', updatePlayerInfo);
player2button.addEventListener('click', updatePlayerInfo);
singleplayerbutton.addEventListener('click', updateSinglePlayerInfo);
tictactable2.addEventListener('click', colorize);
boardsize.addEventListener('click', makeTicTacToe);
let boardsizenumber = boardsizevalue.value;
let player1name = document.getElementById('name1').value;
let player2name = document.getElementById('name2').value;
// tictactable.addEventListener('click', colorize);
// selectOpt.addEventListener('change', selectedOption)
// console.log(player1button);

// function renderState() {
//   colorize();
//   console.log('clicked render')
// }

function playerinfochecks() {
  let winnertext = document.getElementById('finalwinner')
  if (player1color == player2color) {
    winnertext.innerHTML = "Please choose different colors before proceeding"
    return "error";
  }
  else { winnertext.innerHTML = "" }
  if (player1name == "") {
    winnertext.innerHTML = "Please choose a player1";
    return "error";
  }
  else { winnertext.innerHTML = "" }
  if (player2name == "") {
    winnertext.innerHTML = winnertext.innerHTML && " Please choose a player2";
    return "error";
  }
  else { winnertext.innerHTML = "" }
  if (player2name == "" || player1name == "") {
    winnertext.innerHTML = winnertext.innerHTML && " Please choose players";
    return "error";
  }
  else { winnertext.innerHTML = "" }

}

function updatePlayerInfo() {
  makeTicTacToe()
  player1name = document.getElementById('name1').value;
  player2name = document.getElementById('name2').value
  player1color = document.getElementById('player1color').value
  player2color = document.getElementById('player2color').value
  const player1 = document.getElementById('player1message');
  player1.innerHTML = "welcome " + player1name + " You chose color :  " + player1color;
  const player2 = document.getElementById('player2message');
  player2.innerHTML = "welcome " + player2name + " You chose color :  " + player2color;
  if (playerinfochecks() == "error") { return "error" }

}

function updateSinglePlayerInfo() {
  makeTicTacToe()
  singleplayeractive = 1;
  player1name = document.getElementById('name1').value;
  player2name = "computer"
  document.getElementById('name2').value = player2name;
  player1color = document.getElementById('player1color').value
  if (player1color == "red") {
    player2color = "green"
    document.getElementById('player2color').value = player2color;
  }
  if (player1color == "green") {
    player2color = "red"
    document.getElementById('player2color').value = player2color;
  }
  const player1 = document.getElementById('player1message');
  player1.innerHTML = "welcome " + player1name + " You chose color :  " + player1color;
  const player2 = document.getElementById('player2message');
  player2.innerHTML = "Computer chose color :  " + player2color;
  if (playerinfochecks() == "error") { return "error" }
}

function colorize(event) {
  const target = event.target;
  let eventCell = target.tagName;
  evenoddcounter = evenoddcounter + 1;
  let finalwin;
  if (playerinfochecks() == "error") { return "error" }
  if (gamewin === 0) {
    if (eventCell === "TD" && (evenoddcounter % 2 == 1)) {
      target.className = player1color;
      target.innerHTML = "X";
      finalwin = checkWhowon(target.innerHTML);
    }
    if (eventCell === "TD" && (evenoddcounter % 2 == 0)) {
      target.className = player2color;
      target.innerHTML = "O";
      finalwin = checkWhowon(target.innerHTML);
    }
    console.log(finalwin);
    if (singleplayeractive === 1 && !finalwin) {
      callcomputer()
    }
  }
  else {
    document.getElementById('finalwinner').innerHTML = "Game Over. Reset to Play Again"
  }
}

function callcomputer() {
  let tictactable2 = document.getElementById('tictable2');
  let filled = 0;
  for (let r = 0; r < boardsizenumber; r++) {
    for (let c = 0; c < boardsizenumber; c++) {
      if (filled != 1
        && tictactable2.rows[r].cells[c].className == player1color
        && tictactable2.rows[r + 1].cells[c].className == player1color
        && ((r + 2) < boardsizenumber)
        && tictactable2.rows[r + 2].cells[c].className != player2color) {
        tictactable2.rows[r + 2].cells[c].className = player2color;
        tictactable2.rows[r + 2].cells[c].innerHTML = "O";
        evenoddcounter = evenoddcounter + 1;
        filled = 1;
        return "filled"
      }
      if (filled != 1
        && tictactable2.rows[r].cells[c].className != player1color
        && tictactable2.rows[r].cells[c].className != player2color) {
        tictactable2.rows[r].cells[c].className = player2color;
        tictactable2.rows[r].cells[c].innerHTML = "O";
        evenoddcounter = evenoddcounter + 1;
        filled = 1;
        return "filled"
      }
    }

  }

}

function makeTicTacToe() {
  gamewin = 0;
  evenoddcounter = 0;
  let winnertext = document.getElementById('finalwinner')
  winnertext.innerHTML = "";
  var Parent = tictactable2;
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  let boardsizevalue = document.getElementById('boardsizevalue');
  boardsizenumber = boardsizevalue.value;
  for (let j = 0; j < boardsizenumber; j++) {
    const row = document.createElement('tr')
    for (let i = 0; i < boardsizenumber; i++) {
      const td = document.createElement('td')
      row.appendChild(td)
      td.className = 'beige';
    }
    tictactable2.appendChild(row);
  }
}
function checkWhowon(oddoreven) {
  let winnertext = document.getElementById('finalwinner')
  let wincolor = 'beige';
  console.log(evenoddcounter + boardsizenumber);
  if (evenoddcounter === (boardsizenumber * boardsizenumber)) {
    winnertext.innerHTML = "The Game is a Draw. Play Again";
    gamewin = 1;
    return true;
  }
  if (oddoreven === 'X') {
    wincolor = player1color;
    if (rowwinner(wincolor) === "winner" || colwinner(wincolor) === "winner" || diawinner(wincolor) === "winner") {
      winnertext.innerHTML = "winner is " + player1name;
      gamewin = 1;
      return true
    }
  }
  if (oddoreven === 'O') {
    wincolor = player2color;
    if (rowwinner(wincolor) === "winner" || colwinner(wincolor) === "winner" || diawinner(wincolor) === "winner") {
      winnertext.innerHTML = "winner is " + player2name;
      gamewin = 1;
      return true
    }
  }
  return false;
}

function rowwinner(wincolor) {
  let boardsizevalue = document.getElementById('boardsizevalue');
  let boardsizenumber = boardsizevalue.value;
  let rowwincolor = wincolor;
  let tictactable2 = document.getElementById('tictable2');
  for (let r = 0; r < boardsizenumber; r++) {
    let wincount = 0
    for (let c = 0; c < boardsizenumber; c++) {

      if (tictactable2.rows[r].cells[c].className === rowwincolor) {
        wincount = wincount + 1;
      }
      console.log("row" + tictactable2.rows[r].cells[c].innerHTML + wincount + boardsizenumber + wincolor);
      if (wincount == boardsizenumber) {
        return "winner"
      }
    }


  }
  return ("keep playing");
}

function colwinner(wincolor) {
  let boardsizevalue = document.getElementById('boardsizevalue');
  let boardsizenumber = boardsizevalue.value;
  let rowwincolor = wincolor;
  let tictactable2 = document.getElementById('tictable2');
  let r = 0;
  for (let c = 0; c < boardsizenumber; c++) {
    let wincount = 0
    for (let r = 0; r < boardsizenumber; r++) {
      if (tictactable2.rows[r].cells[c].className == rowwincolor) {
        wincount = wincount + 1;
        console.log("col" + tictactable2.rows[r].cells[c].innerHTML + wincount + boardsizenumber + wincolor);
        if (wincount == boardsizenumber) { return "winner" }
      }

    }

  }
  return "keep playing"
}

function diawinner(wincolor) {
  let boardsizevalue = document.getElementById('boardsizevalue');
  let boardsizenumber = boardsizevalue.value;
  let rowwincolor = wincolor;
  let tictactable2 = document.getElementById('tictable2');
  let b = boardsizenumber;
  let wincount = 0
  for (let c = 1; c <= b; c++) {
    if (tictactable2.rows[b - c].cells[b - c].className == rowwincolor) {
      wincount = wincount + 1;
      console.log("dia1" + tictactable2.rows[b - c].cells[b - c].innerHTML + wincount + boardsizenumber + wincolor);
      if (wincount == boardsizenumber) { return "winner" }
    }

  }
  wincount = 0;
  for (let c = 1, r = 0; c <= b; c++, r++) {
    if (tictactable2.rows[b - c].cells[r].className == rowwincolor) {
      wincount = wincount + 1;
      console.log("dia2" + tictactable2.rows[b - c].cells[r].innerHTML + wincount + boardsizenumber + wincolor);
      if (wincount == boardsizenumber) { return "winner" }
    }

  }

  return "keep playing"
}






/* some player info checks
let winnertext = document.getElementById('finalwinner')
if (player1color==player2color) {
  winnertext.innerHTML = "Please choose different colors before proceeding"
  return "Please choose different colors before proceeding";
}
else {winnertext.innerHTML = ""}
if (player1name == "") {
  winnertext.innerHTML = "Please choose a player1";
  return "Please enter players before proceeding";
}
else {winnertext.innerHTML = ""}
if (player2name == "") {
  winnertext.innerHTML = " Please choose a player2";
  return "Please enter players before proceeding";
}
else {winnertext.innerHTML = ""}
if (player2name == "" || player1name == "") {
  winnertext.innerHTML = " Please choose players";
  return "Please enter players before proceeding";
}
else {winnertext.innerHTML = ""}
 finish player info checks*/