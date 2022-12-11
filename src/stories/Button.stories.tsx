import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '~/components/base/Button';
import { buttonSizes, buttonStyle } from '~/components/base/Button/types';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: { control: 'text', defaultValue: 'BUTTON' },
    variant: {
      control: 'radio',
      options: Object.keys(buttonStyle),
      defaultValue: 'black',
    },
    size: { control: 'radio', options: Object.keys(buttonSizes), defaultValue: 'md' },
    fullWidth: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    loading: { control: 'boolean', defaultValue: false },
    startIcon: { control: 'text' },
    endIcon: { control: 'text' },
  },
} as ComponentMeta<typeof Button>;

export const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />;
};
