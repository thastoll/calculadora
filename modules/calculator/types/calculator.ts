export type OperatorSymbol = "+" | "-" | "×" | "÷";

export type CalculatorKey =
  | "AC"
  | "⌫"
  | "%"
  | "±"
  | "."
  | "="
  | OperatorSymbol
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export interface CalculatorState {
  accumulatedValue: number | null;     
  currentInputText: string;            
  pendingOperator: OperatorSymbol | null;
  shouldStartNewInput: boolean;         
  historyText: string;
}
