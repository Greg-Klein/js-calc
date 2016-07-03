var disp = document.querySelector('#display'),
  keys = document.querySelectorAll('.key'),
  operand,
  val1,
  val2;

for (i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', clicked);
}

window.addEventListener('keypress', function(e) {
  e = e || window.event;
  keyPressed(e.key);
});

function clicked() {
  // this.textContent for Mozilla
  var key = this.innerText || this.textContent;
  keyPressed(key);
}

function keyPressed(key) {
  var val = display.value;
  if (isNaN(key)) {
    switch (key) {
      case 'AC':
        resetDisplay();
        operand = "";
        break;
      case '±':
        if (val.startsWith("-")) {
          display.value = val.substr(1, val.length);
        } else {
          display.value = "-" + val;
        }
        break;
      case '.':
        if (val === '' || val === '-') {
          display.value += "0.";
        } else {
          display.value += ".";
        }
        break;
      case '%':
        display.value = val / 100;
        break;
      case 'x²':
      case '²':
        display.value = val * val;
        break;
      case '+':
        operation('+');
        break;
      case '-':
        operation('-');
        break;
      case '×':
      case '*':
        operation('×');
        break;
      case '÷':
      case '/':
        operation('÷');
        break;
      case 'Enter':
      case '=':
        equals();
        break;
    }
  } else {
    if (val.length < 9) {
      display.value += key;
    }
  }
}

function equals() {
  if (val1 !== undefined && operand) {
    val2 = parseFloat(display.value);
    switch (operand) {
      case '+':
        display.value = Math.round((val1 + val2) * 10000) / 10000;
        break;
      case '-':
        display.value = Math.round((val1 - val2) * 10000) / 10000;
        break;
      case '×':
        display.value = Math.round((val1 * val2) * 10000) / 10000;
        break;
      case '÷':
        if (val2 === 0) {
          display.value = "Error";
        } else {
          display.value = Math.round((val1 / val2) * 10000) / 10000;
        }
        break;
    }
    operand = "";
  }
}

function operation(type) {
  if (display.value === '') {
    display.value = 0;
  }
  if (operand) {
    equals();
    val1 = parseFloat(display.value);
  } else {
    val1 = parseFloat(display.value);
  }
  operand = type;
  display.value = '';
  display.placeholder = val1 + operand;
}

function resetDisplay() {
  display.value = '';
  display.placeholder = 0;
}