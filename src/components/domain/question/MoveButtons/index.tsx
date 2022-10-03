import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';

interface MoveButtonProps {
  prevId: number;
  nextId: number;
}

const MoveButtons = ({ nextId, prevId }: MoveButtonProps) => {
  const router = useRouter();

  const onMovePrev = () => {
    if (prevId) {
      router.push(`/question/${prevId}`);
    } else {
      alert('첫 번째 페이지 입니다.');
    }
  };

  const onMoveNext = () => {
    if (nextId) {
      router.push(`/question/${nextId}`);
    } else {
      alert('마지막 페이지 입니다.');
    }
  };

  return (
    <Buttons>
      <PrevButton buttonType="borderGray" onClick={onMovePrev}>
        <Icon name="ArrowLeft" size="24" stroke="darkGray" />
        <span>이전 질문</span>
      </PrevButton>
      <NextButton buttonType="borderGray" onClick={onMoveNext}>
        <span> 다음 질문</span>
        <Icon name="ArrowRight" size="24" stroke="darkGray" />
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
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

const NextButton = styled(Button)`
  display: flex;
  align-items: center;
  padding-right: 16px;
`;
