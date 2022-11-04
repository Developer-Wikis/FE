import styled from '@emotion/styled';
import Image from 'next/image';
import { MouseEvent, SyntheticEvent, useState } from 'react';
import { AvatarSize, AvatarSizes } from './types';

interface AvatarProps {
  src?: string;
  size?: AvatarSizes;
  alt?: string;
  onClick?: (e: MouseEvent<HTMLImageElement>) => void;
}

const defaultImage = '/assets/profile-default.jpeg';

const Avatar = ({ src, size = 'md', alt = '프로필이미지', ...props }: AvatarProps) => {
  const [imageUrl, setImageUrl] = useState(src || defaultImage);

  const handleImageError = () => {
    setImageUrl(defaultImage);
  };

  return (
    <Container size={size} {...props}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        src={imageUrl || defaultImage}
        alt={alt}
        onError={handleImageError}
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
