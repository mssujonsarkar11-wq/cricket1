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

document.getElementById("bowler").innerText=m.bowler.name

updateRR(m)

renderBalls(m)

})

function updateRR(m){

let balls=(m.overs*6+m.balls)

if(balls>0){

let rr=(m.runs/(balls/6)).toFixed(2)

document.getElementById("rr").innerText="RR "+rr

}

if(m.innings==2){

let ballsLeft=(m.totalOvers*6)-balls

let runsNeed=m.target-m.runs

let rrr=(runsNeed/(ballsLeft/6)).toFixed(2)

document.getElementById("req").innerText=

"Need "+runsNeed+" from "+ballsLeft+" balls | RRR "+rrr

}

}

function renderBalls(m){

let box=document.getElementById("balls")

box.innerHTML=""

m.lastBalls.forEach(b=>{

box.innerHTML+=`<span>${b}</span>`

})

}
