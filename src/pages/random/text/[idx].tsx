import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useStorage from '~/hooks/useStorage';
import { QuestionDetailResponse } from '~/service/question';

const STORAGE_KEY = 'random';

const RandomText = () => {
  const local = useStorage('local');
  const router = useRouter();
  const { idx, mainCategory, subCategories } = router.query;

  const [questions, setQuestions] = useState<QuestionDetailResponse[]>([]);

  useEffect(() => {
    const questions = local.getItem(STORAGE_KEY, []);
    console.log(questions);

    setQuestions(questions);
  }, []);

  return (
    <div>
      자유 연습 {idx} <br /> mainCategory: {mainCategory} <br /> subCategories:{' '}
      {Array.isArray(subCategories) ? subCategories.join(' ') : subCategories}
    </div>
  );
};

export default RandomText;
