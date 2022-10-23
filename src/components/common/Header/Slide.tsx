import styled from '@emotion/styled';
import { useEffect } from 'react';
import BackgroundDim from '~/components/base/BackgroundDim';
import Link from '~/components/base/Link';
import useClickAway from '~/hooks/useClickAway';
import CloseButton from '../CloseButton';

interface SlideProps {
  isOpen: boolean;
  onClose: () => void;
}

const Slide = ({ isOpen, onClose }: SlideProps) => {
  const contentRef = useClickAway<HTMLDivElement>(onClose);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('modal-open');
    } else {
      document.querySelector('body')?.classList.remove('modal-open');
    }
  }, [isOpen]);

  return (
    <StyledBackgroundDim isOpen={isOpen}>
      <SlideContent isOpen={isOpen} ref={contentRef}>
        <Link
          size="sm"
          linkType="red"
          href="/random/create?step=0"
          as="/random/create"
          onClick={onClose}
        >
          랜덤 질문
        </Link>
        <Link size="sm" linkType="black" href="/question/create" onClick={onClose}>
          질문 등록
        </Link>

        <CloseButton onClick={onClose} />
      </SlideContent>
    </StyledBackgroundDim>
  );
};

export default Slide;

const StyledBackgroundDim = styled(BackgroundDim)<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
`;

const SlideContent = styled.div<{ isOpen: boolean }>`
  width: 300px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  transform: ${({ isOpen }) => (isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-70%, 0, 0)')};
  transition: all 0.3s ease-in-out;
`;
