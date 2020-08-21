import React from "react";
import { H2 } from "./styled";
import { TextArea } from "./TextArea";
import { useSelector } from "react-redux";
import { selectWentWell } from "../redux/selectors";
import { useDispatchFieldChangedAction } from "../redux/actions";

const WentWell: React.FC = () => (
  <>
    <H2 id="went-well-label">Went well</H2>
    <TextArea
      aria-labelledby="went-well-label"
      defaultValue={useSelector(selectWentWell)}
      onChange={useDispatchFieldChangedAction("wentWell")}
    />
  </>
);

export default WentWell;
