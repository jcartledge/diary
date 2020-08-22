import { H2 } from "components/atoms/styled";
import TextArea from "components/atoms/TextArea";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatchFieldChangedAction } from "store/actions";
import { selectCouldBeImproved } from "store/selectors";

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
