// new structure for testing

const display = document.querySelector("#dis-inp"); // Display bar of calc
const calculator = document.querySelector(".calc"); // the div of calculator
//
const fieldsBtns = document.querySelectorAll(".fieldsBtn");
const moneyFields = document.querySelectorAll(".moneyField");
//
let total = document.querySelector("#total");   // total money
let drawer = document.querySelector("#drawer");        // in the drawer money
let diff = document.querySelector("#diff");     // the difference between in the drawer and the total
// locks
let dotLock = true;
// operations & Numbers
let operations = ["+","-","*","/"];
let numbers = ["1","2","3","4","5","6","7","8","9","0"];
// functions 
function appendToDisplay(ch){
    display.value += ch;
}
function operation (op){
    let last = display.value.slice(-1);
    if(operations.includes(last) && op!=="-"){  // check if the last char is already operation
        backspace();
        appendToDisplay(op);
    }
    else if(display.value==="" && op!=="-"){
        return;
    }
    else{
        if(History.length === 0 && display.value!=="" ){
            let value = Number(display.value);
            let type  = (value>=0)?"plus":"minus"; 
            addHistoryProcess(display.value, type);
            renderHistoryBar()
        }

        appendToDisplay(op);
        dotLock= true;    
    }
}
function backspace(){
        if(display.value[display.value.length-1] == "."){
            dotLock = true;
        }
        display.value = display.value.slice(0,-1);
}
function clearDisplay(){
    display.value = "";
    dotLock = true;
    History.length = 0;
    renderHistoryBar();
}
function calculate(){
    try{
        display.value = eval(display.value);
        dotLock = true;
    }
    catch{
        display.value = "Error";
        setTimeout(()=>{
            display.value = "";
        },1000);
        History.length =0;
        renderHistoryBar();
    }
}
function renderDetailsBar(){
    let sum = 0;
    moneyFields.forEach((el)=>{
        sum += Number(el.value);
    })
    total.value = Number(sum);
    diff.value  = Number(total.value) - Number(drawer.value);
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
    else if (EvClickId == "reverse" && display.value != ""){
        display.value = Number(display.value) * -1 ;
    }
    else if(EvClick.classList.contains("fieldsBtn")){
        for (const btn in fieldsBtns) {
            let curr = fieldsBtns[btn];
            if(EvClick === curr){
                moneyFields[btn].value = Number(display.value);
                clearDisplay();
                renderDetailsBar();
                History.length =0;
                renderHistoryBar();
                break;
            }
        }
    }
});
// Keyboard
window.addEventListener("keydown",(event)=>{
    let evKey = event.key;
    // drawer input
    if(event.target === drawer){
        if(!numbers.includes(evKey) && event.key !=="Backspace" && event.key !== "ArrowRight" && event.key !== "ArrowLeft"){
            event.preventDefault();
        }
        else if (numbers.includes(evKey)){
            event.preventDefault();
            event.target.value += evKey;
        }
        renderDetailsBar();
    }
    // Number
    else if(numbers.includes(evKey)){
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
    else if (evKey === "C" || evKey === "c" || evKey === "Escape"){
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
    renderDetailsBar();
});
// History functions
const historyBar = document.querySelector(".history");
let History = []; // this carry the processes of History Bar
// add a process to history array
function addHistoryProcess(val , ty){
    let process = {
        value:val,
        type:ty
    }
    History.push(process);
}
function renderHistoryBar (){
    historyBar.innerHTML ="";
    History.forEach((el)=>{
        // define structure
        let process = document.createElement("div");
        let processValue = document.createElement("span");
        // assign attributes
        process.classList.add("process");
        process.classList.add(el["type"]);
        // assign value
        processValue.innerText = Number(el["value"]);
        // append to History Bar
        process.appendChild(processValue);
        historyBar.appendChild(process);
    });
};

const expr = "12+3.5*4-6/2";
const tokens = expr.match(/(\d+(?:\.\d+)?|[+\-*/])/g);
