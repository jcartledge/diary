import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatchFieldChangedAction } from "../redux/actions";
import { selectDate, selectEntry } from "../redux/selectors";
import { buildDiaryEntry } from "../redux/state";
import { FormattedDate } from "./FormattedDate";
import { H1, H2 } from "./styled";
import { TextArea } from "./TextArea";

const Cell = styled.div`
  border: 1px dotted silver;
  padding: 1em;
  margin: 1em;
`;

export const Diary: React.FC = () => {
  const date = useSelector(selectDate);
  const { whatHappened, wentWell, notWell, risk, couldBeImproved } =
    useSelector(selectEntry) ?? buildDiaryEntry();

  return (
    <div className="grid md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
      <Cell className="text-center md:col-span-2 lg:col-span-3">
        <H1>Diary</H1>
        <FormattedDate date={date} />
      </Cell>
      <Cell className="md:col-span-2 lg:row-span-2 lg:col-span-1">
        <H2 id="what-happened-label">What happened?</H2>
        <TextArea
          aria-labelledby="what-happened-label"
          onChange={useDispatchFieldChangedAction("whatHappened")}
          defaultValue={whatHappened}
        />
      </Cell>
      <Cell>
        <H2 id="went-well-label">Went well</H2>
        <TextArea
          aria-labelledby="went-well-label"
          defaultValue={wentWell}
          onChange={useDispatchFieldChangedAction("wentWell")}
        />
      </Cell>
      <Cell>
        <H2 id="could-be-improved-label">Could be improved</H2>
        <TextArea
          aria-labelledby="could-be-improved-label"
          defaultValue={couldBeImproved}
          onChange={useDispatchFieldChangedAction("couldBeImproved")}
        />
      </Cell>
      <Cell>
        <H2 id="not-well-label">Didn't go well</H2>
        <TextArea
          aria-labelledby="not-well-label"
          defaultValue={notWell}
          onChange={useDispatchFieldChangedAction("notWell")}
        />
      </Cell>
      <Cell>
        <H2 id="risk-label">Might be a risk</H2>
        <TextArea
          aria-labelledby="risk-label"
          defaultValue={risk}
          onChange={useDispatchFieldChangedAction("risk")}
        />
      </Cell>
    </div>
  );
};
