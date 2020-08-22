import { H2 } from "components/atoms/styled";
import TextArea from "components/atoms/TextArea";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "store/actions";
import { selectWentWell } from "store/selectors";

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
