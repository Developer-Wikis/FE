import styled from '@emotion/styled';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import AddForm from '~/components/common/AddForm';
import InputField from '~/components/common/InputField';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import { isValidNickname } from '~/utils/helper/validation';
import EditAvatar from './EditAvatar';

interface EditUserInfoProps {
  onEditImage: () => void;
  onEditNickname: (value: string) => void;
}

const EditUserInfo = ({ onEditImage, onEditNickname }: EditUserInfoProps) => {
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
            isValid={isValidNickname}
            reset={false}
          />
        </InputField>
      </UserInfo>
      <UserProfile>
        <HideLabel htmlFor="profileImage">프로필 수정</HideLabel>
        <EditAvatar size="lg" imageUrl="" onClick={onEditImage} />
      </UserProfile>
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
