import { useQuery } from '@tanstack/react-query';
import questionApi from '~/service/question';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import { QUERY_KEY } from '../queryKey';

type QueryParams = {
  mainCategory: MainType;
  subCategory: SubWithAllType;
  page: number;
};

const useQuestionList = (queryParams: QueryParams, isReady: boolean) => {
  const fallback = { content: [], totalElements: 0 };
  const { data = fallback, ...rest } = useQuery(
    [QUERY_KEY.question, queryParams],
    ({ signal }) => questionApi.getList(queryParams, signal),
    {
      keepPreviousData: true,
      staleTime: 0,
      enabled: isReady,
    },
  );

  return { data, ...rest };
};

export default useQuestionList;
