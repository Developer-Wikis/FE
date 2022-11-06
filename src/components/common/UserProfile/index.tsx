import styled from '@emotion/styled';
import { theme } from '~/types/theme';
import Avatar from '../Avatar';

interface UserProfileProps {
  profileUrl?: string;
  avatarSize?: 'md' | 'sm';
  fontSize?: 'sm' | 'md' | 'lg';
  text: string;
}

const UserProfile = ({
  profileUrl,
  avatarSize = 'md',
  fontSize = 'md',
  text,
}: UserProfileProps) => {
  return (
    <Container>
      <Avatar src={profileUrl} size={avatarSize} />
      <Text fontSize={fontSize}>{text}</Text>
    </Container>
  );
};

const textSize = {
  sm: `
    margin-left: 4px;
    ${theme.fontStyle.body1}
`,
  md: `
    margin-left: 10px;
    ${theme.fontStyle.subtitle1}
  `,

  lg: `
    margin-left: 12px;
    ${theme.fontStyle.subtitle1}
  `,
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span<{ fontSize: 'sm' | 'md' | 'lg' }>`
  ${({ fontSize }) => fontSize && textSize[fontSize]};
`;

export default UserProfile;
