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

function ballAdd(){

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

function run(r){

match.anim=""

match.runs+=r

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

match.anim="WICKET"

match.lastBalls.push("W")

ballAdd()

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

function wide(){

match.runs++

match.lastBalls.push("Wd")

save()

}

function wideRun(){

let r=parseInt(prompt("Runs taken after wide"))

match.runs+=1+r

match.lastBalls.push("Wd+"+r)

save()

}

function noball(){

match.runs++

match.lastBalls.push("Nb")

save()

}

function runOut(){

let r=parseInt(prompt("Runs completed before run out"))

match.runs+=r

match.wickets++

match.lastBalls.push(r+"RO")

ballAdd()

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

window.run=run
window.dot=dot
window.wicket=wicket
window.wide=wide
window.wideRun=wideRun
window.noball=noball
window.runOut=runOut
