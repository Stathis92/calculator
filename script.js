//All variables
let num1 = null; //Variable to store first input
let num2 = null; //Variable to store first input
let tempOper = null; //Variable to store operator
const INPUT_LIMIT = 9;

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

//Add EventListener for numbers
numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (divError == false)
      if (displ.innerHTML.length < INPUT_LIMIT)
        registerNumber(button.innerHTML);
    flagOper = false;
  });
});

//Add EventListener for operators
operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id == "clear" || button.id == "sum") allClear(button.id);
    else if (divError == false) {
      {
        if (num1 == null || displ.innerHTML.charAt(0) == "-") {
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
  if (btn.id == tempOper && num2 != null) {
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
  num1 = null;
  num2 = null;
  tempOper = null;
  option = 0;
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

function displayResults(option, sum) {
  if (equalBtn == true) {
    //Displaying results in displ
    if (option == 1) {
      displ.innerHTML = "I AM ERROR :)";
      divError = true;
    } else {
      if (option == 2) {
        displ.innerHTML = sum.toFixed(2);
      } else {
        displ.innerHTML = sum.toFixed(decLength);
      }
    }
  }
  //Displaying results in displSmall
  if (option == 1) {
    displSmall.innerHTML = "I AM ERROR :D";
    divError = true;
  } else {
    if (option == 2) {
      displSmall.innerHTML = sum.toFixed(2);
    } else {
      displSmall.innerHTML = sum.toFixed(decLength);
    }
  }
}

function operate(oper, num1, num2) {
  let sum = 0;
  let option = 0;

  switch (oper) {
    case "add":
      sum = add(num1, num2);
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
  return parseInt(num1) / parseInt(num2);
}
