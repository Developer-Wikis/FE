import { useRouter } from 'next/router';
import MoveButtons from '~/components/common/MoveButtons';
import { ICategoryQuery } from '~/types/question';

interface QuestionMoveButtonProps {
  categoryQuery: ICategoryQuery;
  prevId: number;
  nextId: number;
}

const QuestionMoveButtons = ({ categoryQuery, nextId, prevId }: QuestionMoveButtonProps) => {
  const router = useRouter();

  const onMovePrev = () => {
    router.push({ pathname: `/question/${prevId}`, query: { ...categoryQuery } });
  };

  const onMoveNext = () => {
    router.push({ pathname: `/question/${nextId}`, query: { ...categoryQuery } });
  };

  return (
    <MoveButtons
      disabledPrev={!prevId}
      disabledNext={!nextId}
      onPrev={onMovePrev}
      onNext={onMoveNext}
    />
  );
};

export default QuestionMoveButtons;
