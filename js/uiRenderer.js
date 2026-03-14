import { db, ref, onValue } from "./firebase.js";
import { showAnimation } from "./animations.js";

const score = document.getElementById("score");
const overs = document.getElementById("overs");
const batting = document.getElementById("battingScorecard");
const partnership = document.getElementById("partnershipRuns");

onValue(ref(db,"match"),snap=>{

let m = snap.val()

score.innerText = m.runs + "/" + m.wickets
overs.innerText = m.overs + "." + m.balls

partnership.innerText = m.partnership + " runs"

renderScorecard(m)

})

function renderScorecard(m){

batting.innerHTML=""

m.batsmen.forEach(p=>{

let sr = (p.runs/p.balls*100 || 0).toFixed(1)

batting.innerHTML += `
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
