import { render, screen } from "@testing-library/react";
import { Cursor, GlobalCursor } from "./Cursor";

describe("Cursor", () => {
  it("renders a visible scoped interaction area", () => {
    render(
      <Cursor className="consumer-zone" data-testid="cursor-zone">
        移动鼠标
      </Cursor>,
    );

    expect(screen.getByTestId("cursor-zone")).toHaveClass(
      "cute-cursor-area",
      "consumer-zone",
    );
    expect(screen.getByText("移动鼠标")).toBeVisible();
  });

  it("adds and removes the explicit global class", () => {
    const { unmount } = render(<GlobalCursor />);
    expect(document.documentElement).toHaveClass("cute-ui-global-cursor");

    unmount();
    expect(document.documentElement).not.toHaveClass("cute-ui-global-cursor");
  });
});
