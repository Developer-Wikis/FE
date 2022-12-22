import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Label from '~/components/base/Label';

export default {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'LABEL',
      description: 'Label의 내용이 들어갑니다.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
} as ComponentMeta<typeof Label>;

export const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;
Template.parameters = { controls: { include: 'children' } };
