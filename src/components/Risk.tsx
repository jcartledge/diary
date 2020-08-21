import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "../redux/actions";
import { selectRisk } from "../redux/selectors";
import { H2 } from "./styled";
import { TextArea } from "./TextArea";

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
