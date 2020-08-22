import { H2 } from "components/atoms/styled";
import TextArea from "components/atoms/TextArea";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "store/actions";
import { selectNotWell } from "store/selectors";

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
