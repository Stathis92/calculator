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
    if (button.id == "clear") allClear();
    else {
      {
        if (num1 == null) {
          num1 = displ.innerText;
          displSmall.innerHTML = displ.innerText;
          resetDec();
        } else {
          if (flagOper == true && button.className == "operator") {
            changeOperator(button.innerHTML);
          } else {
            num2 = displ.innerText;
            resetDec();
            operate(tempOper, num1, num2);
          }
        }
        num1 = displSmall.innerHTML;
        if (flagOper == false) registerOperator(button.innerHTML);
      }
    }
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
//TODO, CREATE DISPLAY FOR OPERATOR
function changeOperator(btn) {
  if (btn == tempOper && num2 != null) {
    operate(btn, num1, num2);
    tempOper = btn;
    displSmall.innerHTML += btn;
  } else {
    tempOper = btn;
    displSmall.innerHTML =
      displSmall.innerHTML.slice(0, -2) +
      displSmall.innerHTML[displSmall.innerHTML.length - 2] +
      btn;
  }
}

function operate(oper, num1, num2) {
  let sum = 0;
  let catchError = 0;

  switch (oper) {
    case "+":
      sum = add(num1, num2);
      break;
    case "-":
      sum = sub(num1, num2);
      break;
    case "*":
      sum = mult(num1, num2);
      break;
    case "/":
      if (num2 == 0) {
        catchError = 1;
        break;
      }
      sum = divid(num1, num2);
      break;
  }

  //Display Results
  if (catchError == 0) displSmall.innerHTML = sum.toFixed(decLength);
  else {
    displSmall.innerHTML = "I AM ERROR :D";
  }
}

function add(num1, num2) {
  return (parseFloat(num1) * 100 + parseFloat(num2) * 100) / 100;
}

function sub(num1, num2) {
  return (parseFloat(num1) * 100 - parseFloat(num2) * 100) / 100;
}

function mult(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function divid(num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
}

function allClear() {
  num1 = null;
  num2 = null;
  tempOper = null;
  decCounter = 0;
  decLength = 0;
  flagOper = false;
  flagDec = false;

  displ.innerHTML = "";
  displSmall.innerHTML = "";
}

let num1 = null; //Variable to store first input
let num2 = null; //Variable to store first input
let tempOper = null; //Variable to store operator

let decCounter = 0; // Variable to count decimals
let decLength = 0; //Variable of max decimals in both numbers

let flagOper = false; //Flag if there is already an operator in memory
let flagDec = false; //Flag if number has already a decimal
