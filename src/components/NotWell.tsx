import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "../redux/actions";
import { selectNotWell } from "../redux/selectors";
import { H2 } from "./styled";
import { TextArea } from "./TextArea";

const NotWell: React.FC = () => (
  <>
    <H2 id="not-well-label">Didn't go well</H2>
    <TextArea
      aria-labelledby="not-well-label"
      defaultValue={useSelector(selectNotWell)}
      onChange={useDispatchFieldChangedAction("notWell")}
    />
  </>
);

export default NotWell;
