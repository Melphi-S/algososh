import React from "react";
import styles from "./input.module.css";
import { rightEnd } from "../../../utils/utils";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
}

export const Input: React.FC<InputProps> = ({
  extraClass = "",
  type = "text",
  placeholder = type === "text" ? "Введите текст" : "Введите число",
  maxLength,
  min,
  max,
  isLimitText = false,
  ...rest
}) => {
  const limitText =
    type === "text" && maxLength
      ? `Максимум — ${maxLength} ${rightEnd(maxLength, [
          "символ",
          "символа",
          "символов",
        ])}`
      : `Введите число от ${min} до ${max}`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text_type_input text_color_input`}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        max={max}
        {...rest}
      />
      {isLimitText && (
        <span
          className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
        >
          {limitText}
        </span>
      )}
    </div>
  );
};
