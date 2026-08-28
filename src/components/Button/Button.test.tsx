import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("forwards native attributes, className and click behavior", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button
        className="consumer-class"
        data-testid="primary-action"
        aria-label="收集贝壳"
        onClick={onClick}
      >
        收集
      </Button>,
    );

    const button = screen.getByRole("button", { name: "收集贝壳" });
    expect(button).toHaveClass("cute-button", "consumer-class");
    expect(button).toHaveAttribute("data-testid", "primary-action");
    expect(button).toHaveAttribute("type", "button");

    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not activate while disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        背包已满
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "背包已满" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
