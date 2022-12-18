import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import questionApi from '~/service/question';

const useCreateQuestion = () => {
  const router = useRouter();

  return useMutation(questionApi.create, {
    onSuccess: () => {
      alert('질문이 접수되었습니다. 질문은 관리자 확인 후 등록됩니다.');
      router.push('/');
    },
    onError: () => {
      alert('질문 등록에 실패했습니다.');
    },
  });
};

export default useCreateQuestion;
