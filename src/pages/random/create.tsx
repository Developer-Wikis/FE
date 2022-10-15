import styled from '@emotion/styled';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import PageContainer from '~/components/common/PageContainer';
import MainCategoryField from '~/components/domain/random/MainCategoryField';
import SubCategoryField from '~/components/domain/random/SubCategoryField';
import TypeField from '~/components/domain/random/TypeField';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import Icon from '~/components/base/Icon';
import { useRouter } from 'next/router';

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
  const [permission, setPermission] = useState({ audio: false, mic: false });

  const audioRef = useRef<HTMLAudioElement>(null);

  const router = useRouter();

  const handleChange = (name: string, value: string | SubWithAllType[]) => {
    if (name === 'mainCategory') {
      setInputValues({ ...inputValues, [name]: value as MainType | 'none', subCategories: [] });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1 && inputValues.type === 'voice') {
      setStep(2);
      return;
    }

    const { type, mainCategory, subCategories } = inputValues;
    router.push(
      {
        pathname: `/random/${type}/1`,
        query: { mainCategory, subCategories },
      },
      `/random/${type}/1`,
    );
  };

  useEffect(() => {
    if (step !== 2) return;

    scrollTo(0, 0);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setPermission({ ...permission, mic: true }))
      .catch(() => setPermission({ ...permission, mic: false }));
  }, [step]);

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
              step={step}
            >
              면접 연습 시작
            </StyledButton>
          </Form>
        )}

        {step === 2 && (
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
                onChange={() => setPermission({ ...permission, audio: !permission.audio })}
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
  font-weight: 500;
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
    font-weight: 500;
    color: ${({ theme }) => theme.colors.blackGray};
  }

  ~ li {
    margin-top: 7px;
  }
`;
