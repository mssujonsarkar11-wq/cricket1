export function showAnimation(text,color){

const box=document.getElementById("animation")

box.innerText=text
box.style.color=color

box.classList.add("show")

setTimeout(()=>{

box.classList.remove("show")

},2000)

}
