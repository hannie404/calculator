// const screen = document.getElementById("screen");
// const allBtn = document.querySelectorAll(".btns");
// const delBtn = document.querySelector(".btn-del");
// const equalBtn = document.querySelector(".btn-equal");
// const clearBtn = document.querySelector(".btn-clear");
// const dotBtn = document.querySelector(".dot");

// allBtn.forEach(function(btn){
//   btn.addEventListener("click", function(e){
//     let value = e.target.dataset.num;
//     if (value === "%") {
//       screen.value = eval(screen.value) / 100; // Perform division by 100
//     } else {
//       screen.value += value;
//     }
//   });
// });

// equalBtn.addEventListener("click", function(e){
//   if(screen.value == ""){
//     screen.value = "";
//   }
//   else {
//     let answer;
//     try {
//       answer = eval(screen.value);
//       if (!isFinite(answer)) {
//         answer = "undefined";
//       }
//     } catch (error) {
//       answer = "undefined";
//     }
//     screen.value = answer;
//   }
// });


// delBtn.addEventListener("click", function(e){
//   screen.value = screen.value.slice(0,-1);
// });

// clearBtn.addEventListener("click", function(e){
//   screen.value = "";
// });

const screen = document.getElementById("screen");
const allBtn = document.querySelectorAll(".btns");
const delBtn = document.querySelector(".btn-del");
const equalBtn = document.querySelector(".btn-equal");
const clearBtn = document.querySelector(".btn-clear");
const dotBtn = document.querySelector(".dot");
let lastInputIsSymbol = false;

// Mapping of keyboard keys to calculator buttons
const keyMappings = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  ".": ".",
  "=": "btn-equal",
  "Enter": "btn-equal",
  "Backspace": "btn-del",
  "Delete": "btn-clear",
  "%": "percent"
};

// Event listener for keydown event
document.addEventListener("keydown", function(e) {
  const key = e.key;
  
  if (key === "/" || key === "Backspace" || key === "Enter") {
    handleSpecialKeys(key);
  } else {
    const btn = document.querySelector(`[data-num="${keyMappings[key]}"]`);
    if (btn) {
      btn.click(); // Trigger the corresponding button click event
    }
  }
});

// Function to handle special keys (Backspace, /, Enter)
function handleSpecialKeys(key) {
  const delBtn = document.querySelector(".btn-del");
  const divideBtn = document.querySelector(".sign.divide");
  const equalBtn = document.querySelector(".btn-equal");
  
  if (key === "Backspace") {
    delBtn.click(); // Trigger the click event of the delete button
  } else if (key === "/") {
    divideBtn.click(); // Trigger the click event of the divide button
  } else if (key === "Enter") {
    equalBtn.click(); // Trigger the click event of the equal button
  }
}


allBtn.forEach(function(btn){
  btn.addEventListener("click", function(e){
    let value = e.target.dataset.num;
    // Ignore consecutive symbols
    if (isSymbol(value) && lastInputIsSymbol) {
      return; 
    }

    if (value === "%") {
      screen.value = eval(screen.value) / 100; // Perform division by 100
    } else {
      screen.value += value;
    }

    lastInputIsSymbol = isSymbol(value);
  });
});

equalBtn.addEventListener("click", function(e){
  if(screen.value == ""){
    screen.value = "";
  }
  else {
    let answer;
    try {
      answer = eval(screen.value);
      if (!isFinite(answer)) {
        answer = "undefined";
      }
    } catch (error) {
      answer = "undefined";
    }
    screen.value = answer;
  }
});

delBtn.addEventListener("click", function(e){
  screen.value = screen.value.slice(0,-1);
  lastInputIsSymbol = isSymbol(screen.value[screen.value.length - 1]);
});

clearBtn.addEventListener("click", function(e){
  screen.value = "";
  lastInputIsSymbol = false;
});

function isSymbol(value) {
  return value === "+" || value === "-" || value === "*" || value === "/" || value === "%";
}