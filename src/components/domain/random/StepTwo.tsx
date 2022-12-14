import styled from '@emotion/styled';
import { FormEvent, useEffect, useRef } from 'react';
import Button from '~/components/base/Button';
import Checkbox from '~/components/base/Checkbox';
import Icon from '~/components/base/Icon';
import PageTitle from '~/components/base/PageTitle';
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
      <TitleContainer>
        <Icon.Button
          name="ArrowLeft"
          color="gray800"
          style={{ position: 'absolute' }}
          size="36px"
          onClick={handleBack}
        />
        <PageTitle>안내 사항</PageTitle>
      </TitleContainer>

      <form onSubmit={handleSubmit}>
        <Notice>알림음이 잘 들리는지 확인해주세요.</Notice>

        <AudioButton type="button" onClick={() => audioRef.current?.play()}>
          <Icon name="Play" color="gray800" />
          알림음 듣기
          <audio src="/assets/audio/mixkit-positive-notification-951.wav" ref={audioRef} />
        </AudioButton>

        <CheckboxField>
          <Checkbox
            id="soundTest"
            name="soundTest"
            required
            checked={permission.audio}
            onChange={() => handleChange('audio', !permission.audio)}
          >
            알림음이 정상적으로 들리신다면 옵션을 체크해주세요.
          </Checkbox>
        </CheckboxField>

        <StyledUl>
          <StyledLi>
            면접 연습 시작 버튼을 클릭하면 음성으로 질문이 진행되며{' '}
            <strong>질문이 끝난 뒤 바로 녹음이 시작</strong>됩니다.
          </StyledLi>
          <StyledLi>
            <strong>마이크 권한이 허용</strong>이 되어있어야 면접 연습을 시작하실 수 있습니다.
          </StyledLi>
          <StyledLi>다시 녹음하기는 질문마다 한 번만 사용할 수 있습니다.</StyledLi>
        </StyledUl>

        <StyledButton
          type="submit"
          variant="red"
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

const TitleContainer = styled.div`
  margin-bottom: 38px;
`;

const Notice = styled.strong`
  display: block;
  text-align: center;
  margin-bottom: 21px;
  ${({ theme }) => theme.fontStyle.body1}
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
`;

const AudioButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 21px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  padding: 20px 76px 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray600};
  background-color: ${({ theme }) => theme.colors.white};

  svg {
    margin-bottom: 4px;
  }
`;

const CheckboxField = styled.div`
  margin-bottom: 27px;
`;

const StyledUl = styled.ul`
  border-radius: 4px;
  margin-bottom: 30px;
  padding: 26px 23px;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const StyledLi = styled.li`
  margin-left: 16px;
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray600};
  list-style: outside;
  word-break: keep-all;

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray800};
  }

  ~ li {
    margin-top: 5px;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
  width: fit-content;
`;
