import { db, ref, set } from "./firebase.js"

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

topBat:"",
topBowl:"",

summary:false,

batsmen:[
{name:"Batter1",runs:0,balls:0},
{name:"Batter2",runs:0,balls:0}
],

bowler:{name:"Bowler"}

}

function save(){
set(ref(db,"match"),match)
}

function endInnings(){

if(match.innings==1){

match.target=match.runs+1

match.innings=2

match.runs=0
match.wickets=0
match.overs=0
match.balls=0

}else{

createSummary()

}

save()

}

function createSummary(){

let topBat=match.batsmen[0]

if(match.batsmen[1].runs>topBat.runs)
topBat=match.batsmen[1]

match.topBat=topBat.name+" "+topBat.runs

match.topBowl=match.bowler.name

match.summary=true

}

window.endInnings=endInnings
