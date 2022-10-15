import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import PageContainer from '~/components/common/PageContainer';
import MainCategoryField from '~/components/domain/random/MainCategoryField';
import SubCategoryField from '~/components/domain/random/SubCategoryField';
import TypeField from '~/components/domain/random/TypeField';
import { MainType, SubWithAllType } from '~/utils/constant/category';

interface InputValues {
  type: 'voice' | 'text';
  mainCategory: MainType | 'none';
  subCategories: SubWithAllType[];
}

const CreateRandom = () => {
  const [step, setStep] = useState(1);
  const [inputValues, setInputValues] = useState<InputValues>({
    type: 'voice',
    mainCategory: 'none',
    subCategories: [],
  });

  const handleChange = (name: string, value: string | SubWithAllType[]) => {
    if (name === 'mainCategory') {
      setInputValues({ ...inputValues, [name]: value as MainType | 'none', subCategories: [] });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(
      `질문 유형: ${inputValues.type}\n직무 선택: ${
        inputValues.mainCategory
      }\n분류 선택: ${inputValues.subCategories.join(', ')}`,
    );

    if (inputValues.type === 'voice') {
      // setStep(2);
    }
  };

  return (
    <MainContent>
      <Article>
        <Title>{step === 1 ? '랜덤 질문' : '안내 사항'}</Title>

        {step === 1 && (
          <Form action="submit" onSubmit={handleSubmit}>
            <TypeField
              type={inputValues.type}
              handleChange={({ target }) => handleChange(target.name, target.id)}
            />
            <MainCategoryField
              handleChange={({ target }) => handleChange(target.name, target.value)}
            />
            <SubCategoryField
              mainCategory={inputValues.mainCategory}
              subCategories={inputValues.subCategories}
              handleChange={handleChange}
            />

            <StyledButton
              type="submit"
              buttonType="red"
              size="lg"
              disabled={inputValues.subCategories.length === 0}
            >
              면접 연습 시작
            </StyledButton>
          </Form>
        )}

        {step === 2 && <div>🚧</div>}
      </Article>
    </MainContent>
  );
};

export default CreateRandom;

const MainContent = styled(PageContainer)`
  margin-top: 50px;
`;

const Article = styled.article`
  width: 440px;
  margin: 0 auto;
  padding: 42px 28px 45px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 34px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const StyledButton = styled(Button)`
  margin: calc(64px - 42px) auto 0;
  width: fit-content;
`;
