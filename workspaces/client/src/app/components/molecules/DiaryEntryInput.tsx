import TextArea from "app/components/atoms/TextArea";
import slugify from "slugify";

type FieldUpdater = (value: string) => void;

interface DiaryEntryInputProps {
  label: string;
  value: string;
  fieldUpdater: FieldUpdater;
  disabled?: boolean;
}

const slugFieldName = (label: string) => slugify(label, { lower: true });

const updateHandler =
  (updateField: FieldUpdater): React.ChangeEventHandler<HTMLTextAreaElement> =>
  ({ target }) =>
    updateField(target.value);

const DiaryEntryInput: React.FC<DiaryEntryInputProps> = ({
  label,
  value,
  fieldUpdater,
  disabled = false,
}) => {
  const fieldLabel = slugFieldName(label);
  return (
    <article>
      <header>
        <label id={`${fieldLabel}-label`} aria-label={fieldLabel}>
          <strong>{label}</strong>
        </label>
      </header>
      <TextArea
        id={fieldLabel}
        aria-labelledby={`${fieldLabel}-label`}
        value={value}
        onChange={updateHandler(fieldUpdater)}
        disabled={disabled}
      />
    </article>
  );
};

export default DiaryEntryInput;
