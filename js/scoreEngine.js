import { db, ref, set } from "./firebase.js"

let match={

teamA:"TEAM A",
teamB:"TEAM B",

runs:0,
wickets:0,

overs:0,
balls:0,

striker:0,
nonStriker:1,

partnership:0,

anim:"",

lastBalls:[],

batsmen:[
{name:"Batter1",runs:0,balls:0},
{name:"Batter2",runs:0,balls:0}
],

bowler:{name:"Bowler"}

}

function save(){
set(ref(db,"match"),match)
}

function rotate(){
let t=match.striker
match.striker=match.nonStriker
match.nonStriker=t
}

function ballAdd(){

match.balls++

if(match.balls==6){

match.overs++
match.balls=0
rotate()

}

}

function run(r){

match.anim=""

match.runs+=r
match.partnership+=r

let bat=match.batsmen[match.striker]

bat.runs+=r
bat.balls++

if(r==4) match.anim="FOUR"
if(r==6) match.anim="SIX"

match.lastBalls.push(r)

ballAdd()

if(r%2==1) rotate()

save()

}

function dot(){

match.lastBalls.push(0)

match.batsmen[match.striker].balls++

ballAdd()

save()

}

function wicket(){

match.wickets++
match.partnership=0

match.anim="WICKET"

match.lastBalls.push("W")

ballAdd()

save()

}

function wide(){

match.runs++
match.lastBalls.push("Wd")

save()

}

function noball(){

match.runs++
match.lastBalls.push("Nb")

save()

}

function runW(){

match.runs++
match.wickets++

match.lastBalls.push("1W")

ballAdd()

rotate()

save()

}

function setTeams(){

match.teamA=document.getElementById("teamAname").value
match.teamB=document.getElementById("teamBname").value

save()

}

function setBatters(){

match.batsmen[0].name=document.getElementById("bat1name").value
match.batsmen[1].name=document.getElementById("bat2name").value

save()

}

function changeBowler(){

match.bowler.name=document.getElementById("bowlerName").value

save()

}

window.run=run
window.dot=dot
window.wicket=wicket
window.wide=wide
window.noball=noball
window.runW=runW
window.setTeams=setTeams
window.setBatters=setBatters
window.changeBowler=changeBowler
