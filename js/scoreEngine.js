import { db, ref, set } from "./firebase.js"

let history=[]

let match={

teamA:"TEAM A",
teamB:"TEAM B",

runs:0,
wickets:0,

overs:0,
balls:0,

striker:0,
nonStriker:1,

lastBalls:[],

anim:"",

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

let extra=document.getElementById("extraType").value

let bat=match.batsmen[match.striker]

if(extra=="wd"){

match.runs+=1+r
match.lastBalls.push("Wd+"+r)

save()
return

}

if(extra=="nb"){

match.runs+=1+r
match.lastBalls.push("Nb+"+r)

if(r>0) bat.runs+=r

save()
return

}

if(extra=="bye"){

match.runs+=r
match.lastBalls.push("B"+r)

legalBall()

save()
return

}

if(extra=="lb"){

match.runs+=r
match.lastBalls.push("Lb"+r)

legalBall()

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
window.setTeams=setTeams
window.setBatters=setBatters
window.changeBowler=changeBowler
