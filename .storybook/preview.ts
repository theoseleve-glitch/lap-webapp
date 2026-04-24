import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "asphalt",
      values: [
        { name: "asphalt", value: "#000000" },
        { name: "concrete", value: "#141414" },
        { name: "chalk", value: "#f0ede5" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
