import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cursor, GlobalCursor } from "../components/Cursor";

const meta = {
  title: "Components/Cursor",
  component: Cursor,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Cursor 是局部容器；GlobalCursor 是显式、可清理、引用计数安全的全局能力。Story 不再是空白页。",
      },
    },
  },
} satisfies Meta<typeof Cursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScopedArea: Story = {
  render: () => (
    <Cursor className="story-cursor-demo" tabIndex={0}>
      <strong>把鼠标移入虚线区域</strong>
      <a href="#cursor-story-target">链接也继承手形光标</a>
      <span id="cursor-story-target">键盘焦点仍然可见</span>
    </Cursor>
  ),
};

function GlobalCursorDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="story-cursor-demo">
      <GlobalCursor enabled={enabled} />
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.currentTarget.checked)}
        />{" "}
        启用当前 Story 文档的全局手形光标
      </label>
      <p>卸载 Story 后，添加到 documentElement 的类会自动清理。</p>
    </div>
  );
}

export const ExplicitGlobalOptIn: Story = {
  render: () => <GlobalCursorDemo />,
};
