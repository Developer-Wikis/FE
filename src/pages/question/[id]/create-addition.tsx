import styled from '@emotion/styled';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import Title from '~/components/base/PageTitle';
import Article from '~/components/common/Article';
import PageContainer from '~/components/common/PageContainer';
import { createAddition, getQuestionDetail } from '~/service/question';
import { isString } from '~/utils/helper/checkType';
import { SUBMIT_CHECK } from '~/utils/helper/validation';

export const getServerSideProps = async (context: NextPageContext) => {
  const { id, title } = context.query;
  if (!isString(id) && !isString(title) && isNaN(Number(id))) {
    return {
      notFound: true,
    };
  }

  if (!title) {
    // API로 title 확인 필요
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        title,
        id: Number(id),
      },
    };
  }
};

interface CreateAdditionProps {
  title: string;
  id: number;
}

const CreateAddition = ({ title, id }: CreateAdditionProps) => {
  const [text, setText] = useState('');
  const router = useRouter();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validText = text.trim();
    setText(validText);

    if (SUBMIT_CHECK.additionalQuestion.isValid(validText)) {
      alert(SUBMIT_CHECK.additionalQuestion.message);
      return;
    }

    try {
      // await createAddition(Number(id), text);
      alert('질문이 접수되었습니다. 질문은 관리자 확인 후 등록됩니다.');
      setText('');
      router.push('/');
    } catch {
      alert('질문 등록에 실패했습니다.');
      return;
    }
  };

  return (
    <PageContainer>
      <Article>
        <Title>꼬리 질문 등록</Title>
        <Form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="title">제목</Label>
            <Input name="title" defaultValue={title} disabled />
          </div>
          <div>
            <Label htmlFor="additional">꼬리 질문</Label>
            <Input
              name="additional"
              placeholder="예상되는 꼬리질문을 작성해 주세요."
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
          </div>
          <SubmitButton>등록</SubmitButton>
        </Form>
      </Article>
    </PageContainer>
  );
};

export default CreateAddition;

const Form = styled.form`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const SubmitButton = styled(Button)`
  width: fit-content;
  margin: 0 auto;
`;
