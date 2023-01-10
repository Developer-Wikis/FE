import { MutationFunction, MutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useUser } from './useUser';

const useAuthMutation = <TData, TError, TVariables, TContext>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    MutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const router = useRouter();
  const { clearUser } = useUser();

  return useMutation(mutationFn, {
    ...options,
    onError: (error, variables, context) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/login');
          clearUser();
          return;
        }
      }

      options?.onError && options.onError(error, variables, context);
    },
  });
};

export default useAuthMutation;
