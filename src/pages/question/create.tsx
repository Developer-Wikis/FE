import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import Select from '~/components/base/select';
import Title from '~/components/base/Title';
import AddForm from '~/components/common/AddForm';
import ErrorMessage from '~/components/common/ErrorMessage';
import MainContainer from '~/components/common/MainContainer';
import PageContainer from '~/components/common/PageContainer';
import AdditionalList from '~/components/domain/question/AdditionalList';
import useForm from '~/hooks/useForm';
import { createQuestion } from '~/service/question';
import { IQuestion } from '~/types/question';
import { middleCategories } from '~/utils/constant/category';
import { checkLength, checkSpace, checkSpecial } from '~/utils/helper/validation';

const initialValues = {
  nickname: '',
  password: '',
  title: '',
  category: 'none',
};

type valuesType = {
  [key in keyof typeof initialValues]: string;
};

const validate = (values: valuesType) => {
  const errors = {} as valuesType;

  if (checkLength(values.nickname, 2, 10) || checkSpecial(values.nickname)) {
    errors.nickname = '닉네임은 특수문자 제외, 2~10자로 입력해 주세요.';
  }
  if (checkLength(values.password, 4, 10) || checkSpace(values.password)) {
    errors.password = '비밀번호는 공백 제외, 4~10자 이상 입력해 주세요.';
  }

  if (checkLength(values.title, 2, 30)) {
    errors.title = '질문 제목은 2~30자로 입력해 주세요.';
  }

  if (values.category === 'none') {
    errors.category = '분류를 선택해 주세요.';
  }

  return errors;
};

const CreateQuestion = () => {
  const [additionQuestions, setAdditionQuestions] = useState<string[]>([]);
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate,
  });
  const router = useRouter();

  async function onSubmit() {
    const newQuestion: IQuestion = { ...values, additionQuestions };
    console.log(newQuestion);
    try {
      await createQuestion(newQuestion);
      alert('질문이 접수되었습니다. 질문은 관리자 확인 후 등록됩니다.');
      router.push('/');
    } catch {
      alert('질문 등록에 실패했습니다.');
    }
  }

  const onAddQuestion = (value: string) => {
    if (additionQuestions.length >= 5) {
      alert('꼬리 질문은 5개까지 등록 가능합니다.');
      return;
    }

    setAdditionQuestions([...additionQuestions, value]);
  };

  const onRemoveQuestion = (index: number) => {
    const updateList = additionQuestions.filter((_, idx) => idx !== index);
    setAdditionQuestions(updateList);
  };

  return (
    <MainContainer>
      <Container>
        <Title>질문 등록하기</Title>
        <FormContainer>
          <UserInfo>
            <InputField>
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                type="text"
                name="nickname"
                id="nickname"
                placeholder="닉네임"
                value={values.nickname}
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호"
                value={values.password}
                onChange={handleChange}
              />
            </InputField>
          </UserInfo>
          <ErrorMessage message={errors.nickname} />
          <ErrorMessage message={errors.password} />

          <InputField>
            <Label htmlFor="title">제목</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="질문 제목을 입력해 주세요."
              value={values.title}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.title} />
          </InputField>
          <InputField>
            <Label htmlFor="category">분류</Label>
            <Select list={middleCategories} name="category" onChange={handleChange} />
            <ErrorMessage message={errors.category} />
          </InputField>
          <InputField>
            <Label htmlFor="additional">꼬리질문</Label>
            <AddForm
              type="text"
              buttonText="추가"
              name="additional"
              id="additional"
              onSubmit={onAddQuestion}
            />
          </InputField>
          <AdditionalList list={additionQuestions} onRemove={onRemoveQuestion} />
          <ButtonArea>
            <Button onClick={handleSubmit} disabled={isLoading}>
              등록
            </Button>
          </ButtonArea>
        </FormContainer>
      </Container>
    </MainContainer>
  );
};

export default CreateQuestion;

const Container = styled(PageContainer)`
  width: 383px;
  margin-top: 32px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 12px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;

  select {
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    font-size: 14px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  & > div {
    width: 50%;
  }
`;

const FormContainer = styled.div`
  margin-top: 54px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
