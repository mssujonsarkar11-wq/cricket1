import { db, ref, set } from "./firebase.js"

let match={

runs:0,
wickets:0,
overs:0,
balls:0,

striker:0,
nonStriker:1,

lastBalls:[],

batsmen:[
{name:"Batter 1",runs:0,balls:0},
{name:"Batter 2",runs:0,balls:0}
],

bowler:{
name:"Bowler"
}

}

function save(){
set(ref(db,"match"),match)
}

function rotate(){

let t=match.striker
match.striker=match.nonStriker
match.nonStriker=t

}

function run(r){

match.runs+=r

let bat=match.batsmen[match.striker]

bat.runs+=r
bat.balls++

match.balls++

match.lastBalls.push(r)

if(match.lastBalls.length>6)
match.lastBalls.shift()

if(r%2==1) rotate()

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

match.lastBalls.push(0)

save()

}

function wicket(){

match.wickets++

match.lastBalls.push("W")

save()

}

function changeBatter(){

let name=document.getElementById("batterName").value

match.batsmen[match.striker]={

name:name,
runs:0,
balls:0

}

save()

}

function changeBowler(){

let name=document.getElementById("bowlerName").value

match.bowler.name=name

save()

}

window.run=run
window.dot=dot
window.wicket=wicket
window.changeBatter=changeBatter
window.changeBowler=changeBowler
