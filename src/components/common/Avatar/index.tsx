import styled from '@emotion/styled';
import Image from 'next/image';
import { AvatarSize, AvatarSizes } from './types';

interface AvatarProps {
  imageUrl?: string;
  size?: AvatarSizes;
}

const Avatar = ({ imageUrl, size = 'md', ...props }: AvatarProps) => {
  const defaultImage = '/assets/profile-default.jpeg';
  return (
    <Container size={size} {...props}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        src={imageUrl || defaultImage}
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
