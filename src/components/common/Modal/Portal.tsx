import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!document.querySelector('#portal')) {
      throw new Error('portal is not defined');
    }

    setPortalElement(() => document.querySelector('#portal'));

    return () => {
      setPortalElement(null);
    };
  }, []);

  return portalElement ? ReactDOM.createPortal(children, portalElement) : null;
};

export default Portal;
