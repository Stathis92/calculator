//Load all elements
const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const displ = document.getElementById("display");
const displSmall = document.getElementById("displaySmall");

//Add EventListener for numbers
numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (displ.innerHTML.length < 9) registerNumber(button.innerHTML);
    flagOper = false;
  });
});

//Add EventListener for operators
operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (num1 == null) {
      num1 = displ.innerText;
      displSmall.innerHTML = displ.innerText;
      resetDec();
    } else {
      if (flagOper == true && button.className == "operator") {
        changeOperator(button.innerHTML);
      } else {
        num2 = displ.innerText;
        operate(tempOper, num1, num2);
        resetDec();
      }
    }
    num1 = displSmall.innerHTML;
    if (flagOper == false) registerOperator(button.innerHTML);
  });
});

function registerNumber(btn) {
  if (btn == "." && flagDec == false) checkDec(btn);

  if (btn != ".") {
    if (displ.innerHTML == 0 && displ.innerHTML.length <= 1) {
      displ.innerHTML = btn;
    } else {
      displ.innerHTML += btn;
    }
    if (flagDec == true) decCounter++;
  }
}

function checkDec(btn) {
  displ.innerHTML += btn;
  flagDec = true;
}

function resetDec() {
  flagDec = false;
  if (decCounter > decLength) decLength = decCounter;
  decCounter = 0;
}

function registerOperator(btn) {
  if (displ.innerHTML == 0 && btn == "-") {
    displ.innerHTML = btn;
    flagOper = true;
  } else if (flagOper == false) {
    flagOper = true;
    tempOper = btn;
    displSmall.innerHTML += btn;
    displ.innerHTML = "0";
  }
}

function changeOperator(btn) {
  if (btn == tempOper && num2 != null) {
    operate(btn, num1, num2);
    displSmall.innerHTML += btn;
  } else {
    displSmall.innerHTML = displSmall.innerHTML.slice(0, -2) +
      displSmall.innerHTML[displSmall.innerHTML.length - 2] + btn;
  }
}

function operate(oper, num1, num2) {
  let sum = 0;

  switch (oper) {
    case "+":
      sum = add(num1, num2);
      break;
    case "-":
      displSmall.innerHTML = sub(num1, num2);
      break;
    case "*":
      displSmall.innerHTML = mult(num1, num2);
      break;
    case "/":
      displSmall.innerHTML = divid(num1, num2);
      break;
  }
  displSmall.innerHTML = sum.toFixed(decLength);
}

function add(num1, num2) {
  return (parseFloat(num1) * 100 + parseFloat(num2) * 100) / 100;
}

function sub(num1, num2) {}

function mult(num1, num2) {}

function divid(num1, num2) {}

let num1 = null; //Variable to store first input
let num2 = null; //Variable to store first input
let tempOper = null; //Variable to store operator

let decCounter = 0; // Variable to count decimals
let decLength = 0; //Variable of max decimals in both numbers

let flagOper = false; //Flag if there is already an operator in memory
let flagDec = false; //Flag if number has already a decimal
