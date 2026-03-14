import { db, ref, onValue } from "./firebase.js"

const video=document.getElementById("camera")

navigator.mediaDevices.getUserMedia({video:true,audio:false})
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

let left=m.batsmen[m.striker]
let right=m.batsmen[m.nonStriker]

document.getElementById("bat1").innerText=
left.name+" "+left.runs+"("+left.balls+")"

document.getElementById("bat2").innerText=
right.name+" "+right.runs+"("+right.balls+")"

document.getElementById("bowler").innerText=m.bowler.name

renderBalls(m)

showAnim(m)

})

function renderBalls(m){

let box=document.getElementById("balls")

box.innerHTML=""

m.overBalls.forEach(b=>{

box.innerHTML+=`<span>${b}</span>`

})

}

function showAnim(m){

if(!m.anim) return

let box=document.getElementById("anim")

box.innerText=m.anim

box.classList.add("show")

setTimeout(()=>{
box.classList.remove("show")
},1000)

}
