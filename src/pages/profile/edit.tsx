import styled from '@emotion/styled';
import Image from 'next/image';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import PageTitle from '~/components/base/PageTitle';
import InputField from '~/components/common/InputField';
import PageContainer from '~/components/common/PageContainer';

/*
  컴포넌트 분리 필요
  inputField margin 0 props 추가 해야 할 듯?
  input+button 컴포넌트도 분리 필요
  체크박스 컴포넌트 만들어야할 듯
*/
const ProfileEdit = () => {
  return (
    <Container>
      <PageTitle align="left">회원 정보 수정</PageTitle>
      <UserInfo>
        <InfoEdit>
          <InputField>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" name="email" />
          </InputField>

          <InputField>
            <Label htmlFor="nickname">닉네임</Label>
            <AddForm>
              <Input id="nickname" name="nickname" />
              <Button size="sm">수정</Button>
            </AddForm>
          </InputField>
        </InfoEdit>
        <ImageEdit>
          <Avatar>
            <div className="background">
              <span>프로필 수정</span>
            </div>
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src="/assets/profile-default.jpeg"
            />
          </Avatar>
        </ImageEdit>
      </UserInfo>

      <Line />
      <PageTitle align="left">계정 삭제</PageTitle>
      <DeleteAccount>
        <Notice>
          회원 탈퇴 시 모든 개인 정보는 완전히 삭제되며 복구할 수 없게 됩니다.
          <br />
          등록 신청한 질문, 댓글은 삭제되지 않습니다.
        </Notice>
        <Confirm>
          <CheckBox>
            <input type="checkbox" name="checkNotice" id="checkNotice" required />
            <label htmlFor="checkNotice">위 내용을 모두 확인하였고 이에 동의합니다.</label>
          </CheckBox>
          <DeleteButton buttonType="red" size="lg">
            계정 삭제하기
          </DeleteButton>
        </Confirm>
      </DeleteAccount>
    </Container>
  );
};

export default ProfileEdit;

const Container = styled(PageContainer)`
  margin-top: 50px;
`;
const AddForm = styled.form`
  display: flex;

  button {
    margin-left: 10px;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray300};
  margin: 33px 0 50px;
`;
const UserInfo = styled.div`
  margin-top: 44px;
  display: flex;
  justify-content: space-between;
`;

const InfoEdit = styled.div`
  max-width: 396px;
  width: 100%;
`;

const Avatar = styled.button`
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  .background {
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
    opacity: 0;
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontStyle.body2};
    font-weight: 600;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover .background {
    opacity: 1;
  }
`;
const DeleteAccount = styled.div``;
const Notice = styled.div`
  margin-top: 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 18px;
  color: ${({ theme }) => theme.colors.gray600}; ;
`;

const CheckBox = styled.div`
  margin-top: 18px;

  label {
    margin-left: 6px;
  }
`;

const Confirm = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled(Button)`
  margin-top: 18px;
`;

const ImageEdit = styled.div``;
