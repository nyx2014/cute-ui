import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("has an accessible name and dismisses with Escape", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(
      <Dialog heading="岛民提示" modal onDismiss={onDismiss}>
        按下 Escape 返回
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog", { name: "岛民提示" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("uses unique clip-path ids per instance", () => {
    const { container } = render(
      <>
        <Dialog aria-label="一号">第一条</Dialog>
        <Dialog aria-label="二号">第二条</Dialog>
      </>,
    );

    const ids = Array.from(container.querySelectorAll("clipPath")).map(
      (clipPath) => clipPath.id,
    );
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});
