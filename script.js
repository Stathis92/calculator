const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const displ = document.getElementById("display");

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    //NUMBER BUTTON CLICKED FUNCTION
    if (button.id.slice(3) == "Dec") {
      displ.innerHTML += ".";
    } else {
      displ.innerHTML += parseInt(button.id.slice(3));
    }
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    //OPERATOR BUTTON CLICKED FUNCTION
  });
});

function operate(oper, num1, num2) {}
