import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../src/types/theme';

const EmotionThemeProvider = (storyFn) => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;

export default EmotionThemeProvider;
