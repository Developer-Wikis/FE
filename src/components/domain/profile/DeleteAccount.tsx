import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import Checkbox from '~/components/base/Checkbox';

interface DeleteAccountProps {
  onDeleteAccount: () => void;
}

const DeleteAccount = ({ onDeleteAccount }: DeleteAccountProps) => {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck(!check);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!check) {
      alert('약관에 동의해주세요.');
      return;
    }
    onDeleteAccount();
  };

  return (
    <div>
      <Notice>
        회원 탈퇴 시 모든 개인 정보는 완전히 삭제되며 복구할 수 없게 됩니다.
        <br />
        등록 신청한 질문, 댓글은 삭제되지 않습니다.
      </Notice>
      <Confirm onSubmit={handleSubmit}>
        <NoticeCheckbox
          id="checkNotice"
          name="checkNotice"
          required
          checked={check}
          onChange={handleCheck}
        >
          위 내용을 모두 확인하였고 이에 동의합니다.
        </NoticeCheckbox>
        <DeleteButton buttonType="red" size="lg">
          계정 삭제하기
        </DeleteButton>
      </Confirm>
    </div>
  );
};

export default DeleteAccount;

const Notice = styled.div`
  margin-top: 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  padding: 18px;
  color: ${({ theme }) => theme.colors.gray600}; ;
`;

const Confirm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled(Button)`
  margin-top: 18px;
`;

const NoticeCheckbox = styled(Checkbox)`
  margin-top: 18px;
  height: min-content;
`;
