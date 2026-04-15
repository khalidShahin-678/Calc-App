let display = document.querySelector("#dis-inp");
let calculator = document.querySelector(".calc");

let opLock = true;
let dotLock = true;

let operations = ["+","-","*","/"];

calculator.addEventListener("click",(ev)=>{
    // Add numbers to display
    if(tr){

    }
    else if (ev.target.classList.contains("op")){
        if(opLock===true){
            display.value += ev.target.textContent;
            opLock = false;
            dotLock = true;
        }
        else {
            display.value = eval(display.value);
            display.value+= ev.target.textContent;
        }
    }
    else if (ev.target.id === "equal"){
        display.value = eval(display.value);
    }
    else if (ev.target.id === "dot" && dotLock === true){
        display.value += ev.target.textContent;
        dotLock = false;
    }
    else if (ev.target.id === "clear"){
        display.value = "";
    }
    else if (ev.target.id === "back"){
        if(operations.includes(display.value[display.value.length-1])){
            opLock = true;
        }
        else if(display.value[display.value.length-1]==="."){
            dotLock =true;
        }
        display.value = display.value.slice(0,-1);
    }
    else if (ev.target.id === "reverse" && (opLock === true)){
        display.value = +display.value * -1 ;
    }
    else if (ev.target.id === "hol"){   
        let holy = document.querySelector("#holy");
        holy.value = Number(display.value);
        display.value = "";
    }
    else if (ev.target.id === "rec"){
        let receit = document.querySelector("#receit");
        receit.value = Number(display.value);
        display.value = "";
    }
    else if (ev.target.id === "tip"){
        let tips = document.querySelector("#tips");
        tips.value = Number(display.value);
        display.value="";
    }
    else if (ev.target.id === "add"){
        let add = document.querySelector("#addf");
        add.value = Number(display.value);
        display.value = "";
    }
    renderTotal();
});
let ind = document.querySelector("#in");

window.addEventListener("keydown",(ev)=>{
    if(ev.target.id === "in"){
        ev.preventDefault();
        if (ev.code.includes("Digit")||ev.key === "."){
           ind.value += ev.key;
        }
        else if (ev.key === "Backspace"){
            ind.value = ind.value.slice(0,-1);
        }
        renderDiff();
    }
    else{
        if (ev.code.includes("Digit")){
            display.value += ev.key;
        }
        else if (ev.key === "." && dotLock === true){
            display.value += ev.key;
            dotLock = false;
        }
        else if (ev.key === "c"|| ev.key === "C"){
            display.value ="";
        }
        else if (ev.key === "Backspace"){
            if(operations.includes(display.value[display.value.length-1])){
            opLock = true;
            }
            else if(display.value[display.value.length-1]==="."){
            dotLock =true;
            }
            display.value = display.value.slice(0,-1);
        }
        else if (operations.includes(ev.key)){
            if(opLock===true){
                display.value += ev.key;
                opLock = false;
                dotLock = true;
            }
            else {
                display.value = eval(display.value);
                display.value+= ev.key;
            }
        }
        else if (ev.key === "=" || ev.key === "Enter"){
            ev.preventDefault();
            display.value = eval(display.value);
        }
        else if ((ev.key === "r"|| ev.key === "R")&& (opLock === true)){
            display.value = -display.value;
        }
    }
    renderDiff();
});

