import TextArea from "app/components/atoms/TextArea";
import React from "react";
import slugify from "slugify";

interface DiaryEntryInputProps {
  label: string;
  value: string;
  updateField: (value: string) => void;
}

const slugFieldName = (label: string) => slugify(label, { lower: true });

const DiaryEntryInput: React.FC<DiaryEntryInputProps> = ({
  label,
  value,
  updateField,
}) => {
  const fieldLabel = slugFieldName(label);
  return (
    <article>
      <header>
        <label id={`${fieldLabel}-label`} aria-label={fieldLabel}>
          {label}
        </label>
      </header>
      <TextArea
        id={fieldLabel}
        aria-labelledby={`${fieldLabel}-label`}
        value={value}
        onChange={({ target }) => updateField(target.value)}
      />
    </article>
  );
};

export default DiaryEntryInput;
