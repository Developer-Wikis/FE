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
    },
    avatarSize: {
      control: 'radio',
      options: AvatarSize,
      defaultValue: 'sm',
    },
    fontSize: {
      control: 'radio',
      options: AvatarFontSize,
      defaultValue: 'sm',
    },
    text: {
      control: 'text',
      defaultValue: 'Username',
    },
  },
} as ComponentMeta<typeof UserProfile>;

export const Template: ComponentStory<typeof UserProfile> = (args) => {
  return <UserProfile {...args} />;
};

Template.parameters = { controls: { include: ['profileUrl', 'avatarSize', 'fontSize', 'text'] } };
