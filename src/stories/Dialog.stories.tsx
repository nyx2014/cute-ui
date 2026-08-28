import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    heading: "钓到黑鲈鱼啦",
    children: <p>有几厘米？几厘米啊？</p>,
    "aria-label": "钓鱼结果",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "每个实例拥有独立 clipPath ID；可选 modal 模式提供打开时聚焦、Escape 关闭和关闭按钮。",
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="story-panel">
      <Dialog {...args} />
    </div>
  ),
};

function InteractiveDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="story-panel">
      <Button size="compact" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Dialog
        heading="岛民提示"
        aria-label="岛民提示"
        open={open}
        modal
        showCloseButton
        onDismiss={() => setOpen(false)}
      >
        <p>按 Escape 或关闭按钮返回。</p>
      </Dialog>
    </div>
  );
}

export const KeyboardDismiss: Story = {
  render: () => <InteractiveDialogDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "打开对话框" }));
    const dialog = canvas.getByRole("dialog", { name: "岛民提示" });
    await expect(dialog).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await expect(dialog).not.toBeInTheDocument();
  },
};

export const NarrowContainer: Story = {
  args: {
    size: "large",
  },
  render: (args) => (
    <div className="story-panel" style={{ width: "280px", padding: "8px" }}>
      <Dialog {...args} />
    </div>
  ),
};
