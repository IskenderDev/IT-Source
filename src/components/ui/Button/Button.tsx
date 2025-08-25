import { forwardRef, type ButtonHTMLAttributes } from "react";
import "./button.css";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  fullWidth?: boolean;
  variant?: ButtonVariant;
}

const sizeClass: Record<ButtonSize, string> = {
  sm: "btn--sm",
  md: "btn--md",
  lg: "btn--lg",
};

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
        className={`btn btn--${variant} ${sizeClass[size]} ${width} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
