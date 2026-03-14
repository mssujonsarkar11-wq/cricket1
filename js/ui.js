import { db, ref, onValue } from "./firebase.js"

const video=document.getElementById("camera")

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject=stream
})

onValue(ref(db,"match"),snap=>{

let m=snap.val()

if(!m) return

document.getElementById("teamA").innerText=m.teamA
document.getElementById("teamB").innerText=m.teamB

document.getElementById("score").innerText=
m.runs+"-"+m.wickets

document.getElementById("overs").innerText=
"("+m.overs+"."+m.balls+")"

renderBatsmen(m)

document.getElementById("bowler").innerText=m.bowler.name

renderBalls(m)

updateRates(m)

showAnimation(m)

})

function renderBatsmen(m){

let bat1=m.batsmen[0]
let bat2=m.batsmen[1]

let star1 = m.striker==0 ? "⭐ " : ""
let star2 = m.striker==1 ? "⭐ " : ""

document.getElementById("bat1").innerText =
star1 + bat1.name+" "+bat1.runs+"("+bat1.balls+")"

document.getElementById("bat2").innerText =
star2 + bat2.name+" "+bat2.runs+"("+bat2.balls+")"

}

function renderBalls(m){

let box=document.getElementById("balls")

box.innerHTML=""

m.overBalls.forEach(b=>{

box.innerHTML+=`<span>${b}</span>`

})

}

function updateRates(m){

let rrBox=document.getElementById("rr")
let reqBox=document.getElementById("req")

let ballsPlayed=(m.overs*6)+m.balls

if(m.innings==1){

reqBox.innerText=""

if(ballsPlayed>0){

let rr=(m.runs/(ballsPlayed/6)).toFixed(2)

rrBox.innerText="RR: "+rr

}

}

if(m.innings==2){

rrBox.innerText=""

let ballsLeft=(m.totalOvers*6)-ballsPlayed

let runsNeeded=m.target-m.runs

if(runsNeeded<0) runsNeeded=0

if(ballsLeft>0){

let rrr=(runsNeeded/(ballsLeft/6)).toFixed(2)

reqBox.innerText=
"Need "+runsNeeded+
" runs from "+ballsLeft+
" balls | RRR "+rrr

}

}

}

function showAnimation(m){

let box=document.getElementById("anim")

if(m.anim){

box.innerText=m.anim

box.classList.add("show")

setTimeout(()=>{
box.classList.remove("show")
},1500)

}

}
