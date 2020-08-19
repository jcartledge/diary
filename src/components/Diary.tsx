import React from "react";
import styled from "styled-components";
import * as breakpoint from "../breakpoints";
import { Cell, Grid } from "../grid";
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

interface DiaryProps {
  date: Date;
}

export const Diary: React.FC<DiaryProps> = ({ date }) => {
  return (
    <Grid>
      <Header>
        <H1>Diary</H1>
        <FormattedDate date={date} />
      </Header>
      <WhatHappened>
        <H2>What happened?</H2>
        <TextArea>[placeholder]</TextArea>
      </WhatHappened>
      <WentWell>
        <H2>Went well</H2>
        <TextArea>[placeholder]</TextArea>
      </WentWell>
      <CouldBeImproved>
        <H2>Could be improved</H2>
        <TextArea>[placeholder]</TextArea>
      </CouldBeImproved>
      <NotWell>
        <H2>Didn't go well</H2>
        <TextArea>[placeholder]</TextArea>
      </NotWell>
      <Risk>
        <H2>Might be a risk</H2>
        <TextArea>[placeholder]</TextArea>
      </Risk>
    </Grid>
  );
};
