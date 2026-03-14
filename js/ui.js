import { db, ref, onValue } from "./firebase.js"

const video=document.getElementById("camera")

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject=stream
})

onValue(ref(db,"match"),snap=>{

let m=snap.val()

if(!m) return

if(m.customText){

document.getElementById("scoreArea").style.display="none"

let box=document.getElementById("customContainer")

box.innerHTML=
`<div style="font-size:${m.textSize}px">${m.customText}</div>`

return

}else{

document.getElementById("scoreArea").style.display="block"

document.getElementById("customContainer").innerHTML=""

}

document.getElementById("teamA").innerText=m.teamA
document.getElementById("teamB").innerText=m.teamB

document.getElementById("score").innerText=
m.runs+"-"+m.wickets

document.getElementById("overs").innerText=
"("+m.overs+"."+m.balls+")"

let left=m.batsmen[m.striker]
let right=m.batsmen[m.nonStriker]

document.getElementById("bat1").innerText=
left.name+" "+left.runs+"("+left.balls+")"

document.getElementById("bat2").innerText=
right.name+" "+right.runs+"("+right.balls+")"

document.getElementById("bowler").innerText=m.bowler.name

renderBalls(m)

updateRates(m)

showAnimation(m)

showWinner(m)

})

function renderBalls(m){

let box=document.getElementById("balls")

box.innerHTML=""

m.overBalls.forEach(b=>{
box.innerHTML+=`<span>${b}</span>`
})

}

function updateRates(m){

let rr=document.getElementById("rr")
let req=document.getElementById("req")

let balls=(m.overs*6)+m.balls

if(m.innings==1){

req.innerText=""

if(balls>0){

let rate=(m.runs/(balls/6)).toFixed(2)

rr.innerText="RR "+rate

}

}

if(m.innings==2){

rr.innerText=""

let ballsLeft=(m.totalOvers*6)-balls

let runsNeed=m.target-m.runs

if(runsNeed<0) runsNeed=0

if(ballsLeft>0){

let rrr=(runsNeed/(ballsLeft/6)).toFixed(2)

req.innerText=
"Need "+runsNeed+" from "+ballsLeft+" balls | RRR "+rrr

}

}

}

function showAnimation(m){

if(!m.anim) return

let box=document.getElementById("anim")

box.innerText=m.anim

box.classList.add("show")

setTimeout(()=>{
box.classList.remove("show")
},1200)

}

function showWinner(m){

if(!m.winner) return

let box=document.getElementById("anim")

box.innerText="WINNER: "+m.winner

box.classList.add("show")

}
