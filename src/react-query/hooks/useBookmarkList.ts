import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from '~/components/common/Toast';
import bookmarkApi from '~/service/bookmark';
import { IQuestionItem } from '~/types/question';
import { Paging } from '~/types/utilityType';

const useBookmarkList = (queryKeyFn: () => QueryKey) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const setBookmarkData = (data: Paging<IQuestionItem>) => {
    queryClient.setQueryData(queryKeyFn(), data);
  };

  const { mutate: postBookmark } = useMutation({
    mutationFn: (questionId: number) => bookmarkApi.bookmark(questionId),
    onMutate: async (questionId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeyFn() });

      const prevData: Paging<IQuestionItem> | undefined = queryClient.getQueryData(queryKeyFn());
      queryClient.setQueryData(queryKeyFn(), (prevData: Paging<IQuestionItem> | undefined) =>
        prevData ? optimisticUpdate(prevData, questionId) : undefined,
      );

      return { prevData };
    },
    onSuccess: (isBookmarked) => {
      if (!isBookmarked) {
        toast.showMessage('북마크가 제거되었습니다.');
        return;
      }

      switch (router.pathname) {
        case '/profile':
          toast.showMessage('북마크에 추가되었습니다.');
          break;
        default:
          toast.showMessageWithLink({
            message: '북마크에 추가되었습니다.',
            link: { message: '북마크 보기', href: '/profile' },
          });
      }
    },
    onError: (_, __, context) => {
      if (context?.prevData === undefined) {
        return;
      }

      setBookmarkData(context.prevData);
      alert('북마크 요청에 실패했습니다.');
    },
  });

  return postBookmark;
};

export default useBookmarkList;

function optimisticUpdate(prevData: Paging<IQuestionItem>, questionId: number) {
  const toggleBookmark = (question: IQuestionItem) =>
    question.id === questionId ? { ...question, isBookmarked: !question.isBookmarked } : question;

  return {
    ...prevData,
    content: prevData.content.map(toggleBookmark),
  };
}
