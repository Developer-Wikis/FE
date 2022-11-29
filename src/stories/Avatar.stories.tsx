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
      description: '이미지의 url을 설정합니다.',
    },
    size: {
      control: 'radio',
      options: Object.keys(AvatarSize),
      defaultValue: 'sm',
      description: 'Avatar의 사이즈를 설정합니다.',
    },
  },
} as ComponentMeta<typeof Avatar>;

export const Template: ComponentStory<typeof Avatar> = (args) => {
  return <Avatar {...args} />;
};

Template.parameters = { controls: { include: ['src', 'size'] } };
