(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    let firstNumber = "";
    let secondNumber = "";
    let sign = "";
    let finish = false;
    const arrNum = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "." ];
    const arrAction = [ "-", "*", "÷", "+", "%" ];
    let out = document.querySelector(".calc__result p");
    document.querySelector(".ac").addEventListener("click", (event => {
        firstNumber = "";
        secondNumber = "";
        sign = "";
        out.textContent = "";
        finish = false;
    }));
    document.querySelector(".calc__numbers").addEventListener("click", (event => {
        if (event.target.closest(".ac")) return;
        if (event.target.closest(".calc__number")) {
            out.textContent = "";
            let key = event.target.textContent;
            if (firstNumber === "0" && arrNum[0].includes(key)) {
                firstNumber = "";
                out.textContent = "";
            }
            if (secondNumber === "0" && arrNum[0].includes(key)) {
                secondNumber = "";
                out.textContent = "";
            }
            if (key == "+/-" && firstNumber === "-") {
                firstNumber = "";
                out.textContent = "";
                return;
            }
            if (key == "+/-" && secondNumber === "-") {
                secondNumber = "";
                out.textContent = "";
                return;
            }
            if (key === "+/-" && secondNumber === "" && sign === "") {
                console.log(`first: ${firstNumber}`, `second: ${secondNumber}`, sign);
                if (firstNumber !== "") {
                    firstNumber *= -1;
                    out.textContent = firstNumber;
                } else {
                    firstNumber = "-";
                    out.textContent = "-";
                }
            }
            if (key === "+/-" && firstNumber !== "" && sign !== "") if (secondNumber !== "") {
                secondNumber *= -1;
                out.textContent = secondNumber;
            } else {
                secondNumber = "-";
                out.textContent = "-";
            }
            if (key === "+/-" && firstNumber !== "" && sign !== "" && finish) {
                firstNumber *= -1;
                out.textContent = firstNumber;
                return;
            }
            if (arrNum.includes(key)) if (secondNumber === "" && sign === "") if (key === "." && firstNumber.includes(".")) {
                firstNumber += "";
                out.textContent = firstNumber;
            } else {
                firstNumber += key;
                out.textContent = firstNumber;
            } else if (firstNumber !== "" && secondNumber !== "" && finish) {
                secondNumber = key;
                finish = false;
                out.textContent = secondNumber;
            } else if (key === "." && secondNumber.includes(".")) {
                secondNumber += "";
                out.textContent = secondNumber;
            } else {
                secondNumber += key;
                out.textContent = secondNumber;
            }
            if (arrAction.includes(key)) {
                sign = key;
                out.textContent = sign;
                return;
            }
            if (key === "=") {
                if (secondNumber === "") secondNumber = firstNumber;
                switch (sign) {
                  case "+":
                    firstNumber = +firstNumber + +secondNumber;
                    break;

                  case "-":
                    firstNumber -= secondNumber;
                    break;

                  case "*":
                    firstNumber *= secondNumber;
                    break;

                  case "÷":
                    firstNumber /= secondNumber;
                    break;

                  case "%":
                    firstNumber = firstNumber / 100 * secondNumber;
                }
                finish = true;
                let numb = Number(firstNumber);
                out.textContent = +numb.toFixed(6);
            }
        }
    }));
    window["FLS"] = true;
    isWebp();
})();