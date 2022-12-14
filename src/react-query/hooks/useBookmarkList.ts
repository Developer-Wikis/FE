import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import bookmarkApi from '~/service/bookmark';
import { IQuestionItem } from '~/types/question';
import { Paging } from '~/types/utilityType';

const useBookmarkList = (queryKeyFn: () => QueryKey) => {
  const queryClient = useQueryClient();

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
      // TODO: alert -> toast로 변경
      if (isBookmarked) {
        alert('북마크가 추가되었습니다.');
      } else {
        alert('북마크가 제거되었습니다.');
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
