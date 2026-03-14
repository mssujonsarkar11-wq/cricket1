export function showAnimation(text){

const box = document.getElementById("animation")

box.innerText = text
box.classList.add("show")

setTimeout(()=>{

box.classList.remove("show")

},2000)

}
