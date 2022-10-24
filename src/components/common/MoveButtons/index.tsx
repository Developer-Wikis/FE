import styled from '@emotion/styled';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';

interface MoveButtonProps {
  disabledPrev?: boolean;
  disabledNext?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const MoveButtons = ({
  disabledPrev = false,
  disabledNext = false,
  onPrev,
  onNext,
}: MoveButtonProps) => {
  return (
    <Buttons>
      <PrevButton buttonType="borderGray" onClick={onPrev} disabled={disabledPrev}>
        <Icon name="ArrowLeft" size="20" color="gray600" />
        <span>이전 질문</span>
      </PrevButton>
      <NextButton buttonType="borderGray" onClick={onNext} disabled={disabledNext}>
        <span> 다음 질문</span>
        <Icon name="ArrowRight" size="20" color="gray600" />
      </NextButton>
    </Buttons>
  );
};

export default MoveButtons;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 56px;
`;

const PrevButton = styled(Button)`
  padding-left: 16px;
  span {
    display: flex;
  }
`;

const NextButton = styled(Button)`
  padding-right: 16px;
  span {
    display: flex;
  }
`;
