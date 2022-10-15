import { useRouter } from 'next/router';

const RandomVoice = () => {
  const router = useRouter();
  const { idx, mainCategory, subCategories } = router.query;

  return (
    <div>
      음성 연습 {idx} <br /> mainCategory: {mainCategory} <br />
      subCategories: {Array.isArray(subCategories) ? subCategories.join(' ') : subCategories}
    </div>
  );
};

export default RandomVoice;
