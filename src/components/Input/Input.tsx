import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";

import styles from "./Input.module.scss";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  className?: string;
  value?: string;
  type?: string;
  onChange: (value: string) => void;
};

const Input: FC<InputProps> = ({
  className,
  type = "text",
  value = "",
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
    <div className={className}>
      <input
        className={styles.input}
        type={type}
        value={valueState}
        onChange={handleChange}
        {...args}
      />
    </div>
  );
};

export default Input;
