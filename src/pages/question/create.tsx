import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '~/components/base/Button';
import PageTitle from '~/components/base/PageTitle';
import Article from '~/components/common/Article';
import SubCategoryField from '~/components/common/InputField/SubCategoryField';
import TailQuestionField from '~/components/common/InputField/TailQuestionField';
import TitleField from '~/components/common/InputField/TitleField';
import PageContainer from '~/components/common/PageContainer';
import MainCategoryField from '~/components/domain/random/MainCategoryField';
import useForm from '~/hooks/useForm';
import questionApi from '~/service/question';
import { IQuestion } from '~/types/question';
import { MainType, SubType } from '~/utils/constant/category';
import { SUBMIT_CHECK } from '~/utils/helper/validation';

const initialValues: initialValuesType = {
  title: '',
  mainCategory: 'none',
  subCategory: 'none',
};

type initialValuesType = {
  title: string;
  mainCategory: MainType | 'none';
  subCategory: SubType | 'none';
};

type ErrorType = {
  [key in keyof typeof initialValues]: string;
};

const validate = (values: initialValuesType) => {
  const errors = {} as ErrorType;

  if (SUBMIT_CHECK.title.isValid(values.title)) {
    errors.title = SUBMIT_CHECK.title.message;
  }

  if (values.mainCategory === 'none') {
    errors.mainCategory = '직무를 선택해 주세요.';
  }

  if (values.subCategory === 'none') {
    errors.subCategory = '분류를 선택해 주세요.';
  }

  return errors;
};

const CreateQuestion = () => {
  const [tailQuestions, setTailQuestions] = useState<string[]>([]);
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate,
  });
  const router = useRouter();

  async function onSubmit() {
    const newQuestion: IQuestion = { ...values, tailQuestions };
    try {
      await questionApi.create(newQuestion);
      alert('질문이 접수되었습니다. 질문은 관리자 확인 후 등록됩니다.');
      router.push('/');
    } catch {
      alert('질문 등록에 실패했습니다.');
    }
  }

  const onAddQuestion = (value: string) => {
    if (SUBMIT_CHECK.tailQuestion.isValid(value)) {
      alert(SUBMIT_CHECK.tailQuestion.message);
      return;
    }

    if (tailQuestions.length >= 5) {
      alert('꼬리 질문은 5개까지 등록 가능합니다.');
      return;
    }

    setTailQuestions([...tailQuestions, value]);
  };

  const onRemoveQuestion = (index: number) => {
    const updateList = tailQuestions.filter((_, idx) => idx !== index);
    setTailQuestions(updateList);
  };

  return (
    <PageContainer>
      <Article>
        <PageTitle>질문 등록하기</PageTitle>
        <FormContainer>
          <TitleField handleChange={handleChange} message={errors.title} />
          <MainCategoryField
            handleChange={handleChange}
            selected={values.mainCategory}
            message={errors.mainCategory}
          />
          {values.mainCategory && values.mainCategory !== 'none' && (
            <SubCategoryField
              mainCategory={values.mainCategory}
              handleChange={handleChange}
              selected={values.subCategory}
              message={errors.subCategory}
            />
          )}
          <TailQuestionField
            handleSubmit={onAddQuestion}
            list={tailQuestions}
            onRemove={onRemoveQuestion}
          />
          <SubmitButton onClick={handleSubmit} loading={isLoading}>
            등록
          </SubmitButton>
        </FormContainer>
      </Article>
    </PageContainer>
  );
};

export default CreateQuestion;

const FormContainer = styled.div`
  margin-top: 54px;
`;

const SubmitButton = styled(Button)`
  display: block;
  width: fit-content;
  margin: 0 auto;
`;
