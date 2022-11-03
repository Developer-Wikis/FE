import styled from '@emotion/styled';
import Image from 'next/image';
import { AvatarSize, AvatarSizes } from './types';

interface AvatarProps {
  imageUrl?: string;
  size?: AvatarSizes;
  alt?: string;
}

const Avatar = ({ imageUrl, size = 'md', alt = '프로필이미지', ...props }: AvatarProps) => {
  const defaultImage = '/assets/profile-default.jpeg';
  return (
    <Container size={size} {...props}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        src={imageUrl || defaultImage}
        alt={alt}
      />
    </Container>
  );
};

export default Avatar;

const Container = styled.div<AvatarProps>`
  width: ${({ size }) => size && AvatarSize[size]};
  height: ${({ size }) => size && AvatarSize[size]};
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;
