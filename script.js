const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const displ = document.getElementById("display");
const displSmall = document.getElementById("displaySmall");

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    //NUMBER BUTTON CLICKED FUNCTION
    registerNumber(button.innerHTML);
    flagOper = 0;
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    //OPERATOR BUTTON CLICKED FUNCTION
    if (num1 == null) {
      num1 = displ.innerText;
      displSmall.innerHTML = num1;
      flagDec = false;
    } else {
      num2 = displ.innerText;
      operate(tempOper, num1, num2);
      flagDec = false;
    }
    registerOperator(button.innerHTML);
    console.log(
      "NUMBER 1: " + num1 + "\nNUMBER 2: " + num2 + "\nOPERATOR: " + tempOper
    );
  });
});

function registerNumber(btn) {
  if (btn == "." && flagDec == false) 
    checkDec(btn);

  if (btn != ".") {
    //CHECK EXISTING DISPLAY
    if (displ.innerHTML == 0 && displ.innerHTML != "0.") {
      displ.innerHTML = btn;
    } else {
      displ.innerHTML += btn;
    }
  }
  //DISPLAY LOG -- DELETE LATER
  console.log(displ.innerHTML);
}

function checkDec(btn) {
  displ.innerHTML += btn;
  flagDec = true;
}

function registerOperator(btn) {
  if (displ.innerHTML == 0 && btn == "-") {
    displ.innerHTML = btn;
    flagOper = 1;
  } else if (flagOper == 0) {
    flagOper = 1;
    tempOper = btn;
    displSmall.innerHTML += btn;
    displ.innerHTML = "0";
  }
}

function operate(oper, num1, num2) {
  displSmall.innerHTML = add(num1, num2);

  num1 = displSmall.innerHTML;
  num2 = null;
}

function add(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

function sub(num1, num2) {
  return num1 - num2;
}

function mult(num1, num2) {
  return num1 * num2;
}

function divid(num1, num2) {
  if (num2 == 0) return "I AM ERROR :D";
  return num1 / num2;
}

let num1 = null;
let num2 = null;
let flagOper = false;
let flagDec = false;
let tempOper = 0;
