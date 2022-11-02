import styled from '@emotion/styled';
import { MouseEvent, useEffect } from 'react';
import BackgroundDim from '~/components/base/BackgroundDim';
import Link from '~/components/base/Link';
import { ThemeColors } from '~/types/theme';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import CloseButton from '../CloseButton';

interface SlideProps {
  isOpen: boolean;
  onClose: () => void;
}

const Slide = ({ isOpen, onClose }: SlideProps) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('modal-open');
    } else {
      document.querySelector('body')?.classList.remove('modal-open');
    }
  }, [isOpen]);

  return (
    <StyledBackgroundDim isOpen={isOpen} onClick={handleClose}>
      <SlideContent isOpen={isOpen}>
        <StyledCloseButton onClick={onClose} />

        <nav>
          <StyledUl>
            <li>
              <StyledLink
                href="/random/create?step=0"
                as="/random/create"
                onClick={onClose}
                color="red"
              >
                랜덤질문
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/question/create" onClick={onClose} color="gray800">
                질문등록
              </StyledLink>
            </li>
          </StyledUl>
        </nav>

        <StyledLink href="/suggestion" onClick={onClose} color="gray800">
          건의하기
        </StyledLink>
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
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 60px 21px 42px;
  background-color: ${({ theme }) => theme.colors.white};
  transform: ${({ isOpen }) => (isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-70%, 0, 0)')};
  transition: all 0.3s ease-in-out;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 25px;
  right: 21px;
`;

const StyledUl = styled.ul`
  li ~ li {
    margin-top: 14px;
  }
`;

const StyledLink = styled(Link)<{ color: ThemeColors }>`
  ${({ theme }) => theme.fontStyle.subtitle1}
  color: ${({ color, theme }) => theme.colors[color]};
  user-select: none;
`;
