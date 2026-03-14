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

renderBalls(m)

if(m.anim) showAnim(m.anim)

})

function renderBalls(m){

let box=document.getElementById("balls")

box.innerHTML=""

m.lastBalls.forEach(b=>{

box.innerHTML+=`<span>${b}</span>`

})

}

function showAnim(text){

let box=document.getElementById("anim")

box.innerText=text

box.classList.add("show")

setTimeout(()=>{
box.classList.remove("show")
},1200)

}
