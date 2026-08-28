import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual width and padding preset. */
  size?: "compact" | "default" | "wide";
  /** Stretch to the width of the containing block. */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      fullWidth = false,
      size = "default",
      type = "button",
      ...buttonProps
    },
    ref,
  ) {
    const classes = [
      "cute-button",
      `cute-button--${size}`,
      fullWidth ? "cute-button--full" : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} type={type} {...buttonProps}>
        <span className="cute-button__label">{children}</span>
      </button>
    );
  },
);
