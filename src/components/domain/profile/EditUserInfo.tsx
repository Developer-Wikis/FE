import styled from '@emotion/styled';
import { useState } from 'react';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import AddForm from '~/components/common/AddForm';
import InputField from '~/components/common/InputField';
import Modal from '~/components/common/Modal';
import { IUser } from '~/types/user';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import EditAvatar from './EditAvatar';
import ImageEditModal from './ImageEditModal';

interface EditUserInfoProps {
  // onEditImage: () => void;
  // user: IUser;
  onEditNickname: (value: string) => void;
}

const EditUserInfo = ({ onEditNickname }: EditUserInfoProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onClickProfileImage = () => {
    setIsOpenModal(true);
  };

  const onChangeProfileImage = (imageUrl: string) => {
    /* 서버 요청 코드 작성
    profileImageURL 받아서 setProfileImage 하기 */

    setProfileImage(imageUrl);
    onCloseModal();
  };

  return (
    <Container>
      <UserInfo>
        <InputField>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" name="email" value="이메일 넣기" disabled />
        </InputField>
        <InputField>
          <Label htmlFor="nickname">닉네임</Label>
          <AddForm
            buttonText="수정"
            name="nickname"
            id="nickname"
            onSubmit={onEditNickname}
            defaultValue="지니짱효니짱"
            reset={false}
          />
        </InputField>
      </UserInfo>
      <UserProfile>
        <HideLabel htmlFor="profileImage">프로필 수정</HideLabel>
        <EditAvatar size="lg" imageUrl={profileImage} onClick={onClickProfileImage} />
      </UserProfile>
      <Modal visible={isOpenModal} onClose={onCloseModal}>
        <ImageEditModal onChangeImage={onChangeProfileImage} />
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
