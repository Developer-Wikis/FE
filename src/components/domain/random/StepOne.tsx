import styled from '@emotion/styled';
import { FormEvent, MutableRefObject, useEffect } from 'react';
import Button from '~/components/base/Button';
import PageTitle from '~/components/base/PageTitle';
import { InputValues, Step } from '~/pages/random/create';
import { SubWithAllType } from '~/utils/constant/category';
import MainCategoryField from './MainCategoryField';
import SubCategoryField from './SubCategoryField';
import TypeField from './TypeField';

interface StepOneProps {
  step: Step;
  inputValues: InputValues;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (type: string, value: string | SubWithAllType[]) => void;
  mounted: MutableRefObject<boolean>;
}

const StepOne = ({ inputValues, handleChange, handleSubmit, mounted }: StepOneProps) => {
  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <>
      <StyledPageTitle>랜덤 질문</StyledPageTitle>

      <form action="submit" onSubmit={handleSubmit}>
        <TypeField
          type={inputValues.type}
          handleChange={({ target }) => handleChange(target.name, target.id)}
        />

        <MainCategoryField
          handleChange={({ target }) => handleChange(target.name, target.value)}
          selected={inputValues.mainCategory}
        />

        <SubCategoryField
          mainCategory={inputValues.mainCategory}
          subCategories={inputValues.subCategories}
          handleChange={handleChange}
        />

        <StyledButton
          type="submit"
          variant="red"
          size="lg"
          disabled={inputValues.subCategories.length === 0}
        >
          면접 연습 시작
        </StyledButton>
      </form>
    </>
  );
};

export default StepOne;

const StyledPageTitle = styled(PageTitle)`
  margin-bottom: 38px;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
  width: fit-content;
`;
