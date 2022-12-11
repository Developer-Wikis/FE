import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { useState } from 'react';

const useUrlState = <S extends ParsedUrlQueryInput>(
  initialState: S,
  queryFn?: (state: S) => string | ParsedUrlQueryInput,
): [S, (state: S) => void] => {
  const router = useRouter();
  const [urlState, setUrlState] = useState(initialState);

  const handleChange = (nextUrlState: S) => {
    router.push({
      pathname: router.pathname,
      query: queryFn ? queryFn(nextUrlState) : nextUrlState,
    });
    setUrlState(nextUrlState);
  };

  return [urlState, handleChange];
};

export default useUrlState;
