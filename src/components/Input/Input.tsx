import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";

import Icon, { IconType } from "@components/Icon";
import { IconColor } from "@components/Icon/Icon";
import classnames from "classnames";

import styles from "./Input.module.scss";

export enum InputStatus {
  error = "error",
  warning = "warning",
}

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  className?: string;
  value?: string;
  type?: string;
  status?: InputStatus | null;
  icon?: IconType;
  onChange: (value: string) => void;
};

const Input: FC<InputProps> = ({
  className,
  type = "text",
  value = "",
  status,
  icon,
  onChange,
  ...args
}) => {
  const [valueState, setValueState] = useState(value);

  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;

    setValueState(newValue);
    onChange(newValue);
  }, []);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <div className={classnames(styles["input-wrapper"], className)}>
      <input
        className={classnames(
          styles.input,
          { [styles["input_has-icon"]]: icon },
          {
            [styles[`input_${status}`]]: status,
          }
        )}
        type={type}
        value={valueState}
        onChange={handleChange}
        {...args}
      />

      {icon && (
        <Icon
          className={styles.icon}
          type={icon}
          color={status ? IconColor[status] : IconColor.secondary}
        />
      )}
    </div>
  );
};

export default Input;
