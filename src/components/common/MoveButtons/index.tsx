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
      <Button
        variant="borderGray"
        onClick={onPrev}
        disabled={disabledPrev}
        startIcon={<Icon name="ArrowLeft" size="16" color="gray600" />}
      >
        이전 질문
      </Button>
      <Button
        variant="borderGray"
        onClick={onNext}
        disabled={disabledNext}
        endIcon={<Icon name="ArrowRight" size="16" color="gray600" />}
      >
        다음 질문
      </Button>
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
