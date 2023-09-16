const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const displ = document.getElementById("display");
const displSmall = document.getElementById("displaySmall");

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (displ.innerHTML.length < 9)
      registerNumber(button.innerHTML);
    flagOper = false;
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    //OPERATOR BUTTON CLICKED FUNCTION
    if (num1 == null) {
      num1 = displ.innerText;
      displSmall.innerHTML = displ.innerText;
      flagDec = false;
    } else {
      if (flagOper == true && button.className == "operator") {
        changeOperator(button.innerHTML);
      } else {
        num2 = displ.innerText;
        operate(tempOper, num1, num2);
        flagDec = false;
      }
    }
    num1 = displSmall.innerHTML;
    if (flagOper == false) registerOperator(button.innerHTML);
  });
});

function registerNumber(btn) {
  if (btn == "." && flagDec == false) checkDec(btn);

  if (btn != ".") {
    //CHECK EXISTING DISPLAY
    if (displ.innerHTML == 0 && displ.innerHTML.length <= 1) {
      displ.innerHTML = btn;
    } else {
      displ.innerHTML += btn;
    }
  }
}

function checkDec(btn) {
  displ.innerHTML += btn;
  flagDec = true;
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
    displSmall.innerHTML =
      displSmall.innerHTML[displSmall.innerHTML.length - 2] + btn;
  }
}

function operate(oper, num1, num2) {
  switch (oper) {
    case "+":
      displSmall.innerHTML = add(num1, num2);
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
}

function add(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

function sub(num1, num2) {}

function mult(num1, num2) {}

function divid(num1, num2) {}


let num1 = null;
let num2 = null;
let flagOper = false;
let flagDec = false;
let tempOper = 0;