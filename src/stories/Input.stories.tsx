import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input, { inputSize } from '~/components/base/Input';
import styled from '@emotion/styled';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'radio',
      options: Object.keys(inputSize),
      defaultValue: 'md',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Placeholder',
      description: 'input의 placeholder를 설정합니다.',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'true일 경우 input이 disabled 됩니다.',
    },
  },
} as ComponentMeta<typeof Input>;

export const Template: ComponentStory<typeof Input> = (args) => {
  return (
    <Container>
      <Input {...args} />
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
`;
