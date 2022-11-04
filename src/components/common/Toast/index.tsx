import { ReactNode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { isBrowser } from '~/utils/helper/checkType';
import { Nullable } from '~/utils/helper/utilityType';
import ToastManager, { TCreateToast } from './ToastManager';

class Toast {
  private static LIMIT = 1;
  private portal: Nullable<HTMLElement> = null;
  private createToast: Nullable<TCreateToast> = null;

  constructor() {
    if (!isBrowser()) return;

    const PORTAL_ID = 'toast-portal';
    const portalElement = document.getElementById(PORTAL_ID);

    if (portalElement) {
      this.portal = portalElement;
    } else {
      this.portal = document.createElement('div');
      document.body.appendChild(this.portal);
    }

    const root = ReactDOMClient.createRoot(this.portal);
    root.render(
      <ToastManager
        bind={(createToast: TCreateToast) => {
          this.createToast = createToast;
        }}
        limit={Toast.LIMIT}
      />,
    );
  }

  showMessage(message: string, keepAlive?: boolean, duration?: number) {
    this.createToast && this.createToast({ message, keepAlive, duration });
  }

  showChildren(children: ReactNode, keepAlive?: boolean, duration?: number) {
    this.createToast && this.createToast({ children, keepAlive, duration });
  }
}

export default new Toast();
