import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useStorage from '~/hooks/useStorage';
import { QuestionDetailResponse } from '~/service/question';

const RandomVoice = () => {
  const local = useStorage('local');
  const router = useRouter();
  const { idx, mainCategory, subCategories } = router.query;

  const [questions, setQuestions] = useState<QuestionDetailResponse[]>([]);

  useEffect(() => {
    const questions = local.getItem('randomQuestions', []);
    console.log(questions);

    setQuestions(questions);
  }, []);

  return (
    <div>
      음성 연습 {idx} <br /> mainCategory: {mainCategory} <br />
      subCategories: {Array.isArray(subCategories) ? subCategories.join(' ') : subCategories}
    </div>
  );
};

export default RandomVoice;
