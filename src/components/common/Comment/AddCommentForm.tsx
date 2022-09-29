import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Button from '~/components/base/Button';

const AddCommentForm = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    content: '',
  });

  const nicknameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const contentRef = useRef<null | HTMLTextAreaElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (formData.nickname.trim().length < 2) {
      alert('닉네임은 2자 이상 입력해 주세요.');
      nicknameRef.current?.focus();
      return;
    }
    if (formData.password.length < 4) {
      alert('비밀번호는 4자 이상 입력해 주세요.');
      passwordRef.current?.focus();
      return;
    }
    if (formData.content.trim().length < 1) {
      alert('댓글의 내용을 작성해 주세요');
      contentRef.current?.focus();
      return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container onSubmit={onSubmit}>
      <Content>
        <Writer>
          <Input name="nickname" ref={nicknameRef} placeholder="닉네임" onChange={handleChange} />
          <Input name="password" ref={passwordRef} placeholder="비밀번호" onChange={handleChange} />
        </Writer>
        <Textarea
          name="content"
          ref={contentRef}
          placeholder="댓글을 입력해주세요"
          onChange={handleChange}
        />
      </Content>
      <AddButton type="submit">등록</AddButton>
    </Container>
  );
};

export default AddCommentForm;

const Container = styled.form`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 20px;
`;

const Writer = styled.div`
  display: flex;
  flex-direction: column;
  width: 132px;
`;

const Input = styled.input`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 14px;

  height: 32px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
`;

const Textarea = styled.textarea`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 14px;

  height: 74px;
  padding: 8px;
  box-sizing: border-box;
  resize: none;
  margin-left: 10px;

  flex-grow: 1;
`;

const AddButton = styled(Button)`
  align-self: flex-end;
`;
