import styled from '@emotion/styled';
import Image from 'next/image';
import { MouseEvent, SyntheticEvent, useEffect, useState } from 'react';
import { AvatarSize, AvatarSizes } from './types';

interface AvatarProps {
  /**
   * 이미지의 경로를 설정합니다.
   */
  src?: string;
  /**
   * 이미지의 사이즈를 설정합니다.
   */
  size?: AvatarSizes;
  /**
   * 이미지를 대체할 텍스트를 설정합니다.
   */
  alt?: string;
  onClick?: (e: MouseEvent<HTMLImageElement>) => void;
}

const defaultImage = '/assets/profile-default.jpeg';

const Avatar = ({ src, size = 'md', alt = '프로필이미지', ...props }: AvatarProps) => {
  const imageUrl = src || defaultImage;

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
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
  border: 1px solid ${({ theme }) => theme.colors.gray300};
`;
