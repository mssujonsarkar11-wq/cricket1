import { db, ref, set } from "./firebase.js"

let match = {

runs:0,
wickets:0,
overs:0,
balls:0,

striker:0,
nonStriker:1,

batsmen:[

{name:"Batter 1",runs:0,balls:0,fours:0,sixes:0},
{name:"Batter 2",runs:0,balls:0,fours:0,sixes:0}

]

}

function save(){

set(ref(db,"match"),match)

}

function rotate(){

let t = match.striker
match.striker = match.nonStriker
match.nonStriker = t

}

function run(r){

match.runs += r

let bat = match.batsmen[match.striker]

bat.runs += r
bat.balls++

if(r==4) bat.fours++
if(r==6) bat.sixes++

match.balls++

if(r % 2 == 1) rotate()

if(match.balls==6){

match.overs++
match.balls=0
rotate()

}

save()

}

function dot(){

match.balls++
match.batsmen[match.striker].balls++

save()

}

function wicket(){

match.wickets++
match.batsmen[match.striker].balls++

save()

}

function changeBatter(){

let name = document.getElementById("batterName").value

match.batsmen[match.striker] = {

name:name,
runs:0,
balls:0,
fours:0,
sixes:0

}

save()

}

function changeBowler(){

alert("Bowler changed")

}

window.run=run
window.dot=dot
window.wicket=wicket
window.changeBatter=changeBatter
window.changeBowler=changeBowler
