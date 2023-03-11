import { FC, ReactNode, useCallback, useEffect, useId, useState } from "react";

import classnames from "classnames";

import styles from "./Select.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type SelectProps = {
  className?: string;
  options: Option[];
  value: string;
  onChange: (value: Option | null) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option | null) => string | ReactNode;
};

const getOptionByKey = (keyValue: string, options: Option[]) => {
  const option = options.find(({ key }) => key === keyValue);
  return option ?? null;
};

const Select: FC<SelectProps> = (props) => {
  const { className, options, value, disabled, pluralizeOptions, onChange } =
    props;
  const id = useId();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    getOptionByKey(value, options)
  );

  const handleClick = useCallback(() => {
    setIsOpened((prevState) => !prevState);
  }, []);

  const handleCheckboxChange = useCallback(
    (option: Option) => {
      setIsOpened(false);

      if (option.key === selectedOption?.key) {
        setSelectedOption(null);
        onChange(null);

        return;
      }

      setSelectedOption(option);
      onChange(option);
    },
    [onChange, selectedOption?.key]
  );

  useEffect(
    () => setSelectedOption(getOptionByKey(value, options)),
    [options, value]
  );

  useEffect(() => setIsOpened(false), [disabled]);

  return (
    <div className={classnames(styles.select, className)}>
      <button
        type="button"
        className={classnames(styles.header, {
          [styles["header_disabled"]]: disabled,
        })}
        disabled={disabled}
        onClick={handleClick}
      >
        {pluralizeOptions(selectedOption)}
      </button>

      {isOpened && (
        <ul className={styles.list}>
          {options.map((option, index) => {
            const isChecked = option.key === selectedOption?.key;

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

export default Select;
