import styled from '@emotion/styled';
import LogoSvg from '~/assets/images/logo.svg';
import LogoText from '~/assets/images/logo-text.svg';

interface LogoProps {
  type?: 'normal' | 'text';
  size?: 'sm' | 'md';
}

const logoSize = {
  normal: {
    sm: {
      width: 143,
      height: 25,
    },
    md: {
      width: 185,
      height: 32,
    },
  },
  text: {
    sm: {
      width: 130,
      height: 20,
    },
    md: {
      width: 175,
      height: 28,
    },
  },
};

const Logo = ({ type = 'normal', size = 'md' }: LogoProps) => {
  return (
    <LogoWrapper>
      {type === 'text' ? (
        <LogoText width={logoSize.text[size].width} height={logoSize.text[size].height} />
      ) : (
        <LogoSvg width={logoSize.normal[size].width} height={logoSize.normal[size].height} />
      )}
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled.div`
  & > svg {
    display: block;
  }
`;
