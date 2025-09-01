import { forwardRef, type ButtonHTMLAttributes } from "react";
import "./button.css";
import { BUTTON_SIZE_CLASS } from "../../../app/data/button";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  fullWidth?: boolean;
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      fullWidth,
      variant = "solid",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const width = fullWidth ? "btn--full" : "";
    return (
      <button
        ref={ref}
        className={`btn btn--${variant} ${BUTTON_SIZE_CLASS[size]} ${width} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
