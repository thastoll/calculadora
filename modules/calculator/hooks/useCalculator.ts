import { useMemo, useState } from "react";
import { initialCalculatorState, reduceCalculatorKey } from "../utils/calculatorReducer";
import { CalculatorKey } from "../types/calculator";

export const useCalculator = () => {
  const [calculatorState, setCalculatorState] = useState(initialCalculatorState);

  const displayText = useMemo(
    () => calculatorState.currentInputText,
    [calculatorState.currentInputText]
  );

  const historyText = useMemo(
    () => calculatorState.historyText,
    [calculatorState.historyText]
  );

  const handleKeyPress = (key: CalculatorKey) => {
    setCalculatorState((prevState) => reduceCalculatorKey(prevState, key));
  };

  return {
    displayText,
    historyText, 
    handleKeyPress,
    calculatorState,
  };
};