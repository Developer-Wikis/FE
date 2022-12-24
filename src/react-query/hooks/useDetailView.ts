import { useMutation } from '@tanstack/react-query';
import questionApi from '~/service/question';

const useDetailView = () => {
  const fn = (id: number) => questionApi.addView(id);
  const { mutate } = useMutation(fn);

  return mutate;
};

export default useDetailView;
