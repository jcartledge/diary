import Cell from "components/atoms/Cell";
import CouldBeImproved from "components/molecules/CouldBeImproved";
import NotWell from "components/molecules/NotWell";
import Risk from "components/molecules/Risk";
import WentWell from "components/molecules/WentWell";
import WhatHappened from "components/molecules/WhatHappened";
import React from "react";

export const Diary: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
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
