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
      flagDec = 0;
    } else {
      num2 = displ.innerText;
      operate(tempOper, num1, num2);
      flagDec = 0;
    }
    displ.innerHTML = "0";
    registerOperator(button.innerHTML);
    console.log(num1 + " " + num2 + " HTML: " + displ.innerHTML);
  });
});

function registerNumber(btn) {
  if (btn != ".") {
    if (displ.innerHTML == 0) {
      displ.innerHTML = btn;
    } else {
      displ.innerHTML += btn;
    }
  } else if (flagDec == 0 && flagOper == 0) {
    displ.innerHTML += btn;
    flagDec = 1;
  }
}

function registerOperator(btn) {
  if (displ.innerHTML == 0 && btn == "-") {
    displSmall.innerHTML = displ.innerHTML + btn;
  } else if (flagOper == 0) {
    flagOper = 1;
    tempOper = btn;
    displSmall.innerHTML += btn;
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
let flagOper = 0;
let flagDec = 0;
let tempOper = 0;
