import { CalculatorKey, CalculatorState, OperatorSymbol } from "../types/calculator";
import { applyOperator, clampInputTextLength, parseInputTextToNumber } from "./calculatorOperations";

const isDigitKey = (key: CalculatorKey) => /^[0-9]$/.test(key);

const isOperatorKey = (key: CalculatorKey): key is OperatorSymbol => key === "+" || key === "-" || key === "×" || key === "÷";

// Estado inicial: display "0", nada acumulado, nenhum operador pendente
export const initialCalculatorState: CalculatorState = {
  accumulatedValue: null, // valor guardado
  currentInputText: "0", //valor digitado pelo usuario
  pendingOperator: null, //operador escolhido
  shouldStartNewInput: false, // define se o proximo digito deve começar do zero, pra ser o proprio numero e nao concatenar, qndo vira true começa numero novo
  historyText: "",
};


export const buildHistoryText = (state: CalculatorState, nextCurrentInputText?: string) => {
  if (state.accumulatedValue === null || !state.pendingOperator) return "";

  const left = String(state.accumulatedValue);
  const op = state.pendingOperator;

  // Se ainda não começou a digitar o próximo número, mostra só "5 +"
  if (state.shouldStartNewInput) return `${left} ${op}`;

  // Se já está digitando, mostra "5 + 2"
  const right = nextCurrentInputText ?? state.currentInputText;
  return `${left} ${op} ${right}`;
};

export const reduceCalculatorKey = (state: CalculatorState, key: CalculatorKey): CalculatorState => {
  if (key === "AC") return { ...initialCalculatorState };

  if (isDigitKey(key)) return handleDigit(state, key);
  if (key === ".") return handleDot(state);
  if (isOperatorKey(key)) return handleOperator(state, key);
  if (key === "=") return handleEquals(state);
  if (key === "±") return handleToggleSign(state);
  if (key === "%") return handlePercent(state);
  if (key === "⌫") return handleBackspace(state);

  return state;
}

const handleDigit = (state: CalculatorState, digit: string): CalculatorState => {
  const baseText = state.shouldStartNewInput ? "0" : state.currentInputText;
  const nextText = baseText === "0" ? digit : baseText + digit;

  const nextState = {
    ...state,
    currentInputText: clampInputTextLength(nextText),
    shouldStartNewInput: false,
  };

  return {
    ...nextState,
    historyText: buildHistoryText({ ...nextState }),
  };
};


const handleDot = (state: CalculatorState): CalculatorState => {
  let nextState: CalculatorState;

  if (state.shouldStartNewInput) {
    nextState = { ...state, currentInputText: "0.", shouldStartNewInput: false };
  } else {
    if (state.currentInputText.includes(".")) return state;
    nextState = { ...state, currentInputText: state.currentInputText + "." };
  }

  return {
    ...nextState,
    historyText: buildHistoryText(nextState),
  };
};

const handleOperator = (state: CalculatorState, operator: OperatorSymbol): CalculatorState => {
  const currentValue = parseInputTextToNumber(state.currentInputText);

  if (state.accumulatedValue !== null && state.pendingOperator && state.shouldStartNewInput) {
    const nextState = { ...state, pendingOperator: operator };
    return { ...nextState, historyText: buildHistoryText(nextState) };
  }

  if (state.accumulatedValue === null) {
    const nextState = {
      ...state,
      accumulatedValue: currentValue,
      pendingOperator: operator,
      shouldStartNewInput: true,
    };

    return { ...nextState, historyText: buildHistoryText(nextState) };
  }

  if (state.pendingOperator) {
    const resultValue = applyOperator(state.accumulatedValue, currentValue, state.pendingOperator);

    const nextState = {
      ...state,
      accumulatedValue: resultValue,
      currentInputText: String(resultValue),
      pendingOperator: operator,
      shouldStartNewInput: true,
    };

    return { ...nextState, historyText: buildHistoryText(nextState) };
  }

  const nextState = { ...state, pendingOperator: operator, shouldStartNewInput: true };
  return { ...nextState, historyText: buildHistoryText(nextState) };
};


const handleEquals = (state: CalculatorState): CalculatorState => {
  if (state.accumulatedValue === null || !state.pendingOperator) return state;

  const currentValue = parseInputTextToNumber(state.currentInputText);
  const resultValue = applyOperator(state.accumulatedValue, currentValue, state.pendingOperator);

  const finalHistory = `${state.accumulatedValue} ${state.pendingOperator} ${state.currentInputText}`;

  return {
    ...state,
    accumulatedValue: null,
    pendingOperator: null,
    currentInputText: String(resultValue),
    shouldStartNewInput: true,
    historyText: finalHistory, 
  };
};

const handleToggleSign = (state: CalculatorState): CalculatorState => {
  if (state.currentInputText === "0") return state;

  const nextText = state.currentInputText.startsWith("-")
    ? state.currentInputText.slice(1)
    : `-${state.currentInputText}`;

  return { ...state, currentInputText: nextText };
}

const handlePercent = (state: CalculatorState): CalculatorState => {
  const currentValue = parseInputTextToNumber(state.currentInputText);

  if (state.accumulatedValue === null || !state.pendingOperator) {
    const next = String(currentValue / 100);
    return {
      ...state,
      currentInputText: next,
    };
  }

  const base = state.accumulatedValue;
  const operator = state.pendingOperator;

  let percentValue: number;

  if (operator === "+" || operator === "-") {
    percentValue = base * (currentValue / 100);
  } else {
    percentValue = currentValue / 100;
  }

  const nextText = String(percentValue);

  return {
    ...state,
    currentInputText: nextText,
    shouldStartNewInput: false, 
  };
};

const handleBackspace = (state: CalculatorState): CalculatorState => {
  if (state.shouldStartNewInput) {
    return { ...state, currentInputText: "0", shouldStartNewInput: false };
  }

  if (state.currentInputText.length <= 1) return { ...state, currentInputText: "0" };

  const nextText = state.currentInputText.slice(0, -1);
  return { ...state, currentInputText: nextText === "-" ? "0" : nextText };
}
