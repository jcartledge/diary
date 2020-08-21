import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as breakpoint from "../breakpoints";
import { Cell } from "../grid";
import { useDispatchFieldChangedAction } from "../redux/actions";
import { selectEntry } from "../redux/selectors";
import { buildDiaryEntry } from "../redux/state";
import { H2 } from "./styled";
import { TextArea } from "./TextArea";

const WhatHappenedWrapper = styled(Cell)`
  ${breakpoint.sm} {
    grid-column: 1 / span 2;
    grid-row: 2;
  }
  ${breakpoint.md} {
    grid-column: 1;
    grid-row: 2 / span 2;
  }
`;

const WhatHappened: React.FC = () => {
  const dispatchWhatHappenedChangedAction = useDispatchFieldChangedAction(
    "whatHappened"
  );

  const { whatHappened } = useSelector(selectEntry) ?? buildDiaryEntry();

  return (
    <WhatHappenedWrapper>
      <H2 id="what-happened-label">What happened?</H2>
      <TextArea
        aria-labelledby="what-happened-label"
        onChange={dispatchWhatHappenedChangedAction}
        defaultValue={whatHappened}
      />
    </WhatHappenedWrapper>
  );
};

export default WhatHappened;
