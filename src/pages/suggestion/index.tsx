import { ChangeEvent, FormEvent, useState } from 'react';
import PageTitle from '~/components/base/PageTitle';
import Article from '~/components/common/Article';
import { send } from 'emailjs-com';
import Label from '~/components/base/Label';
import TitleField from '~/components/common/InputField/TitleField';
import styled from '@emotion/styled';
import TextArea from '~/components/common/TextArea';
import Button from '~/components/base/Button';
import InputField from '~/components/common/InputField';
import useForm from '~/hooks/useForm';
import { SUBMIT_CHECK } from '~/utils/helper/validation';
import ErrorMessage from '~/components/common/ErrorMessage';
import { useRouter } from 'next/router';
import PageDescription from '~/components/common/PageDescription';

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

const initialValues = {
  title: '',
  content: '',
};

type valuesType = {
  [key in keyof typeof initialValues]: string;
};

const validate = (values: valuesType) => {
  const errors = {} as valuesType;

  if (SUBMIT_CHECK.title.isValid(values.title)) {
    errors.title = SUBMIT_CHECK.title.message;
  }

  if (SUBMIT_CHECK.suggestion.isValid(values.content)) {
    errors.content = SUBMIT_CHECK.suggestion.message;
  }

  return errors;
};

const Suggestion = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate,
  });

  const router = useRouter();

  async function onSubmit() {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert('메일 전송에 실패하였습니다.');
      return;
    }

    const response = await send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY);

    if (response.status === 200) {
      alert('메일이 전송되었습니다.');
      router.push('/');
    } else {
      alert('메일 전송에 실패하였습니다.');
    }
  }

  return (
    <Article>
      <PageTitle>건의하기</PageTitle>
      <PageDescription>
        Developerwiki가 더 나은 서비스로 성장할 수 있도록
        <br />
        아낌없는 피드백 부탁드립니다. 🙏‍
      </PageDescription>

      <Form onSubmit={handleSubmit}>
        <TitleField handleChange={handleChange} message={errors.title} />
        <InputField>
          <Label htmlFor="content">건의 내용</Label>
          <TextArea
            height={150}
            name="content"
            placeholder="건의 내용을 입력해 주세요."
            onChange={handleChange}
            block
          />
          {errors.content && <ErrorMessage message={errors.content} />}
        </InputField>
        <SubmitButton>건의 메일 보내기</SubmitButton>
      </Form>
    </Article>
  );
};

export default Suggestion;

const Form = styled.form`
  margin-top: 38px;
`;

const SubmitButton = styled(Button)`
  display: block;
  width: fit-content;
  margin: 0 auto;
`;
