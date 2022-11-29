import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserProfile, { AvatarSize, AvatarFontSize } from '~/components/common/UserProfile';

export default {
  title: 'Components/UserProfile',
  component: UserProfile,
  argTypes: {
    profileUrl: {
      control: 'text',
      defaultValue: '/assets/profile-default.jpeg',
      description: '프로필 이미지의 경로를 설정합니다.',
    },
    avatarSize: {
      control: 'radio',
      options: AvatarSize,
      defaultValue: 'sm',
      description: '이미지 사이즈를 설정합니다.',
    },
    fontSize: {
      control: 'radio',
      options: AvatarFontSize,
      defaultValue: 'sm',
      description: '폰트 사이즈를 설정합니다.',
    },
    text: {
      control: 'text',
      defaultValue: 'Username',
      description: '프로필에 작성할 텍스트를 설정합니다',
    },
  },
} as ComponentMeta<typeof UserProfile>;

export const Template: ComponentStory<typeof UserProfile> = (args) => {
  return <UserProfile {...args} />;
};

Template.parameters = { controls: { include: ['profileUrl', 'avatarSize', 'fontSize', 'text'] } };
