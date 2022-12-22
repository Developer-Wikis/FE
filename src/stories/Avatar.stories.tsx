import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Avatar from '~/components/common/Avatar';
import { AvatarSize } from '~/components/common/Avatar/types';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: 'text',
      defaultValue: '/assets/profile-default.jpeg',
    },
    size: {
      control: 'radio',
      options: Object.keys(AvatarSize),
      defaultValue: 'sm',
    },
  },
} as ComponentMeta<typeof Avatar>;

export const Template: ComponentStory<typeof Avatar> = (args) => {
  return <Avatar {...args} />;
};

Template.parameters = { controls: { include: ['src', 'size'] } };
