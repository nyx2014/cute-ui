import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";
import "../src/styles/legacy-font.css";
import "./preview.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="cute-story-root cute-ui-theme cute-ui-legacy-font">
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    options: {
      storySort: {
        order: ["Overview", "Components"],
      },
    },
  },
};

export default preview;
