import styled from "styled-components";
import * as breakpoint from "../breakpoints";

export const Grid = styled.div`
  margin: 2em;
  ${breakpoint.sm} {
    display: grid;
    grid-template-columns: repeat 2 1fr;
    grid-template-rows: repeat 4 1fr;
  }
  ${breakpoint.md} {
    grid-template-columns: repeat 3 1fr;
    grid-template-rows: repeat 3 1fr;
  }
`;

export const Cell = styled.div`
  border: 1px dotted silver;
  padding: 1em;
  margin: 1em;
`;
