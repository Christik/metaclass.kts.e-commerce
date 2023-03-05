import { FC, ReactNode, useEffect, useId, useState } from "react";

import classnames from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string | ReactNode;
};

const MultiDropdown: FC<MultiDropdownProps> = (props) => {
  const { className, options, value, disabled, pluralizeOptions, onChange } =
    props;
  const id = useId();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(value);

  const handleClick = () => {
    setIsOpened((prevState) => !prevState);
  };

  const handleCheckboxChange = (option: Option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.some(({ key }) => key === option.key)) {
        const updatedOptions = prevSelectedOptions.filter(
          ({ key }) => key !== option.key
        );

        onChange(updatedOptions);
        return updatedOptions;
      }

      onChange([option]);
      return [...prevSelectedOptions, option];
    });
  };

  useEffect(() => setSelectedOptions(value), [value]);

  useEffect(() => setIsOpened(false), [disabled]);

  return (
    <div className={classnames(styles["multi-dropdown"], className)}>
      <button
        type="button"
        className={classnames(styles.header, {
          [styles["header_disabled"]]: disabled,
        })}
        disabled={disabled}
        onClick={handleClick}
      >
        {pluralizeOptions(selectedOptions)}
      </button>

      {isOpened && (
        <ul className={styles.list}>
          {options.map((option, index) => {
            const isChecked = selectedOptions.some(
              ({ key }) => key === option.key
            );

            return (
              <li key={option.key} className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  id={`${id}-${index}`}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(option)}
                />

                <label
                  className={classnames(styles.label, {
                    [styles["label_selected"]]: isChecked,
                  })}
                  htmlFor={`${id}-${index}`}
                >
                  {option.value}
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
