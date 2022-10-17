import styled from '@emotion/styled';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import PageContainer from '~/components/common/PageContainer';
import MainCategoryField from '~/components/domain/random/MainCategoryField';
import SubCategoryField from '~/components/domain/random/SubCategoryField';
import TypeField from '~/components/domain/random/TypeField';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import Icon from '~/components/base/Icon';
import { useRouter } from 'next/router';
import useStorage from '~/hooks/useStorage';
import { getRandomQuestions } from '~/service/question';
import useAxios from '~/hooks/useAxios';
import { isBoolean, isMainType, isString } from '~/utils/helper/checkType';
import { isValidCategoryPair } from '~/utils/helper/validation';

const STORAGE_KEY = {
  step: 'step',
  stepOneValues: 'stepOneValues',
  stepTwoValues: 'stepTwoValues',
  randomQuestions: 'randomQuestions',
};

type Step = 1 | 2;
type InputValues = {
  type: 'voice' | 'text';
  mainCategory: MainType | 'none';
  subCategories: SubWithAllType[];
};

const initialInputValues: InputValues = {
  type: 'voice',
  mainCategory: 'none',
  subCategories: [],
};
const initialPermission = { audio: false, mic: false };

const CreateRandom = () => {
  const local = useStorage('local');
  const session = useStorage('session');
  const clearSession = useCallback(
    () => Object.values(STORAGE_KEY).forEach(session.removeItem),
    [session],
  );

  const audioRef = useRef<HTMLAudioElement>(null);
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
    local.setItem(STORAGE_KEY.randomQuestions, response.data);
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
    if (step !== 2) return;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => handlePermissionChange('mic', true))
      .catch(() => handlePermissionChange('mic', false));
  }, [step]);

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
        {step === 1 && <Title>랜덤 질문</Title>}
        {step === 2 && (
          <div>
            <Icon.Button
              name="ArrowLeft"
              color="blackGray"
              style={{ position: 'absolute' }}
              size="36px"
              onClick={handleBack}
            />
            <Title>안내 사항</Title>
          </div>
        )}

        {step === 1 && inputValues && (
          <Form action="submit" onSubmit={handleSubmit}>
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
          </Form>
        )}

        {step === 2 && permission && (
          <form onSubmit={handleSubmit}>
            <Subtitle>알림음이 잘 들리는지 확인해주세요.</Subtitle>

            <AudioButton type="button" onClick={() => audioRef.current?.play()}>
              <Icon name="Play" color="blackGray" />
              알림음 듣기
              <audio src="/assets/audio/mixkit-positive-notification-951.wav" ref={audioRef} />
            </AudioButton>

            <AudioCheckbox>
              <input
                type="checkbox"
                name="soundTest"
                id="soundTest"
                required
                checked={permission.audio}
                onChange={() => handlePermissionChange('audio', !permission.audio)}
              />
              <label htmlFor="soundTest">알림음이 정상적으로 들리신다면 옵션을 체크해주세요.</label>
            </AudioCheckbox>

            <UL>
              <LI>
                면접 연습 시작 버튼을 클릭하면 음성으로 질문이 진행되며{' '}
                <strong>질문이 끝난 뒤 바로 녹음이 시작</strong>됩니다.
              </LI>
              <LI>
                <strong>마이크 권한이 허용</strong>이 되어있어야 면접 연습을 시작하실 수 있습니다.
              </LI>
              <LI>다시 녹음하기는 질문마다 한 번만 사용할 수 있습니다.</LI>
            </UL>

            <StyledButton
              type="submit"
              buttonType="red"
              size="lg"
              disabled={!permission.audio || !permission.mic}
              step={step}
            >
              면접 연습 시작
            </StyledButton>
          </form>
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

const StyledButton = styled(Button)<{ step: number }>`
  display: block;
  margin: ${({ step }) => (step === 1 ? 'calc(64px - 42px)' : '0')} auto 0;
  width: fit-content;
`;

const Subtitle = styled.h3`
  display: block;
  text-align: center;
  margin-bottom: 21px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blackGray};
`;

const AudioButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0 auto 21px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  padding: 20px 76px 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.white};
`;

const AudioCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;

  input {
    margin: 0 6px 0 0;
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.red};
  }

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const UL = styled.ul`
  border-radius: 4px;
  margin-bottom: 30px;
  padding: 26px 23px 26px;
  background-color: ${({ theme }) => theme.colors.bgGray};
`;

const LI = styled.li`
  margin-left: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.darkGray};
  list-style: outside;
  word-break: keep-all;

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blackGray};
  }

  ~ li {
    margin-top: 7px;
  }
`;
