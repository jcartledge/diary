import styled from "styled-components";

export const TextArea = styled.div.attrs({
  contentEditable: true,
  role: "textbox",
  className: "input",
  suppressContentEditableWarning: true,
})`
  width: 100%;
  height: auto;
  border: 0;
`;
