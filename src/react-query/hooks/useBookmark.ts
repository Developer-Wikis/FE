import { useUser } from './useUser';
import bookmarkApi from '~/service/bookmark';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKey';
import { AxiosError } from 'axios';

type BookmarkResponse = boolean | undefined;

/**
 * 연속적으로 북마크 api호출 시 이전 요청 취소되지 않는 이슈 있음.
 * 또한 연속 요청 시  api 문제 발생
 */

const useBookmark = ({ questionId }: { questionId: number }) => {
  const queryClient = useQueryClient();
  const { user, clearUser } = useUser();

  const { data: isBookmarked = false } = useQuery(
    ['bookmark', questionId, user?.id],
    ({ signal }) => {
      return bookmarkApi.getBookmark(questionId, signal);
    },
    {
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          clearUser();
        }
      },
      enabled: !!user,
      retry: 0,
    },
  );

  const setBookmarkData = (data: boolean) => {
    queryClient.setQueryData([QUERY_KEY.bookmark, questionId, user?.id], data);
  };

  const { mutate: postBookmark } = useMutation({
    mutationFn: () => {
      return bookmarkApi.bookmark(questionId);
    },
    onMutate: async (data: boolean) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.bookmark, questionId, user?.id] });
      const prevData: BookmarkResponse = queryClient.getQueryData([
        'bookmark',
        questionId,
        user?.id,
      ]);
      queryClient.setQueryData([QUERY_KEY.bookmark, questionId, user?.id], (data) => !data);

      return { prevData: prevData || false };
    },
    onSuccess: (data) => {
      setBookmarkData(data);
    },
    onError: (_, __, context) => {
      if (context?.prevData !== undefined) {
        setBookmarkData(context.prevData);
        alert('북마크 요청에 실패했습니다.');
        return;
      }
    },
    // onSettled: () => {
    // queryClient.invalidateQueries([QUERY_KEY.bookmark, questionId]);
    // },
  });

  return {
    isBookmarked,
    postBookmark,
  };
};

export default useBookmark;
