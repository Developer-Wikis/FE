import { MutationFunction, MutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
const useAuthMutation = <TData, TError, TVariables, TContext>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    MutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation(mutationFn, {
    ...options,
    useErrorBoundary: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return true;
        }
      }

      return false;
    },
    onError: (error, variables, context) => {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 401) {
          options?.onError && options.onError(error, variables, context);
        }
      }
    },
  });
};

export default useAuthMutation;
