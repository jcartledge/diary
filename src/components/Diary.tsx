import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as breakpoint from "../breakpoints";
import { Cell, Grid } from "../grid";
import { buildDiaryEntry } from "../redux";
import { selectDate, selectEntry } from "../redux/selectors";
import { FormattedDate } from "./FormattedDate";
import { TextArea } from "./TextArea";

const H1 = styled.h1`
  text-transform: uppercase;
`;

const H2 = styled.h2`
  text-transform: uppercase;
`;

const Header = styled(Cell)`
  grid-row: 1;
  text-align: center;
  ${breakpoint.sm} {
    grid-column: 1 / span 2;
  }
  ${breakpoint.md} {
    grid-column: 1 / span 3;
  }
`;

const WhatHappened = styled(Cell)`
  ${breakpoint.sm} {
    grid-column: 1 / span 2;
    grid-row: 2;
  }
  ${breakpoint.md} {
    grid-column: 1;
    grid-row: 2 / span 2;
  }
`;

const WentWell = styled(Cell)`
  ${breakpoint.sm} {
    grid-column: 1;
    grid-row: 3;
  }
  ${breakpoint.md} {
    grid-column: 2;
    grid-row: 2;
  }
`;

const CouldBeImproved = styled(Cell)`
  ${breakpoint.sm} {
    grid-column: 2;
    grid-row: 3;
  }
  ${breakpoint.md} {
    grid-column: 3;
    grid-row: 2;
  }
`;

const NotWell = styled(Cell)`
  ${breakpoint.sm} {
    grid-column: 1;
    grid-row: 4;
  }
  ${breakpoint.md} {
    grid-column: 2;
    grid-row: 3;
  }
`;

const Risk = styled(Cell)`
  ${breakpoint.sm} {
    grid-column: 2;
    grid-row: 4;
  }
  ${breakpoint.md} {
    grid-column: 3;
    grid-row: 3;
  }
`;

export const Diary: React.FC = () => {
  const date = useSelector(selectDate);
  const { whatHappened, wentWell, notWell, risk, couldBeImproved } =
    useSelector(selectEntry) ?? buildDiaryEntry();
  return (
    <Grid>
      <Header>
        <H1>Diary</H1>
        <FormattedDate date={date} />
      </Header>
      <WhatHappened>
        <H2 id="what-happened-label">What happened?</H2>
        <TextArea aria-labelledby="what-happened-label">
          {whatHappened}
        </TextArea>
      </WhatHappened>
      <WentWell>
        <H2 id="went-well-label">Went well</H2>
        <TextArea aria-labelledby="went-well-label">{wentWell}</TextArea>
      </WentWell>
      <CouldBeImproved>
        <H2 id="could-be-improved-label">Could be improved</H2>
        <TextArea aria-labelledby="could-be-improved-label">
          {couldBeImproved}
        </TextArea>
      </CouldBeImproved>
      <NotWell>
        <H2 id="not-well-label">Didn't go well</H2>
        <TextArea aria-labelledby="not-well-label">{notWell}</TextArea>
      </NotWell>
      <Risk>
        <H2 id="risk-label">Might be a risk</H2>
        <TextArea aria-labelledby="risk-label">{risk}</TextArea>
      </Risk>
    </Grid>
  );
};
