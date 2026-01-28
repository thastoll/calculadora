import styled from "styled-components";

export const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 28px 16px;
  background: #2f3f5b; 
`;

export const Container = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #e9eef7;
`;

export const Wrapper = styled.div`
  border-radius: 10px;
  padding: 14px 16px;
  background: #1f2b3d; 
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
`;

export const History = styled.div`
  font-size: 14px;
  opacity: 0.7;
  text-align: right;
  min-height: 18px;
  color: #cdd6e6;
`;

export const Value = styled.div`
  margin-top: 6px;
  text-align: right;
  font-size: 34px;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  button {
    height: 54px;
  }

`;

export const Button = styled.button`
  border: 1px solid rgba(22, 28, 40, 0.65);
  border-radius: 8px;
  background: #f2f2f2; 
  color: #1b2433;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.18);
  transition: transform 0.06s ease, filter 0.12s ease;

  &:hover {
    filter: brightness(0.98);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.16);
  }

  ${Grid} > &:nth-child(4),
  ${Grid} > &:nth-child(8),
  ${Grid} > &:nth-child(12),
  ${Grid} > &:nth-child(16) {
    background: #465878; 
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.08);
  }

  ${Grid} > &:nth-last-child(2) {
    background: #5a6c8a;
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.08);
  }

  ${Grid} > &:last-child {
    background: #d8483a;
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.08);
  }
`;