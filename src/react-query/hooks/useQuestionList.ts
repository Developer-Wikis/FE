import questionApi from '~/service/question';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import { QUERY_KEY } from '../queryKey';
import useAuthQuery from './useAuthQuery';

type QueryParams = {
  mainCategory: MainType;
  subCategory: SubWithAllType;
  page: number;
};

const useQuestionList = (queryParams: QueryParams, isReady: boolean) => {
  const fallback = { content: [], totalElements: 0 };
  const { data = fallback, ...rest } = useAuthQuery(
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
