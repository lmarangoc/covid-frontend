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