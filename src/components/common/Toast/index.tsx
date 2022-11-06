import { ReactNode } from 'react';
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
}

const ToastContainer = new Toast();

export default ToastContainer;
export const toast = ToastContainer;
