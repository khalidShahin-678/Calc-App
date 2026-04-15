// new structure for testing

let display = document.querySelector("#dis-inp"); // Display bar of calc
let calculator = document.querySelector(".calc"); // the div of calculator
//
let holy = document.querySelector("#holy");     // Frozen money
let receit = document.querySelector("#receit"); // transaction money
let tips = document.querySelector("#tips");     // coins money
let add = document.querySelector("#addf");    // added money
//
let total = document.querySelector("#total");   // total money
let inn = document.querySelector("#in");        // in the drawer money
let diff = document.querySelector("#diff");     // the difference between in the drawer and the total
// locks
let opLock = false;
let dotLock = true;
// operations & Numbers
let operations = ["+","-","*","/"];
let numbers = ["1","2","3","4","5","6","7","8","9","0"];
// functions 
function appendToDisplay(ch){
    display.value += ch;
}
function operation (op){
    if(opLock==true){
        opLock = false;
        dotLock = true;
    }
    else if(display.value !==""){
        calculate();
    }
    appendToDisplay(op);
}
function backspace(){
    if(operations.includes(display.value[display.value.length-1])){
            opLock = true;
        }
        else if(display.value[display.value.length-1] == "."){
            dotLock = true;
        }
        display.value = display.value.slice(0,-1);
}
function clearDisplay(){
    display.value = "";
}
function backspace(){
    display.value = display.value.slice(0,-1);
}
function calculate(){
    display.value = eval(display.value);
}
function renderDetailsBar(){
    total.value = Number(holy.value) +  Number(receit.value) + Number(tips.value) + Number(add.value);
    diff.value  = Number(total.value) - Number(inn.value);
}
calculator.addEventListener("click" , (event)=>{
    let EvClick = event.target;
    let EvClickId = EvClick.id;
    // Number
    if(EvClick.classList.contains("num")){
        let number = EvClick.value;
        appendToDisplay(number);
    }
    // Operation
    else if (EvClick.classList.contains("op")){
        operation(EvClick.value);
    }
    // Equal
    else if (EvClickId == "equal"){
        calculate();
    }
    // Dot btn
    else if(EvClickId =="dot" && dotLock == true){
        appendToDisplay(".");
        dotLock = false;
    }
    // Clear
    else if (EvClickId == "clear"){
        clearDisplay();
    }
    // BackSpace
    else if (EvClickId == "back"){
        backspace();
    }
    // Reverse
    else if (EvClickId == "reverse" && opLock == true){
        display.value *= -1 ;
    }
    else if(EvClickId != ""){
        // to مجمد  
        if (EvClickId == "hol"){
            holy.value = Number(display.value);
            clearDisplay();
        }
        // to تحويلات
        else if (EvClickId == "rec"){
            receit.value = Number(display.value);
            clearDisplay();
        }
        // to فكة
        else if (EvClickId == "tip"){
            tips.value = Number(display.value);
            clearDisplay();
        }
        // to اضافي
        else if (EvClickId === "add"){
            add.value = Number(display.value);
            clearDisplay();
        }
    renderDetailsBar();
    }
    console.log(EvClickId);
});
// Keyboard
window.addEventListener("keydown",(event)=>{
    let evKey = event.key;
    // Number
    if(numbers.includes(evKey)){
        appendToDisplay(evKey);
    }
    // Operation
    else if (operations.includes(evKey)){
        operation(evKey);
    }
    // Equal
    else if(evKey === "=" || evKey === "Enter"){
        event.preventDefault();
        calculate();
    }
    // Dot btn
    else if (evKey == "." && dotLock == true){
        appendToDisplay(".");
        dotLock = false;
    }
    // Clear
    else if (evKey === "C" || evKey === "c"){
        clearDisplay();
    }
    // Backspace
    else if (evKey === "Backspace"){
        backspace();
    }
    // Reverse 
    else if (evKey === "r" || evKey === "R"){
        display.value *= -1 ;
    }
});
