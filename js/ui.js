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

document.getElementById("bat1").innerText=
m.batsmen[0].name+" "+m.batsmen[0].runs+"("+m.batsmen[0].balls+")"

document.getElementById("bat2").innerText=
m.batsmen[1].name+" "+m.batsmen[1].runs+"("+m.batsmen[1].balls+")"

document.getElementById("bowler").innerText=
m.bowler.name+" | "+m.currentOverRuns+" runs this over"

renderBalls(m)

updateRates(m)

showAnimation(m)

})

function renderBalls(m){

let box=document.getElementById("balls")

box.innerHTML=""

m.lastBalls.forEach(b=>{

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
