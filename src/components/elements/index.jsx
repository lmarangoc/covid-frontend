import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: ${(p) => p.justify};
  align-items: ${(p) => p.align};
  flex-direction: ${(p) => p.direction || "row"};
  width: ${(p) => p.width};
  padding: ${(p) => p.padding || "0px"};
  margin: ${(p) => p.margin || "0px"};
  background-color: ${(p) => p.bg || "transparent"};
  border-radius: ${(p) => p.borderRadius || "0px"};
  height: ${(p) => p.heigh || "auto"};
  box-shadow: ${(p) => (p.shadow ? "4px 4px 9px -5px #000000" : "none")};
  border-bottom: ${(p) => (p.borderBottom ? "1px" : "0px")} solid
    ${(p) => p.borderBottomColor || "transparent"};
`;

export const Txt = styled.p`
  color: ${(p) => p.color};
  font-size: ${(p) => p.fs};
  font-weight: ${(p) => (p.bold ? "bold" : "normal")};
  margin: ${(p) => p.margin || "0px"};
  cursor: ${(p) => (p.pointer ? "pointer" : "default")};
`;

export const TextInput = styled.input`
  border: none;
  outline: none;
  color: ${(p) => p.color};
  background-color: ${(p) => p.bg || "transparent"};
  font-size: ${(p) => p.fs};
  width: ${(p) => p.width};
  border-radius: ${(p) => p.borderRadius || "0px"};
  padding: ${(p) => p.padding || "0px"};
  margin: ${(p) => p.margin || "0px"};
  border-bottom: ${(p) => (p.borderBottom ? "1px" : "0xp")} solid
    ${(p) => p.borderBottomColor || "transparent"};
  &::placeholder {
    color: ${(p) => p.placerholderColor || p.color + "90"};
    font-size: calc(${(p) => p.fs} - 1px);
  }
`;

export const Btn = styled.button`
  height: ${(p) => p.height || "auto"};
  width: ${(p) => p.width || "fit-content"};
  background-color: ${(p) => p.bg || "transparent"};
  border-radius: ${(p) => p.borderRadius || "0px"};
  padding: ${(p) => p.padding || "0px"};
  margin: ${(p) => p.margin || "0px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: ${(p) =>
      p.bg ? p.bg + (!p.hover ? "c0" : "ff") : "transparent"};
  }
`;

export const TxtBtn = styled.button`
  color: ${(p) => p.color};
  margin: ${(p) => p.margin || "0px"};
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const Slct = styled.select`
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #ff6347;
  color: #000000;
  width: 100%;
  margin: 20px 0px 5px 0px;
  border-radius: 1px;
  font-size: 16px;
  option {
    color: #a3a3a3;
    border: none;
    outline: none;
    background: transparent;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;

export const Card = styled.div`
  margin: 2rem 2rem 2rem 0;
  padding: 1.5rem;
  width: 230px;
  box-shadow: 0 0 28px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-radius: 4px;
  &:hover {
    transform: scale(1.1);
  }
`;

export const CardCtnr = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

