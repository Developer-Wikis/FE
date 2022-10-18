import styled from '@emotion/styled';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import PageContainer from '~/components/common/PageContainer';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import { useRouter } from 'next/router';
import useStorage from '~/hooks/useStorage';
import { getRandomQuestions } from '~/service/question';
import useAxios from '~/hooks/useAxios';
import { isBoolean, isMainType, isString } from '~/utils/helper/checkType';
import { isValidCategoryPair } from '~/utils/helper/validation';
import StepTwo from '~/components/domain/random/StepTwo';
import StepOne from '~/components/domain/random/StepOne';

const STORAGE_KEY = {
  step: 'step',
  stepOneValues: 'stepOneValues',
  stepTwoValues: 'stepTwoValues',
  random: 'random',
};

export type Step = 1 | 2;
export type InputValues = {
  type: 'voice' | 'text';
  mainCategory: MainType | 'none';
  subCategories: SubWithAllType[];
};

const initialInputValues: InputValues = {
  type: 'voice',
  mainCategory: 'none',
  subCategories: [],
};
export const initialPermission = { audio: false, mic: false };

const CreateRandom = () => {
  const local = useStorage('local');
  const session = useStorage('session');
  const clearSession = useCallback(
    () => Object.values(STORAGE_KEY).forEach(session.removeItem),
    [session],
  );

  const router = useRouter();

  const [step, setStep] = useState<Step>();
  const [inputValues, setInputValues] = useState<InputValues>();
  const [permission, setPermission] = useState<typeof initialPermission>();

  const { request } = useAxios(getRandomQuestions, [
    inputValues?.mainCategory,
    inputValues?.subCategories,
  ]);
  const getQuestions = async () => {
    if (!inputValues || inputValues?.mainCategory === 'none') return;

    const { mainCategory, subCategories } = inputValues;
    const response = await request({
      mainCategory,
      subCategories: subCategories.join(' '),
    });

    if (!response) return;
    local.setItem(STORAGE_KEY.random, { type: inputValues.type, questions: response.data.content });
  };

  const handleChange = (name: string, value: string | SubWithAllType[]) => {
    if (!inputValues) return;

    const nextInputValues = { ...inputValues, [name]: value };
    if (name === 'mainCategory') {
      nextInputValues.subCategories = [];
    }

    session.setItem(STORAGE_KEY.stepOneValues, nextInputValues);
    setInputValues(nextInputValues);
  };

  const handlePermissionChange = (name: string, value: boolean) => {
    if (!permission) return;

    const nextPermission = { ...permission, [name]: value };

    session.setItem(STORAGE_KEY.stepTwoValues, nextPermission);
    setPermission(nextPermission);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValues) return;

    if (step === 1 && inputValues.type === 'voice') {
      session.setItem(STORAGE_KEY.step, 2);
      session.setItem(STORAGE_KEY.stepTwoValues, initialPermission);

      setStep(2);
      scrollTo(0, 0);
      return;
    }

    clearSession();
    getQuestions();

    const { type, mainCategory, subCategories } = inputValues;
    router.push(
      {
        pathname: `/random/${type}/1`,
        query: { mainCategory, subCategories },
      },
      `/random/${type}/1`,
    );
  };

  const handleBack = () => {
    session.setItem(STORAGE_KEY.step, 1);
    session.removeItem(STORAGE_KEY.stepTwoValues);

    setStep(1);
    setPermission(initialPermission);
  };

  useEffect(() => {
    const [storedStep, stepOneValues, stepTwoValues] = Object.values(STORAGE_KEY).map((key) =>
      session.getItem(key, null),
    );
    const queryStep = Number(router.query.step);
    if (queryStep === 0) {
      clearSession();
      router.push('/random/create');
    }

    const isInit = queryStep === 0 || storedStep === null;
    if (isInit) {
      session.setItem(STORAGE_KEY.step, 1);

      setStep(1);
      setInputValues(initialInputValues);
      setPermission(initialPermission);
      return;
    }

    const validStepOneValues = getValidStepOneValues(stepOneValues);
    const validStepTwoValues = getValidStepTwoValues(stepTwoValues);

    setStep(isValidStep(storedStep) ? storedStep : 1);
    setInputValues(validStepOneValues);
    setPermission(validStepTwoValues);
  }, [router.query.step]);

  return (
    <MainContent>
      <Article>
        {step === 1 && inputValues && (
          <StepOne
            step={step}
            inputValues={inputValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}

        {step === 2 && permission && (
          <StepTwo
            step={step}
            permission={permission}
            handleSubmit={handleSubmit}
            handleChange={handlePermissionChange}
            handleBack={handleBack}
          />
        )}
      </Article>
    </MainContent>
  );
};

export default CreateRandom;

function isValidStep(value: unknown): value is Step {
  return [1, 2].includes(Number(value));
}

function isValidType(value: unknown): value is 'voice' | 'text' {
  return isString(value) && ['voice', 'text'].includes(value);
}

function isValidMainCategory(value: unknown): value is typeof initialInputValues.mainCategory {
  return value === 'none' || isMainType(value);
}

function getValidSubCategories(value: unknown, mainCategory: MainType): SubWithAllType[] {
  if (!Array.isArray(value)) return initialInputValues.subCategories;
  if (value.includes('all')) {
    if (value.length === 1) return value;
    else return initialInputValues.subCategories;
  }

  return value
    .filter((sub) => isValidCategoryPair(mainCategory, sub))
    .filter((sub, index, arr) => arr.indexOf(sub) === index);
}

function getValidStepOneValues(value: unknown): InputValues {
  const validValues = { ...initialInputValues };
  if (!value) return validValues;

  const { type, mainCategory, subCategories } = value as Record<keyof InputValues, unknown>;

  if (isValidType(type)) {
    validValues.type = type;

    if (isValidMainCategory(mainCategory)) {
      validValues.mainCategory = mainCategory;
      validValues.subCategories =
        mainCategory === 'none' ? [] : getValidSubCategories(subCategories, mainCategory);
    }
  }

  return validValues;
}

function getValidStepTwoValues(value: unknown): typeof initialPermission {
  const validValues = { ...initialPermission };
  if (!value) return validValues;

  const { audio, mic } = value as Record<keyof typeof initialPermission, unknown>;

  if (isBoolean(audio)) validValues.audio = audio;
  if (isBoolean(mic)) validValues.mic = mic;
  return validValues;
}

const MainContent = styled(PageContainer)`
  margin-top: 50px;
`;

const Article = styled.article`
  width: 440px;
  margin: 0 auto;
  padding: 42px 28px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
`;
