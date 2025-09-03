import {
  forwardRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import "./button.css";
import { BUTTON_SIZE_CLASS, BUTTON_SIZE_CLASS_SM, type ButtonSize } from "../../../app/data/button";

type ButtonVariant = "solid" | "outline";

type ButtonOrAnchorProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

type ButtonProps = ButtonOrAnchorProps & {
  size?: ButtonSize;
  fullWidth?: boolean;
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      size = "lg",
      fullWidth,
      variant = "solid",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const width = fullWidth ? "btn--full" : "";
    const classes = `btn btn--${variant} ${BUTTON_SIZE_CLASS["md"]} ${BUTTON_SIZE_CLASS_SM[size]} ${width} ${className}`;

    if ("href" in rest && rest.href) {
      const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
