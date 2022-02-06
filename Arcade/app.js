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

const player1color = 'red';
const player2color = 'green';
let evenoddcounter = 0;

const player1button = document.getElementById('submit1')
const player2button = document.getElementById('submit2')
const tictactable = document.getElementById('tictable')
const boardsize = document.getElementById('boardsize')
const tictactable2 = document.getElementById('tictable2')
player1button.addEventListener('click', updatePlayerInfo)
player2button.addEventListener('click', updatePlayerInfo)
// tictactable.addEventListener('click', colorize);
tictactable2.addEventListener('click', colorize);
boardsize.addEventListener('click', makeTicTacToe);
// selectOpt.addEventListener('change', selectedOption)
// console.log(boardsize);

function renderState() {
  colorize();
  console.log('clicked render')
}

function colorize(event) {
  const target = event.target;
  let eventCell = target.tagName;
  evenoddcounter = evenoddcounter + 1;
  if (eventCell === "TD" && (evenoddcounter % 2 == 1)) {
    target.className = 'red';
    target.innerHTML = "X";
    checkWhowon(target.innerHTML);
  }
  if (eventCell === "TD" && (evenoddcounter % 2 == 0)) {
    target.className = 'green';
    target.innerHTML = "O";
    checkWhowon(target.innerHTML);
  }

}

function updatePlayerInfo() {

}

function makeTicTacToe() {
  evenoddcounter = 0;
  let winnertext = document.getElementById('finalwinner')
  winnertext.innerHTML = "";
  var Parent = tictactable2;
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  let boardsizevalue = document.getElementById('boardsizevalue');
  let boardsizenumber = boardsizevalue.value;
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
  if (oddoreven === 'X') {
    wincolor = 'red'
    if (rowwinner(wincolor) === "winner" || colwinner(wincolor) === "winner" || diawinner(wincolor)=== "winner") {
      winnertext.innerHTML = "winner is Player1"
    }
  }
  if (oddoreven === 'O') {
    wincolor = 'green'
    if (rowwinner(wincolor) === "winner" || colwinner(wincolor) === "winner" || diawinner(wincolor)==="winner") {
      winnertext.innerHTML = "winner is Player2"
    }
  }

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
