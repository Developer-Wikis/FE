import styled from '@emotion/styled';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import Article from '~/components/common/Article';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import { isValidFileSize, isValidImageFileExtension } from '~/utils/helper/validation';

interface ImageEditModalProps {
  onChangeImage: (imageUrl: string) => void;
}

const ImageEditModal = ({ onChangeImage }: ImageEditModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onClickUploadButton = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    let imageFile = e.target.files && (e.target.files[0] as File);
    const MAX_MB = 1;

    if (!imageFile) return;

    if (!isValidImageFileExtension(imageFile)) {
      alert('jpg, png, gif 파일만 업로드 가능합니다.');
      return;
    }

    if (!isValidFileSize(imageFile.size, MAX_MB)) {
      alert(`최대 ${MAX_MB}MB 까지 업로드 가능합니다.`);
      return;
    }

    if (/\.(heic)$/i.test(imageFile.name)) {
      const heic2any = require('heic2any');
      imageFile = await heic2any({ blob: imageFile, toType: 'image/jpeg' });

      if (!imageFile) {
        return;
      }
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      onChangeImage((reader.result as string) || '');
    };
  };

  const onChangeDefaultImage = () => {
    console.log('기본 이미지로 변경');
  };

  return (
    <Container>
      <Button size="lg" buttonType="borderGray" fullWidth onClick={onChangeDefaultImage}>
        기본 이미지로 변경
      </Button>
      <UploadButton size="lg" buttonType="red" fullWidth onClick={onClickUploadButton}>
        <ButtonText>
          <StyledIcon name="Upload" size="18" />
          이미지 업로드
        </ButtonText>
        <ButtonDescription>(최대 1MB 이하만 업로드 가능)</ButtonDescription>
      </UploadButton>
      <HideInput
        type="file"
        accept="image/gif, image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleChangeImage}
      />
    </Container>
  );
};

export default ImageEditModal;

const Container = styled(Article)`
  width: 100%;
  background-color: white;
  max-width: 400px;
  padding: 28px;
  margin-top: 0;

  ${mediaQuery('sm')} {
    padding-top: ${({ theme }) => theme.space.mobileSide};
    padding-bottom: ${({ theme }) => theme.space.mobileSide};
  }
`;

const UploadButton = styled(Button)`
  margin-top: 10px;
  flex-direction: column;
`;

const ButtonText = styled.span`
  display: inline-flex;
  align-items: center;
`;

const ButtonDescription = styled.span`
  ${({ theme }) => theme.fontStyle.body2}
`;

const StyledIcon = styled(Icon)`
  margin-right: 6px;
`;

const HideInput = styled.input`
  display: none;
`;
