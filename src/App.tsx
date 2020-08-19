import React from "react";
import styled from "styled-components";

const breakpoint = {
  sm: `@media (min-width: 768px)`,
  md: `@media (min-width: 1280px)`,
};

const H1 = styled.h1`
  text-transform: uppercase;
`;

const H2 = styled.h2`
  text-transform: uppercase;
`;

const Grid = styled.div`
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

const Cell = styled.div`
  border: 1px dotted silver;
  padding: 1em;
  margin: 1em;
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

const TextArea = styled.div.attrs({
  contentEditable: true,
  role: "textbox",
  className: "input",
})`
  width: 100%;
  height: auto;
  border: 0;
`;

const App: React.FC = () => (
  <Grid>
    <Header>
      <H1>Diary</H1>
      <small>
        {new Intl.DateTimeFormat(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date())}
      </small>
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

export default App;
