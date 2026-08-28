import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { LoadingIsland } from "../components/LoadingIsland";

const meta = {
  title: "Components/LoadingIsland",
  component: LoadingIsland,
  tags: ["autodocs"],
  args: {
    label: "海岛正在加载",
    motion: "auto",
    size: "medium",
  },
  argTypes: {
    motion: {
      control: "inline-radio",
      options: ["auto", "full", "reduced"],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "原始海岛 SVG 与 GSAP 轨迹被保留，但所有 SVG ID 和动画查询都被限制到当前实例，并在卸载时清理。",
      },
    },
  },
} satisfies Meta<typeof LoadingIsland>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="story-island-stage">
      <LoadingIsland {...args} size="large" />
    </div>
  ),
};

export const MultipleInstances: Story = {
  render: (args) => (
    <div className="story-island-stage" style={{ gridAutoFlow: "column" }}>
      <LoadingIsland {...args} size="small" label="一号海岛正在加载" />
      <LoadingIsland {...args} size="medium" label="二号海岛正在加载" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("status")).toHaveLength(2);
    const ids = Array.from(canvasElement.querySelectorAll("[id]")).map(
      (element) => element.id,
    );
    await expect(new Set(ids).size).toBe(ids.length);
  },
};

export const ReducedMotion: Story = {
  args: {
    motion: "reduced",
  },
  render: (args) => (
    <div className="story-island-stage">
      <LoadingIsland {...args} size="large" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveAttribute(
      "data-motion",
      "reduced",
    );
  },
};
