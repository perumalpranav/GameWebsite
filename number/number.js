//import {numdatabase} from "./numberdata.js";

function handler(event) {
    if(event.key >= 0 && event.key <= 9) {
        displayNum();
    }
    else if(event.key === "Enter" || event.key === "Backspace") {
        displayNum();
    };
}

function submitNum() {
    let inputElem = document.getElementById("input");
    //remember to cast into a number
    let num = Number(inputElem.value);
    if(num > 0 && num <= 100) {
        alert("You picked: " + num);
        numdatabase[num] += 1;
        console.log(numdatabase);
    }
    else {
        alert("READ THE INSTRUCTONS AGAIN IDIOT");
    }
    localStorage.setItem("submit","True");
}

function displayNum(num = -1) {
    if(num === -1) {
        let inputElem = document.getElementById("input");
        num = Number(inputElem.value);
    }
    console.log(num);
    let gridElem = document.getElementById("grid");
    if(num > 0 && num <= 100) {
        let htmlbody = "";
        for (let i = 0; i < num; i++) {
            htmlbody += "<div class=\"block\"></div>";
        }
        gridElem.innerHTML = htmlbody;
    }
    else {
        gridElem.innerHTML = "";
    }
}

