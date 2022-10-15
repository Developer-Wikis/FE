import { useRouter } from 'next/router';

const RandomText = () => {
  const router = useRouter();
  const { idx, mainCategory, subCategories } = router.query;

  return (
    <div>
      자유 연습 {idx} <br /> mainCategory: {mainCategory} <br /> subCategories:{' '}
      {Array.isArray(subCategories) ? subCategories.join(' ') : subCategories}
    </div>
  );
};

export default RandomText;
