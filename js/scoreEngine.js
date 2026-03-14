import { db, ref, set } from "./firebase.js";

let match = {

teamA:"Team A",
teamB:"Team B",

runs:0,
wickets:0,

overs:0,
balls:0,

striker:0,
nonStriker:1,

partnership:0,

batsmen:[
{name:"Player 1",runs:0,balls:0,fours:0,sixes:0},
{name:"Player 2",runs:0,balls:0,fours:0,sixes:0}
],

bowler:{
name:"Bowler",
runs:0,
balls:0,
wickets:0
}

}

function save(){

set(ref(db,"match"),match)

}

function rotateStrike(){

let temp = match.striker
match.striker = match.nonStriker
match.nonStriker = temp

}

function run(r){

match.runs += r
match.partnership += r

let bat = match.batsmen[match.striker]

bat.runs += r
bat.balls += 1

if(r==4) bat.fours++
if(r==6) bat.sixes++

match.bowler.runs += r
match.bowler.balls++

match.balls++

if(r % 2 == 1) rotateStrike()

if(match.balls==6){

match.overs++
match.balls=0
rotateStrike()

}

save()

}

function dot(){

match.balls++
match.batsmen[match.striker].balls++
match.bowler.balls++

save()

}

function wicket(){

match.wickets++

match.batsmen[match.striker].balls++

match.bowler.wickets++
match.bowler.balls++

match.partnership = 0

save()

}

window.run = run
window.dot = dot
window.wicket = wicket
