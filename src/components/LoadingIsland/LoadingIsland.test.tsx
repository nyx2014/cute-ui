import { render, screen } from "@testing-library/react";
import { LoadingIsland } from "./LoadingIsland";

describe("LoadingIsland", () => {
  it("renders an accessible reduced-motion status", () => {
    render(
      <LoadingIsland
        className="consumer-island"
        label="码头正在加载"
        motion="reduced"
        size="small"
      />,
    );

    const status = screen.getByRole("status", { name: "码头正在加载" });
    expect(status).toHaveClass(
      "cute-loading-island",
      "cute-loading-island--small",
      "consumer-island",
    );
    expect(status).toHaveAttribute("data-motion", "reduced");
  });

  it("namespaces every svg id across instances", () => {
    const { container } = render(
      <>
        <LoadingIsland label="一号" motion="reduced" />
        <LoadingIsland label="二号" motion="reduced" />
      </>,
    );

    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (element) => element.id,
    );
    expect(ids.length).toBeGreaterThan(20);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
