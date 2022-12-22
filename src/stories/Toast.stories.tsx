import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toast, { toast } from '~/components/common/Toast';
import ToastItem from '../components/common/Toast/ToastItem';
import Button from '~/components/base/Button';

export default {
  title: 'Components/Toast',
  component: ToastItem,
  argTypes: {
    message: {
      control: 'text',
      defaultValue: 'toast',
    },
    link: {
      control: 'object',
      defaultValue: {
        message: 'toast link',
        href: '',
        variant: 'borderGray',
        size: 'sm',
      },
    },
    children: {
      control: 'text',
    },
    duration: {
      control: 'number',
      defaultValue: 3000,
    },
    keepAlive: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof ToastItem>;

export const Template: ComponentStory<typeof ToastItem> = ({
  message = 'toast',
  link = {
    message: 'toast link',
    href: '',
    variant: 'borderGray',
    size: 'sm',
  },
  duration,
  keepAlive,
}) => {
  const handleClickMessage = () => {
    toast.showMessage(message, keepAlive, duration);
  };
  const handleClickLink = () => {
    toast.showMessageWithLink({ message, link: { ...link } }, keepAlive, duration);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button onClick={handleClickMessage}>ToastMessage</Button>
      <Button onClick={handleClickLink}>ToastLink</Button>
      <div id="toast-portal" />
      {Toast.render()}
    </div>
  );
};
Template.parameters = { controls: { exclude: ['isRemoved', 'onTimeout'] } };
