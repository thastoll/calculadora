import { OperatorSymbol } from "../types/calculator";

export const parseInputTextToNumber = (inputText: string): number => {
  const value = Number(inputText);
  return Number.isFinite(value) ? value : 0;
}

export const applyOperator = (leftValue: number, rightValue: number, operator: OperatorSymbol): number => {
  switch (operator) {
    case "+":
      return leftValue + rightValue;
    case "-":
      return leftValue - rightValue;
    case "×":
      return leftValue * rightValue;
    case "÷":
      return rightValue === 0 ? 0 : leftValue / rightValue;
  }
}

export const clampInputTextLength = (inputText: string, maxLength = 16): string => {
  if (inputText.length <= maxLength) return inputText;
  return inputText.slice(0, maxLength);
}
