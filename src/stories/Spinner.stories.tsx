import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spinner from '~/components/common/Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    color: {
      control: 'radio',
      defaultValue: 'white',
    },
    size: {
      control: 'radio',
      defaultValue: 'sm',
    },
  },
} as ComponentMeta<typeof Spinner>;

export const Template: ComponentStory<typeof Spinner> = (args) => {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        position: 'relative',
        backgroundColor: args.color === 'white' ? 'gray' : 'white',
      }}
    >
      <Spinner {...args} />
    </div>
  );
};
