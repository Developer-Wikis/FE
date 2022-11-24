import { addDecorator } from '@storybook/react';
import EmotionThemeProvider from './decorators/EmotionThemeProvider';
import '../src/assets/fonts/font.css';
import '../src/styles/globals.css';
import '../src/styles/reset.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
];

addDecorator(EmotionThemeProvider);
