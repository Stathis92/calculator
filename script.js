//All variables
let num1 = 0; //Variable to store first input
let num2 = 0; //Variable to store first input
let tempOper = null; //Variable to store operator
const INPUT_LIMIT = 11;

let decCounter = 0; // Variable to count decimals
let decLength = 0; //Variable of max decimals in both numbers

let flagOper = false; //Flag if there is already an operator in memory
let flagDec = false; //Flag if number has already a decimal
let equalBtn = false; //Flag if button was equal sign
let divError = false;

//Load all elements
const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const displ = document.getElementById("display");
const displSmall = document.getElementById("displaySmall");

document.addEventListener("keydown", keyPressed);

function keyPressed(e) {
  convertKeys(e);
}

//Add EventListener for number buttons
numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (divError == false) registerNumber(button.innerHTML);
  });
});

//Add EventListener for operator buttons
operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    checkOperator(button);
  });
});

function registerNumber(btn) {
  if (displ.innerHTML.length < INPUT_LIMIT) {
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
  flagOper = false;
}

function checkOperator(button) {
  if (button.id == "delete") deleteChar();
  else if (button.id == "clear" || button.id == "sum") allClear(button.id);
  else if (divError == false) {
    {
      if (num1 == 0 || displ.innerHTML.charAt(0) == "-") {
        num1 = displ.innerText;
        displSmall.innerHTML = displ.innerText;
        resetDec();
      } else {
        if (flagOper == true && button.className == "operator") {
          changeOperator(button);
        } else {
          num2 = displ.innerText;
          resetDec();
          operate(tempOper, num1, num2);
        }
      }
      num1 = displSmall.innerHTML;
      if (flagOper == false) registerOperator(button);
    }
  }
}

function registerOperator(btn) {
  if (divError == false) {
    if (displ.innerHTML == 0 && btn.id == "sub") {
      displ.innerHTML = btn.innerHTML;
      flagOper = true;
    } else if (flagOper == false) {
      flagOper = true;
      tempOper = btn.id;
      displSmall.innerHTML += btn.innerHTML;
      displ.innerHTML = "0";
    }
  }
}

function changeOperator(btn) {
  if (btn.id == tempOper && num2 != 0) {
    operate(btn.id, num1, num2);
    tempOper = btn.id;
    displSmall.innerHTML += btn.innerHTML;
  } else {
    tempOper = btn.id;
    displSmall.innerHTML =
      displSmall.innerHTML.slice(0, -2) +
      displSmall.innerHTML[displSmall.innerHTML.length - 2] +
      btn.innerHTML;
  }
}

function deleteChar() {
  if (displ.innerHTML.length > 1)
    displ.innerHTML = displ.innerHTML.slice(0, -1);
  else displ.innerHTML = "0";
}

function allClear(btn) {
  if (btn == "clear") {
    decCounter = 0;
    decLength = 0;
    flagOper = false;
    flagDec = false;
    displ.innerHTML = "0";
    divError = false;
  } else if (divError == false) {
    num2 = displ.innerText;
    resetDec();
    equalBtn = true;
    operate(tempOper, num1, num2);
  }
  equalBtn = false;
  displSmall.innerHTML = " ";
  num1 = 0;
  num2 = 0;
  tempOper = null;
  option = 0;
}

function checkDec(btn) {
  for (let i = 0; i < displ.innerHTML.length; i++) {
    if (displ.innerHTML[i] == ".") flagDec = true;
  }
  if (flagDec == false) {
    displ.innerHTML += btn;
  }
  flagDec = true;
}

function resetDec() {
  flagDec = false;
  if (decCounter > decLength) decLength = decCounter;
  decCounter = 0;
}

function operate(oper, num1, num2) {
  let sum = 0;
  let option = 0;

  switch (oper) {
    case "add":
      sum = add(num1, num2);
      option = 3;
      break;
    case "sub":
      sum = sub(num1, num2);
      break;
    case "mult":
      sum = mult(num1, num2);
      break;
    case "divid":
      if (num2 == 0) {
        option = 1;
        break;
      }
      sum = divid(num1, num2);
      option = 2;
      break;
  }
  displayResults(option, sum);
}

function displayResults(option, sum) {
  console.log(sum, option, sum.toString().length);
  if (sum.toString().length > 11 && option == 3) sum = sum.toFixed(decLength);
  else if (sum.toString().length > 11 && option == 2)
    sum = expo(sum, 6);
  else if (sum.toString().length > 11 && option != 2) sum = expo(sum, 6);

  console.log(sum);
  if (equalBtn == true) {
    //Displaying results in displ
    if (option == 1) {
      displ.innerHTML = "I am Error";
      divError = true;
    } else {
      displ.innerHTML = sum;
    }
  }
  //Displaying results in displSmall
  if (option == 1) {
    displSmall.innerHTML = "I am Error";
    divError = true;
  } else {
    displSmall.innerHTML = sum;
  }
}

//Functions for all calculations
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
  return ((parseFloat(num1) / parseFloat(num2)) * 100) / 100;
}

function expo(num, e) {
  return Number.parseFloat(num).toExponential(e);
}

//Function to convert keyboard inputs
function convertKeys(key) {
  //We check for number input while excluding Fkeys
  if (isNaN(key.code.slice(-1)) == false && key.code.length > 2) {
    if (divError == false) registerNumber(key.code.slice(-1));
  }

  switch (key.code) {
    case "NumpadAdd":
      key.innerHTML = "+";
      key.id = "add";
      key.innerClass = "operator";
      checkOperator(key);
      break;
    case "NumpadSubtract":
      key.innerHTML = "-";
      key.id = "sub";
      key.innerClass = "operator";
      checkOperator(key);
      break;
    case "NumpadMultiply":
      key.innerHTML = "&#215;";
      key.id = "mult";
      key.innerClass = "operator";
      checkOperator(key);
      break;
    case "NumpadDivide":
      key.innerHTML = "&#247;";
      key.id = "divid";
      key.innerClass = "operator";
      checkOperator(key);
      break;
    case "NumpadEnter":
      key.id = "sum";
      key.innerClass = "operator";
      checkOperator(key);
      break;
    case "Escape":
      key.id = "clear";
      key.innerClass = "operator";
      checkOperator(key);
      break;
    case "NumpadDecimal":
      key.id = "dec";
      key.innerHTML = ".";
      registerNumber(key.innerHTML);
      break;
    case "Backspace":
      key.id = "delete";
      key.innerClass = "operator";
      checkOperator(key);
      break;
  }
}
