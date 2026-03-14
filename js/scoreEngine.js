import { db, ref, set } from "./firebase.js"

let match = {

teamA:"TEAM A",
teamB:"TEAM B",

runs:0,
wickets:0,

overs:0,
balls:0,

totalOvers:0,

innings:1,

target:0,

batsmen:[
{name:"Batter1",runs:0,balls:0},
{name:"Batter2",runs:0,balls:0}
],

bowler:{name:"Bowler"},

lastBalls:[]

}

function save(){

set(ref(db,"match"),match)

}

function rotate(){

let t=match.striker
match.striker=match.nonStriker
match.nonStriker=t

}

function legalBall(){

match.balls++

if(match.balls==6){

match.overs++
match.balls=0

let newBowler=prompt("New Bowler Name")

if(newBowler){
match.bowler.name=newBowler
}

}

}

function score(r){

match.runs+=r

let bat=match.batsmen[0]

bat.runs+=r
bat.balls++

match.lastBalls.push(r)

legalBall()

save()

}

function wicket(){

match.wickets++

match.lastBalls.push("W")

legalBall()

let newBat=prompt("New Batter Name")

if(newBat){

match.batsmen[0]={
name:newBat,
runs:0,
balls:0
}

}

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

function startMatch(){

match.totalOvers=parseInt(
document.getElementById("totalOvers").value
)

save()

}

function endInnings(){

if(match.innings==1){

match.target=match.runs+1

match.innings=2

match.runs=0
match.wickets=0
match.overs=0
match.balls=0

match.lastBalls=[]

}else{

alert("Match Finished")

}

save()

}

window.score=score
window.wicket=wicket
window.setTeams=setTeams
window.setBatters=setBatters
window.changeBowler=changeBowler
window.startMatch=startMatch
window.endInnings=endInnings
