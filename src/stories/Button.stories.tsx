import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Animal",
    onClick: fn(),
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["compact", "default", "wide"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "保留旧版绿色条纹 hover 与按压反馈，改为原生 button 属性透传、响应式宽度和清晰的 focus-visible。",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Animal" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="story-stack">
      <Button {...args} size="compact">
        Compact
      </Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="wide">
        Wide
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "背包已满",
    disabled: true,
  },
};

export const ResponsiveContainer: Story = {
  render: (args) => (
    <div style={{ width: "min(100%, 280px)" }}>
      <Button {...args} fullWidth>
        窄容器中的按钮
      </Button>
    </div>
  ),
};
