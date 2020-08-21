import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "../redux/actions";
import { selectCouldBeImproved } from "../redux/selectors";
import { H2 } from "./styled";
import { TextArea } from "./TextArea";

const CouldBeImproved: React.FC = () => (
  <>
    <H2 id="could-be-improved-label">Could be improved</H2>
    <TextArea
      aria-labelledby="could-be-improved-label"
      defaultValue={useSelector(selectCouldBeImproved)}
      onChange={useDispatchFieldChangedAction("couldBeImproved")}
    />
  </>
);

export default CouldBeImproved;
