import { H2 } from "components/atoms/styled";
import TextArea from "components/atoms/TextArea";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "store/actions";
import { selectWhatHappened } from "store/selectors";

const WhatHappened: React.FC = () => (
  <>
    <H2 id="what-happened-label">What happened?</H2>
    <TextArea
      aria-labelledby="what-happened-label"
      onChange={useDispatchFieldChangedAction("whatHappened")}
      defaultValue={useSelector(selectWhatHappened)}
    />
  </>
);

export default WhatHappened;
