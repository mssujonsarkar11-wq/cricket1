import { db, ref, set } from "./firebase.js"

let history=[]

function newMatch(){

return {

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

}

let match=newMatch()

function save(){
set(ref(db,"match"),match)
}

function endMatch(){

match=newMatch()

save()

}

window.endMatch=endMatch
