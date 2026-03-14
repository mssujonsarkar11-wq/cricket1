import { db, ref, set } from "./firebase.js"

let history=[]

let match={

teamA:"TEAM A",
teamB:"TEAM B",

runs:0,
wickets:0,

overs:0,
balls:0,

totalOvers:0,

innings:1,

target:0,

winner:"",

customText:"",
textSize:60,

anim:"",

striker:0,
nonStriker:1,

lastBalls:[],

batsmen:[
{name:"Batter1",runs:0,balls:0},
{name:"Batter2",runs:0,balls:0}
],

bowler:{name:"Bowler"}

}

function save(){
set(ref(db,"match"),match)
}

function checkWin(){

if(match.innings==2 && match.runs>=match.target){

match.winner=match.teamB

}

}

function showCustom(){

match.customText=document.getElementById("customText").value

match.textSize=parseInt(document.getElementById("textSize").value)

save()

}

function clearCustom(){

match.customText=""

save()

}

window.showCustom=showCustom
window.clearCustom=clearCustom
