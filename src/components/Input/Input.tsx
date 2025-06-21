import React from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...rest}
        className={styles.Input}
      />
    );
  }
);

export default Input;
