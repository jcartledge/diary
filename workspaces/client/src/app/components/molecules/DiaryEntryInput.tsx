import TextArea from "app/components/atoms/TextArea";
import slugify from "slugify";

interface DiaryEntryInputProps {
  label: string;
  value: string;
  updateField: (value: string) => void;
  disabled?: boolean;
}

const slugFieldName = (label: string) => slugify(label, { lower: true });

const DiaryEntryInput: React.FC<DiaryEntryInputProps> = ({
  label,
  value,
  updateField,
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
        onChange={({ target }) => updateField(target.value)}
        disabled={disabled}
      />
    </article>
  );
};

export default DiaryEntryInput;
