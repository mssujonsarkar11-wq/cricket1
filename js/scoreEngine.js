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

winner:"",

anim:"",

customText:"",
textSize:70,

overBalls:[],

striker:0,
nonStriker:1,

batsmen:[
{name:"Batter1",runs:0,balls:0},
{name:"Batter2",runs:0,balls:0}
],

bowler:{name:"Bowler"}

}

function save(){

set(ref(db,"match"),match)

}

function swap(){

let t = match.striker
match.striker = match.nonStriker
match.nonStriker = t

}

function legalBall(){

match.balls++

if(match.balls==6){

match.overs++
match.balls=0

swap()

match.overBalls=[]

let newBowler = prompt("New Bowler")

if(newBowler){
match.bowler.name=newBowler
}

}

}

function score(r){

if(match.winner) return

match.anim=""

match.runs+=r

let bat = match.batsmen[match.striker]

bat.runs+=r
bat.balls++

match.overBalls.push(r)

if(r==4) match.anim="FOUR"
if(r==6) match.anim="SIX"

legalBall()

if(r==1 || r==3) swap()

checkWinner()

save()

}

function wicket(){

if(match.winner) return

match.wickets++

match.anim="WICKET"

match.overBalls.push("W")

legalBall()

let newBat = prompt("New Batter")

if(newBat){

match.batsmen[match.striker]={
name:newBat,
runs:0,
balls:0
}

}

checkWinner()

save()

}

function checkWinner(){

if(match.innings==2){

if(match.runs>=match.target){

match.winner=match.teamB

}

let ballsPlayed=(match.overs*6)+match.balls
let totalBalls=match.totalOvers*6

if(ballsPlayed>=totalBalls && match.runs<match.target){

match.winner=match.teamA

}

}

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

match.overBalls=[]

match.batsmen=[
{name:"Batter1",runs:0,balls:0},
{name:"Batter2",runs:0,balls:0}
]

match.bowler={name:"Bowler"}

}

save()

}

function showCustom(){

match.customText=document.getElementById("customText").value

match.textSize=parseInt(
document.getElementById("textSize").value
)

save()

}

function clearCustom(){

match.customText=""

save()

}

function endMatch(){

match.runs=0
match.wickets=0
match.overs=0
match.balls=0

match.target=0
match.innings=1

match.winner=""

match.overBalls=[]

match.customText=""

save()

}

window.score=score
window.wicket=wicket
window.startMatch=startMatch
window.endInnings=endInnings
window.showCustom=showCustom
window.clearCustom=clearCustom
window.endMatch=endMatch
