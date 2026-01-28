import { useCalculator } from "../hooks/useCalculator";
import * as S from "./Calculator.styled";
import { CALCULATOR_KEYS } from "../constants/keys";


export const Calculator = () => {
  
  const { displayText, handleKeyPress, historyText } = useCalculator();

  return (
    <S.Page>
      <S.Container>

        <S.Title>Calculadora</S.Title>

        <S.Wrapper>
          <S.History>{historyText}</S.History>
          <S.Value>{displayText}</S.Value>
        </S.Wrapper>

        <S.Grid>
          {CALCULATOR_KEYS.map((key, index) => (

            <S.Button type="button" onClick={() => handleKeyPress(key)} key={index}>
              {key}
            </S.Button>
  
          ))}
        </S.Grid>

      </S.Container>
    </S.Page>
  );
}
