import { db, ref, onValue } from "./firebase.js"

const video = document.getElementById("camera")

navigator.mediaDevices.getUserMedia({video:true,audio:true})
.then(stream=>{
video.srcObject = stream
})

onValue(ref(db,"match"),snap=>{

let m = snap.val()

document.getElementById("score").innerText =
m.runs + "/" + m.wickets

document.getElementById("overs").innerText =
m.overs + "." + m.balls

render(m)

})

function render(m){

let box = document.getElementById("battingTable")

box.innerHTML=""

m.batsmen.forEach(p=>{

let sr = (p.runs/p.balls*100 || 0).toFixed(1)

box.innerHTML += `

<tr>

<td>${p.name}</td>
<td>${p.runs}</td>
<td>${p.balls}</td>
<td>${p.fours}</td>
<td>${p.sixes}</td>
<td>${sr}</td>

</tr>

`

})

}
