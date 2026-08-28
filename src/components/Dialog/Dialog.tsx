import { forwardRef, useCallback, useEffect, useId, useRef } from "react";
import type {
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react";
import "./dialog.css";

const SHAPE_PATH =
  "M0.501,0.005 L0.501,0.005 L0.523,0.005 L0.549,0.006 C0.704,0.01,0.796,0.017,0.825,0.027 L0.827,0.028 C0.872,0.045,0.939,0.044,0.978,0.17 C1,0.254,1,0.365,0.99,0.505 L0.988,0.513 C0.979,0.558,0.971,0.598,0.965,0.633 C0.956,0.689,0.979,0.77,0.964,0.865 C0.953,0.928,0.921,0.966,0.869,0.979 C0.821,0.986,0.773,0.992,0.726,0.995 L0.712,0.996 L0.694,0.997 C0.648,1,0.586,1,0.507,1 L0.501,1 L0.464,1 C0.385,1,0.325,0.998,0.283,0.995 C0.234,0.992,0.184,0.987,0.133,0.979 C0.081,0.966,0.05,0.928,0.039,0.865 C0.023,0.77,0.047,0.689,0.037,0.633 C0.031,0.595,0.023,0.552,0.013,0.505 C-0.006,0.365,-0.002,0.254,0.024,0.17 C0.064,0.045,0.13,0.045,0.174,0.028 L0.175,0.028 C0.204,0.017,0.303,0.009,0.474,0.005 L0.501,0.005";

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional visible heading, also used as the accessible name. */
  heading?: ReactNode;
  /** Render state. Defaults to visible for legacy compatibility. */
  open?: boolean;
  /** Enables aria-modal and focuses the panel when opened. */
  modal?: boolean;
  /** Called by Escape and the optional close button. */
  onDismiss?: () => void;
  showCloseButton?: boolean;
  closeLabel?: string;
  size?: "small" | "medium" | "large";
}

function assignRef(
  forwardedRef: ForwardedRef<HTMLDivElement>,
  node: HTMLDivElement | null,
): void {
  if (typeof forwardedRef === "function") {
    forwardedRef(node);
  } else if (forwardedRef) {
    forwardedRef.current = node;
  }
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    children,
    className,
    closeLabel = "关闭对话框",
    heading,
    modal = false,
    onDismiss,
    onKeyDown,
    open = true,
    role = "dialog",
    showCloseButton = false,
    size = "medium",
    style,
    tabIndex,
    ...dialogProps
  },
  forwardedRef,
) {
  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const clipPathId = `cute-dialog-shape-${generatedId}`;
  const headingId = `cute-dialog-heading-${generatedId}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      assignRef(forwardedRef, node);
    },
    [forwardedRef],
  );

  useEffect(() => {
    if (open && modal) {
      rootRef.current?.focus();
    }
  }, [modal, open]);

  if (!open) {
    return null;
  }

  const classes = ["cute-dialog", `cute-dialog--${size}`, className ?? ""]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(event);
    if (event.key === "Escape" && !event.defaultPrevented) {
      onDismiss?.();
    }
  };

  return (
    <div
      {...dialogProps}
      ref={setRootRef}
      className={classes}
      role={role}
      aria-labelledby={heading ? headingId : dialogProps["aria-labelledby"]}
      aria-modal={modal || undefined}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex ?? (modal ? -1 : undefined)}
      style={style}
    >
      <svg className="cute-dialog__defs" aria-hidden="true">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d={SHAPE_PATH} />
          </clipPath>
        </defs>
      </svg>
      <div
        className="cute-dialog__surface"
        style={{ clipPath: `url(#${clipPathId})` }}
      >
        <div className="cute-dialog__content">
          {heading ? (
            <div id={headingId} className="cute-dialog__heading">
              {heading}
            </div>
          ) : null}
          <div className="cute-dialog__body">{children}</div>
          {showCloseButton && onDismiss ? (
            <button
              className="cute-dialog__close"
              type="button"
              aria-label={closeLabel}
              onClick={onDismiss}
            >
              ×
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
});
