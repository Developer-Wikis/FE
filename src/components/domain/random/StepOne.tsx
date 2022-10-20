import styled from '@emotion/styled';
import { FormEvent, MutableRefObject, useEffect } from 'react';
import Button from '~/components/base/Button';
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

const StepOne = ({ step, inputValues, handleChange, handleSubmit, mounted }: StepOneProps) => {
  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <>
      <Title>랜덤 질문</Title>

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
          buttonType="red"
          size="lg"
          disabled={inputValues.subCategories.length === 0}
          step={step}
        >
          면접 연습 시작
        </StyledButton>
      </form>
    </>
  );
};

export default StepOne;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 34px;
`;

const StyledButton = styled(Button)<{ step: number }>`
  display: block;
  margin: 0 auto;
  width: fit-content;
`;
