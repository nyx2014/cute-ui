import { forwardRef, useEffect } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import "./cursor.css";

export interface CursorProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface GlobalCursorProps {
  /** Disable without unmounting the component. */
  enabled?: boolean;
  /** Defaults to document.documentElement in the browser. */
  target?: HTMLElement;
}

const globalCursorUsers = new WeakMap<HTMLElement, number>();

export const Cursor = forwardRef<HTMLDivElement, CursorProps>(function Cursor(
  { children, className, ...divProps },
  ref,
) {
  const classes = ["cute-cursor-area", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} {...divProps}>
      {children}
    </div>
  );
});

/**
 * Explicit opt-in for applying the hand cursor to a whole document or custom
 * root. The reference count prevents one instance from disabling another.
 */
export function GlobalCursor({
  enabled = true,
  target,
}: GlobalCursorProps): null {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") {
      return;
    }

    const root = target ?? document.documentElement;
    const users = globalCursorUsers.get(root) ?? 0;
    globalCursorUsers.set(root, users + 1);
    root.classList.add("cute-ui-global-cursor");

    return () => {
      const remainingUsers = (globalCursorUsers.get(root) ?? 1) - 1;
      if (remainingUsers <= 0) {
        globalCursorUsers.delete(root);
        root.classList.remove("cute-ui-global-cursor");
      } else {
        globalCursorUsers.set(root, remainingUsers);
      }
    };
  }, [enabled, target]);

  return null;
}
