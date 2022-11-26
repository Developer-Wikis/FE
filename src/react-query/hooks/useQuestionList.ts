import { useQuery } from '@tanstack/react-query';
import questionApi from '~/service/question';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import { QUERY_KEY } from '../queryKey';
import { useUser } from './useUser';

type QueryParams = {
  mainCategory: MainType;
  subCategory: SubWithAllType;
  page: number;
};

const useQuestionList = (queryParams: QueryParams) => {
  const { user } = useUser();

  const fallback = { content: [], totalElements: 0 };
  const { data = fallback, ...rest } = useQuery(
    [QUERY_KEY.question, queryParams, user?.id],
    () => questionApi.getList(queryParams),
    {
      keepPreviousData: true,
      staleTime: 0,
    },
  );

  return { data, ...rest };
};

export default useQuestionList;
