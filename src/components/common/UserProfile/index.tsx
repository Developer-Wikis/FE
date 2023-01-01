import styled from '@emotion/styled';
import { theme } from '~/types/theme';
import Avatar from '../Avatar';

export const AvatarSize = ['sm', 'md'] as const;
export const AvatarFontSize = ['sm', 'md', 'lg'] as const;

interface UserProfileProps {
  /**
   * 프로필 이미지의 경로를 설정합니다.
   */
  profileUrl?: string;
  /**
   * 프로필 이미지 사이즈를 설정합니다.
   */
  avatarSize?: typeof AvatarSize[number];
  /**
   * 폰트 사이즈를 설정합니다.
   */
  fontSize?: typeof AvatarFontSize[number];
  /**
   * 프로필에 작성할 텍스트를 설정합니다.
   */
  text: string;
}

const UserProfile = ({
  profileUrl,
  avatarSize = 'md',
  fontSize = 'md',
  text,
  ...props
}: UserProfileProps) => {
  return (
    <Container {...props}>
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
    ${theme.fontStyle.headline1}
  `,
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span<{ fontSize: 'sm' | 'md' | 'lg' }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ fontSize }) => fontSize && textSize[fontSize]};
`;

export default UserProfile;
