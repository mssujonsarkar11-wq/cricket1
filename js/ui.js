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

if(m.winner){

document.getElementById("winBox").innerText=
"🎉 Congratulations\n"+m.winner

}

document.getElementById("teamA").innerText=m.teamA
document.getElementById("teamB").innerText=m.teamB

document.getElementById("score").innerText=
m.runs+"-"+m.wickets

document.getElementById("overs").innerText=
"("+m.overs+"."+m.balls+")"

if(m.target){

document.getElementById("target").innerText=
"Target: "+m.target

}

document.getElementById("bat1").innerText=
m.batsmen[0].name+" "+m.batsmen[0].runs+"("+m.batsmen[0].balls+")"

document.getElementById("bat2").innerText=
m.batsmen[1].name+" "+m.batsmen[1].runs+"("+m.batsmen[1].balls+")"

document.getElementById("bowler").innerText=m.bowler.name

})
