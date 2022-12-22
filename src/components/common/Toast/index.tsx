import { ReactNode } from 'react';
import { buttonSizes, buttonStyle } from '~/components/base/Button/types';
import { Nullable } from '~/types/utilityType';
import ClientPortal from '../ClientPortal';
import ToastManager, { TCreateToast } from './ToastManager';

class Toast {
  private static PORTAL_ID = 'toast-portal';
  private static LIMIT = 1;
  private createToast: Nullable<TCreateToast> = null;

  render() {
    return (
      <ClientPortal elementId={Toast.PORTAL_ID}>
        <ToastManager
          bind={(createToast: TCreateToast) => {
            this.createToast = createToast;
          }}
          limit={Toast.LIMIT}
        />
      </ClientPortal>
    );
  }

  showMessage(message: string, keepAlive?: boolean, duration?: number) {
    this.createToast && this.createToast({ message, keepAlive, duration });
  }

  showChildren(children: ReactNode, keepAlive?: boolean, duration?: number) {
    this.createToast && this.createToast({ children, keepAlive, duration });
  }

  showMessageWithLink(
    content: {
      message: string;
      link: {
        message: string;
        href: string;
        variant?: keyof typeof buttonStyle;
        size?: keyof typeof buttonSizes;
      };
    },
    keepAlive = true,
    duration?: number,
  ) {
    this.createToast &&
      this.createToast({
        message: content.message,
        link: content.link,
        keepAlive,
        duration,
      });
  }
}

const ToastContainer = new Toast();

export default ToastContainer;
export const toast = ToastContainer;
