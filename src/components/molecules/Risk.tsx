import { H2 } from "components/atoms/styled";
import TextArea from "components/atoms/TextArea";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "store/actions";
import { selectRisk } from "store/selectors";

const Risk: React.FC = () => (
  <>
    <H2 id="risk-label">Might be a risk</H2>
    <TextArea
      aria-labelledby="risk-label"
      defaultValue={useSelector(selectRisk)}
      onChange={useDispatchFieldChangedAction("risk")}
    />
  </>
);

export default Risk;
