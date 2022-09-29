import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import Select from '~/components/base/select';
import Title from '~/components/base/Title';
import AddForm from '~/components/common/AddForm';
import PageContainer from '~/components/common/PageContainer';
import AdditionalList from '~/components/domain/question/AdditionalList';
import { middleCategories } from '~/utils/constant/category';

/*
 * input별 validation처리 후 메세지 추가하기
 *  닉네임: 6자
 *  비밀번호: 2자 이상
 *  질문 제목: 30자 이하?
 *
 * ++ 특수문자 입력 방지
 */

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    title: '',
    category: 'none',
  });
  const [additionalList, setAdditionalList] = useState<string[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitQuestion = (e: FormEvent) => {
    if (formData.nickname.trim().length < 2) {
      alert('닉네임은 2자 이상 입력해 주세요.');
      return;
    }
    if (formData.password.length < 4) {
      alert('비밀번호는 4자 이상 입력해 주세요.');
      return;
    }

    if (!formData.title) {
      alert('질문 제목을 입력해 주세요.');
      return;
    }

    if (formData.category === 'none') {
      alert('분류를 선택해 주세요.');
      return;
    }

    // 서버에 데이터 전송
    console.log({ ...formData, additional: additionalList });
  };

  const onAddQuestion = (value: string) => {
    if (additionalList.length >= 5) {
      alert('꼬리 질문은 5개까지 등록 가능합니다.');
      return;
    }
    setAdditionalList([...additionalList, value]);
  };

  const onRemoveQuestion = (index: number) => {
    const updateList = additionalList.filter((_, idx) => idx !== index);
    setAdditionalList(updateList);
  };

  return (
    <Container>
      <Title>질문 등록하기</Title>
      <FormContainer>
        <UserInfo>
          <InputField>
            <label htmlFor="nickname">닉네임</label>
            <Input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="닉네임"
              onChange={onChange}
            />
          </InputField>
          <InputField>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호"
              onChange={onChange}
            />
          </InputField>
        </UserInfo>

        <InputField>
          <label htmlFor="title">제목</label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="질문 제목을 입력해 주세요."
            onChange={onChange}
          />
        </InputField>
        <InputField>
          <label htmlFor="category">분류</label>
          <Select list={middleCategories} name="category" onChange={onChange} />
        </InputField>
        <InputField>
          <label htmlFor="additional">꼬리질문</label>
          <AddForm
            type="text"
            buttonText="추가"
            name="additional"
            id="additional"
            onSubmit={onAddQuestion}
          />
        </InputField>
        <AdditionalList list={additionalList} onRemove={onRemoveQuestion} />
        <ButtonArea>
          <Button onClick={onSubmitQuestion}>등록</Button>
        </ButtonArea>
      </FormContainer>
    </Container>
  );
};

export default CreateQuestion;

const Container = styled(PageContainer)`
  width: 383px;
  margin-top: 32px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 22px;

  select {
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    font-size: 14px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  & > div {
    width: 50%;
  }
`;

const FormContainer = styled.div`
  margin-top: 54px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
