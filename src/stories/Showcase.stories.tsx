import type { Meta, StoryObj } from "@storybook/react-vite";
import { Showcase } from "../../demo/Showcase";
import "../../demo/showcase.css";

const meta = {
  title: "Overview/Showcase",
  component: Showcase,
  parameters: {
    layout: "fullscreen",
    a11y: {
      test: "error",
    },
  },
} satisfies Meta<typeof Showcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {};
