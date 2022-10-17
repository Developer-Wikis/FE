import styled from '@emotion/styled';
import { FormEvent, useEffect, useRef } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import { Step } from '~/pages/random/create';
import { initialPermission } from '~/pages/random/create';

interface StepTwoProps {
  step: Step;
  permission: typeof initialPermission;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (type: string, value: boolean) => void;
  handleBack: () => void;
}

const StepTwo = ({ step, permission, handleSubmit, handleChange, handleBack }: StepTwoProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (step !== 2) return;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => handleChange('mic', true))
      .catch(() => handleChange('mic', false));
  }, [step]);

  return (
    <>
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
            onChange={() => handleChange('audio', !permission.audio)}
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
        >
          면접 연습 시작
        </StyledButton>
      </form>
    </>
  );
};

export default StepTwo;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 34px;
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

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
  width: fit-content;
`;
