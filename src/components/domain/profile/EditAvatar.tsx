import styled from '@emotion/styled';
import Avatar from '~/components/common/Avatar';
import { AvatarSize, AvatarSizes } from '~/components/common/Avatar/types';

interface EditAvatarProps {
  imageUrl?: string;
  size?: AvatarSizes;
  onClick: () => void;
}

const EditAvatar = ({ imageUrl, size, onClick }: EditAvatarProps) => {
  return (
    <Container size={size} onClick={onClick}>
      <div className="background">
        <span>프로필 수정</span>
      </div>
      <Avatar imageUrl={imageUrl} size={size} />
    </Container>
  );
};

export default EditAvatar;

const Container = styled.button<EditAvatarProps>`
  width: ${({ size }) => size && AvatarSize[size]};
  height: ${({ size }) => size && AvatarSize[size]};
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  .background {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontStyle.body2};
    font-weight: 600;
    z-index: 10;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      user-select: none;
    }
  }

  &:hover .background {
    opacity: 1;
  }
`;
