import Cell from "components/atoms/Cell";
import { H2 } from "components/atoms/styled";
import TextArea from "components/atoms/TextArea";
import React from "react";
import { useSelector } from "react-redux";
import { OutputSelector } from "reselect";
import { useDispatchFieldChangedAction } from "store/actions";
import { AppState, DiaryEntry, DiaryEntryField } from "store/state";

interface DiaryEntryInputProps {
  label: string;
  selector: OutputSelector<AppState, string, (_: DiaryEntry) => string>;
  fieldName: DiaryEntryField;
  className?: string;
}
const DiaryEntryInput: React.FC<DiaryEntryInputProps> = ({
  label,
  selector,
  fieldName,
  className,
}) => (
  <Cell className={className ?? ""}>
    <H2 id={`${fieldName}-label`}>{label}</H2>
    <TextArea
      aria-labelledby={`${fieldName}-label`}
      onChange={useDispatchFieldChangedAction(fieldName)}
      value={useSelector(selector)}
    />
  </Cell>
);

export default DiaryEntryInput;
