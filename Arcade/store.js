const table = document.getElementsByTagName('table')[0];
const selectOpt = document.getElementsByTagName('select')[1];
let color1 = "red";

function makeRow() {
    const row = document.createElement('tr')
    for (let i = 0; i < 20; i++) {
        const td = document.createElement('td')
        row.appendChild(td)
    }
    table.appendChild(row);
}


function colorize(event) {
    console.log('clicked')
    const target = event.target;
    let eventCell = target.tagName;
    // selectOpt.addEventListener('change', selectedOption);
    // console.log(target.tagName);
    // if (target.className.length){
    //     target.className = '' 
    // }
    // else {
    if (eventCell === "TD") {
        console.log(color1);
        target.className = color1;
    }
    else {
        target.className = '';
    }
    // }

}

// console.log(selectOpt);
function selectedOption(event) {

    console.log(event.target.value)
    console.log("hi")
    color1 = event.target.value

}


let button = document.getElementById('add-row')
button.addEventListener('click', makeRow)
table.addEventListener('click', colorize);
selectOpt.addEventListener('change', selectedOption)
// table.addEventListener('mouseup', colorize);
// table.addEventListener('mousedown', colorize);
// table.addEventListener('mouse', colorize);
