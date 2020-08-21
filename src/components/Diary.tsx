import React from "react";
import styled from "styled-components";
import CouldBeImproved from "./CouldBeImproved";
import { FormattedDate } from "./FormattedDate";
import NotWell from "./NotWell";
import Risk from "./Risk";
import { H1 } from "./styled";
import WentWell from "./WentWell";
import WhatHappened from "./WhatHappened";

const Cell = styled.div`
  border: 1px dotted silver;
  padding: 1em;
  margin: 1em;
`;

export const Diary: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
      <Cell className="text-center md:col-span-2 lg:col-span-3">
        <H1>Diary</H1>
        <FormattedDate />
      </Cell>
      <Cell className="md:col-span-2 lg:row-span-2 lg:col-span-1">
        <WhatHappened />
      </Cell>
      <Cell>
        <WentWell />
      </Cell>
      <Cell>
        <CouldBeImproved />
      </Cell>
      <Cell>
        <NotWell />
      </Cell>
      <Cell>
        <Risk />
      </Cell>
    </div>
  );
};
