/** @type { import('@storybook/react').Preview } */

import '../src/index.scss'
import {Provider} from "react-redux";
import store from "../src/redux/store";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
        <Provider store={store}>
          <Story/>
        </Provider>
    )
  ]
};

export default preview;
