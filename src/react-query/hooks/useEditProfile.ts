import userApi from '~/service/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKey';

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: editUsername } = useMutation(userApi.editUsername, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.user]);
      alert(`닉네임이 정상적으로 변경되었습니다.`);
    },
    onError: () => {
      alert('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    editUsername,
  };
};
