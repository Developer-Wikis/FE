import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox from '~/components/base/Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'CHECKBOX',
    },
  },
} as ComponentMeta<typeof Checkbox>;

export const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} id="checkbox" />
);
Template.parameters = { controls: { include: 'children' } };
