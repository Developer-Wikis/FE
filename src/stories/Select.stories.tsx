import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from '~/components/base/Select';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    withoutDefault: { defaultValue: false },
    defaultText: { defaultValue: undefined },
  },
} as ComponentMeta<typeof Select>;

export const Template: ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    name="select"
    list={[
      {
        text: '옵션 1',
        value: 'option1',
      },
      {
        text: '옵션 2',
        value: 'option2',
      },
    ]}
  />
);
Template.parameters = { controls: { include: ['withoutDefault', 'defaultText'] } };
