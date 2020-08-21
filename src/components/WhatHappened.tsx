import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "../redux/actions";
import { selectWhatHappened } from "../redux/selectors";
import { H2 } from "./styled";
import { TextArea } from "./TextArea";

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
