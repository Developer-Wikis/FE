import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import PageTitle from '~/components/base/PageTitle';
import Article from '~/components/common/Article';
import CloseButton from '~/components/common/CloseButton';
import { createTailQuestion } from '~/service/question';
import { SUBMIT_CHECK } from '~/utils/helper/validation';

interface TailQuestionModalProps {
  title: string;
  id: number;
  onClose: () => void;
}

const TailQuestionModal = ({ title, id, onClose }: TailQuestionModalProps) => {
  const [text, setText] = useState('');
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validText = text.trim();
    setText(validText);

    if (SUBMIT_CHECK.tailQuestion.isValid(validText)) {
      alert(SUBMIT_CHECK.tailQuestion.message);
      return;
    }

    try {
      await createTailQuestion(Number(id), text);
      alert('질문이 접수되었습니다. 질문은 관리자 확인 후 등록됩니다.');
      setText('');
      onClose();
    } catch {
      alert('질문 등록에 실패했습니다.');
      return;
    }
  };

  return (
    <Container>
      <ModalHeader>
        <PageTitle align="left">꼬리 질문 등록</PageTitle>
        <StyledCloseButton onClick={onClose} />
      </ModalHeader>

      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="title">제목</Label>
          <Input name="title" defaultValue={title} disabled />
        </div>
        <div>
          <Label htmlFor="tailQuestion">꼬리 질문</Label>
          <Input
            name="tailQuestion"
            placeholder="예상되는 꼬리 질문을 작성해 주세요."
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
        </div>

        <SubmitButton>등록</SubmitButton>
      </Form>
    </Container>
  );
};

export default TailQuestionModal;

const Container = styled(Article)`
  margin-top: 0;
`;

const Form = styled.form`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SubmitButton = styled(Button)`
  width: fit-content;
  margin: 0 auto;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 6px;
  right: 0;
`;

const ModalHeader = styled.div`
  position: relative;
`;
