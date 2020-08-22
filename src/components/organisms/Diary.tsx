import Cell from "components/atoms/Cell";
import { H1 } from "components/atoms/styled";
import NotWell from "components/molecules/NotWell";
import Risk from "components/molecules/Risk";
import WentWell from "components/molecules/WentWell";
import WhatHappened from "components/molecules/WhatHappened";
import React from "react";
import { FormattedDate } from "../atoms/FormattedDate";
import CouldBeImproved from "../molecules/CouldBeImproved";

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
