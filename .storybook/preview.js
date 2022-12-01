import { addDecorator } from '@storybook/react';
import EmotionThemeProvider from './decorators/EmotionThemeProvider';
import '../src/assets/fonts/font.css';
import '../src/styles/globals.css';
import '../src/styles/reset.css';
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized loader={({ src }) => src} />,
});
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
