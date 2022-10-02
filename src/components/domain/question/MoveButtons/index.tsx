import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Button from '~/components/base/Button';

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
      <Button buttonType="borderGray" onClick={onMovePrev}>
        이전 질문
      </Button>
      <Button buttonType="borderGray" onClick={onMoveNext}>
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
