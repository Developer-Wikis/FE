import styled from '@emotion/styled';
import LogoSvg from '~/assets/images/logo.svg';
import LogoText from '~/assets/images/logo-text.svg';

interface LogoProps {
  type?: 'normal' | 'text';
}

const Logo = ({ type = 'normal' }: LogoProps) => {
  return (
    <LogoWrapper>
      {type === 'text' ? <LogoText width={175} height={28} /> : <LogoSvg width={185} height={32} />}
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled.div`
  & > svg {
    display: block;
  }
`;
