(function () {

const firstInput = document.getElementById("firstNumber");
const secondInput = document.getElementById("secondNumber");
const operatorSelect = document.getElementById("mathOperator");
const computeButton = document.getElementById("computeBtn");
const outputDisplay = document.getElementById("outputDisplay");
const firstError = document.getElementById("firstError");
const secondError = document.getElementById("secondError");

const MAX_HISTORY_ITEMS = 4;
let calculationHistory = [];

const clearErrors = () => {
    [firstInput, secondInput].forEach(input => input.classList.remove("invalid"));
    [firstError, secondError].forEach(err => err.textContent = "");
};

const showError = (input, errorBlock, message) => {
    input.classList.add("invalid");
    errorBlock.textContent = message;
};

const updateHistoryDisplay = () => {
    outputDisplay.innerHTML = calculationHistory
        .map((entry, i) => `<div class="historyEntry ${i === calculationHistory.length - 1 ? 'current' : 'previous'}">${entry}</div>`)
        .join('');
};

const performCalculation = () => {
    clearErrors();

    const rawFirst = firstInput.value.trim();
    const rawSecond = secondInput.value.trim();
    let hasError = false;

    if (!rawFirst) {
        showError(firstInput, firstError, "Введите число");
        hasError = true;
    }
    if (!rawSecond) {
        showError(secondInput, secondError, "Введите число");
        hasError = true;
    }
    if (hasError) return;

    const [num1, num2] = [parseFloat(rawFirst), parseFloat(rawSecond)];
    const operator = operatorSelect.value;

    if (operator === "/" && num2 === 0) {
        showError(secondInput, secondError, "Делить на 0 нельзя");
        return;
    }

    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            result = 0;
    }

    calculationHistory.push(`${rawFirst} ${operator} ${rawSecond} = ${result}`);
    calculationHistory = calculationHistory.slice(-MAX_HISTORY_ITEMS);
    updateHistoryDisplay();
};
computeButton.addEventListener("click", performCalculation);
})();