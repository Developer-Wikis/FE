import styled from '@emotion/styled';
import { useState } from 'react';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import AddForm from '~/components/common/AddForm';
import InputField from '~/components/common/InputField';
import Modal from '~/components/common/Modal';
import { useEditProfile } from '~/react-query/hooks/useEditProfile';
import { User } from '~/types/user';
import { objectToForm } from '~/utils/helper/converter';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import EditAvatar from './EditAvatar';
import ImageEditModal from './ImageEditModal';

interface EditUserInfoProps {
  // onEditImage: () => void;
  user: User;
  onEditNickname: (value: string) => void;
}

const EditUserInfo = ({ user, onEditNickname }: EditUserInfoProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { editProfileImage, editDefaultImage } = useEditProfile();

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onClickProfileImage = () => {
    setIsOpenModal(true);
  };

  const onChangeProfileImage = async (imageFile: File) => {
    const formData = await objectToForm({ image: imageFile });
    editProfileImage({ userId: user.id, formData });
    onCloseModal();
  };

  const onChangeDefaultImage = async () => {
    if (!user.profileUrl) {
      alert('현재 기본 이미지로 설정되어 있습니다.');
      onCloseModal();
      return;
    }

    editDefaultImage(user.id);
    onCloseModal();
  };

  return (
    <Container>
      <UserInfo>
        <InputField>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" name="email" value={user.email} disabled />
        </InputField>
        <InputField>
          <Label htmlFor="nickname">닉네임</Label>
          <AddForm
            buttonText="수정"
            name="nickname"
            id="nickname"
            onSubmit={onEditNickname}
            defaultValue={user.username}
            reset={false}
          />
        </InputField>
      </UserInfo>
      <UserProfile>
        <HideLabel htmlFor="profileImage">프로필 수정</HideLabel>
        <EditAvatar size="lg" imageUrl={user.profileUrl} onClick={onClickProfileImage} />
      </UserProfile>
      <Modal visible={isOpenModal} onClose={onCloseModal}>
        <ImageEditModal
          onChangeImage={onChangeProfileImage}
          onChangeDefaultImage={onChangeDefaultImage}
        />
      </Modal>
    </Container>
  );
};

export default EditUserInfo;

const Container = styled.div`
  margin-top: 44px;
  display: flex;
  justify-content: space-between;

  ${mediaQuery('sm')} {
    flex-direction: column;
  }
`;

const UserInfo = styled.div`
  max-width: 396px;
  width: 100%;
`;

const UserProfile = styled.div``;

const HideLabel = styled(Label)`
  display: none;

  ${mediaQuery('sm')} {
    display: block;
  }
`;
