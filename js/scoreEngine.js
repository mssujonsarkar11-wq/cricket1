import { db, ref, set } from "./firebase.js"

let history=[]

let match={

teamA:"TEAM A",
teamB:"TEAM B",

runs:0,
wickets:0,

overs:0,
balls:0,

totalOvers:0,

innings:1,

target:0,

anim:"",

striker:0,
nonStriker:1,

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

function legalBall(){

match.balls++

if(match.balls==6){

match.overs++
match.balls=0
rotate()

let newBowler=prompt("New Bowler Name")

if(newBowler){
match.bowler.name=newBowler
}

}

}

function score(r){

history.push(JSON.stringify(match))

match.anim=""

let extra=document.getElementById("extraType")?.value || ""

let bat=match.batsmen[match.striker]

if(extra=="wd"){
match.runs+=1+r
match.lastBalls.push("Wd+"+r)
save()
return
}

if(extra=="nb"){
match.runs+=1+r
if(r>0) bat.runs+=r
match.lastBalls.push("Nb+"+r)
save()
return
}

match.runs+=r
bat.runs+=r
bat.balls++

if(r==4) match.anim="FOUR"
if(r==6) match.anim="SIX"

match.lastBalls.push(r)

legalBall()

if(r%2==1) rotate()

checkWin()

save()

}

function wicket(){

history.push(JSON.stringify(match))

match.wickets++

match.anim="WICKET"

match.lastBalls.push("W")

legalBall()

let newBat=prompt("New Batter Name")

if(newBat){

match.batsmen[match.striker]={
name:newBat,
runs:0,
balls:0
}

}

save()

}

function undo(){
if(history.length==0) return
match=JSON.parse(history.pop())
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

match.runs=0
match.wickets=0
match.overs=0
match.balls=0

match.innings=2

match.lastBalls=[]

alert("Target: "+match.target)

}else{

alert("Match Finished")

}

save()

}

function checkWin(){

if(match.innings==2 && match.runs>=match.target){

match.anim="WIN "+match.teamB

alert("Congratulations "+match.teamB)

}

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

window.score=score
window.wicket=wicket
window.undo=undo
window.startMatch=startMatch
window.endInnings=endInnings
window.setTeams=setTeams
window.setBatters=setBatters
window.changeBowler=changeBowler
