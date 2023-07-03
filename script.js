const screen = document.getElementById("screen");
const allBtn = document.querySelectorAll(".btn");
const delBtn = document.querySelector(".btn-del");
const equalBtn = document.querySelector(".btn-equal");
const clearBtn = document.querySelector(".btn-clear");
const dotBtn = document.querySelector(".dot");

allBtn.forEach(function(btn){
  btn.addEventListener("click", function(e){
    let value = e.target.dataset.num;
    screen.value += value;
  });
});

equalBtn.addEventListener("click", function(e){
  if(screen.value == ""){
    screen.value = "";
  }
  else{
    let answer = eval(screen.value);
    screen.value = answer;
  }
});

delBtn.addEventListener("click", function(e){
  screen.value = screen.value.slice(0,-1);
});

clearBtn.addEventListener("click", function(e){
  screen.value = "";
});