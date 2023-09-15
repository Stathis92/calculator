const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const displ = document.getElementById("display");

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    //NUMBER BUTTON CLICKED FUNCTION
    registerNumber(button.innerHTML);
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {

    //OPERATOR BUTTON CLICKED FUNCTION
    tempNumber = parseInt(displ.innerHTML);
    tempOper = button.id;
    displ.innerHTML += button.innerHTML;
    operate(tempOper, tempNumber, tempNumber2);
  });
});

function registerNumber(btn){
    if (displ.innerHTML == 0)
    {
    displ.innerHTML = btn;
    }else{
    displ.innerHTML += btn;
    }
}

function operate(oper, num1, num2) {

}

function add(num1, num2){
    return parseInt(num1)+parseInt(num2);
}

function sub(num1, num2){
    return num1-num2;
}

function mult(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    if(num2 == 0)
     return "I AM ERROR :D";
    return num1/num2;
}

let tempNumber = 0;