import { useRef, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ClientPortalProps {
  children: ReactNode;
  elementId: string;
}

const ClientPortal = ({ children, elementId }: ClientPortalProps) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById(elementId);
    setMounted(true);
  }, [elementId]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};

export default ClientPortal;
