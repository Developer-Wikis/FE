import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import PageTitle from '~/components/base/PageTitle';
import Article from '~/components/common/Article';
import CloseButton from '~/components/common/CloseButton';
import InputField from '~/components/common/InputField';
import questionApi from '~/service/question';
import { SUBMIT_CHECK } from '~/utils/helper/validation';

interface TailQuestionModalProps {
  title: string;
  id: number;
  onClose: () => void;
  isOpenModal: boolean;
}

const TailQuestionModal = ({ title, id, onClose, isOpenModal }: TailQuestionModalProps) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validText = text.trim();
    setText(validText);

    if (SUBMIT_CHECK.tailQuestion.isValid(validText)) {
      alert(SUBMIT_CHECK.tailQuestion.message);
      return;
    }

    try {
      setIsLoading(true);
      await questionApi.createTail(Number(id), text);
      alert('질문이 접수되었습니다. 질문은 관리자 확인 후 등록됩니다.');
      onClose();
    } catch {
      alert('질문 등록에 실패했습니다.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpenModal) {
      setText('');
    }
  }, [isOpenModal]);

  return (
    <StyledArticle>
      <ModalHeader>
        <PageTitle align="left">꼬리 질문 등록</PageTitle>
        <StyledCloseButton onClick={onClose} />
      </ModalHeader>

      <Form onSubmit={onSubmit}>
        <InputField>
          <Label htmlFor="title">제목</Label>
          <Input name="title" defaultValue={title} disabled />
        </InputField>
        <InputField>
          <Label htmlFor="tailQuestion">꼬리 질문</Label>
          <Input
            name="tailQuestion"
            placeholder="예상되는 꼬리 질문을 작성해 주세요."
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
        </InputField>

        <SubmitButton loading={isLoading}>등록</SubmitButton>
      </Form>
    </StyledArticle>
  );
};

export default TailQuestionModal;

const StyledArticle = styled(Article)`
  margin-top: 0;
`;

const Form = styled.form`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
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
