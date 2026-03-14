import { db, ref, onValue } from "./firebase.js"

onValue(ref(db,"match"),snap=>{

let m=snap.val()

if(!m) return

document.getElementById("score").innerText=
m.runs+"-"+m.wickets

document.getElementById("overs").innerText=
"("+m.overs+"."+m.balls+")"

document.getElementById("bat1").innerText=
m.batsmen[0].name+" "+m.batsmen[0].runs+"("+m.batsmen[0].balls+")"

document.getElementById("bat2").innerText=
m.batsmen[1].name+" "+m.batsmen[1].runs+"("+m.batsmen[1].balls+")"

document.getElementById("bowler").innerText=
m.bowler.name

renderBalls(m)

})

function renderBalls(m){

let box=document.getElementById("balls")

box.innerHTML=""

m.lastBalls.forEach(b=>{

box.innerHTML+=`<span>${b}</span>`

})

}
