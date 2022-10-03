import type { NextPage } from 'next';
import Head from 'next/head';
import PageContainer from '~/components/common/PageContainer';
import QuestionList from '~/components/domain/QuestionList';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import MiddleCategory from '~/components/common/MiddleCategory';
import useAxios from '~/hooks/useAxios';
import { getQuestionList } from '~/service/question';
import { IQuestionItem } from '~/types/question';
import MainContainer from '~/components/common/MainContainer';
import { categories, MainCategory } from '~/utils/constant/category';
import { useRouter } from 'next/router';
import { isString } from '~/utils/helper/checkType';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';

type Categories = {
  main: MainCategory;
  sub: string;
  page: number;
};

const initialValues: Categories = {
  main: 'fe',
  sub: '전체',
  page: 0,
};

const Home: NextPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<Categories | null>();
  const [questions, setQuestions] = useState<IQuestionItem[]>([]);
  const [isEndPage, setIsEndPage] = useState(false);

  const router = useRouter();
  const { isLoading, request } = useAxios(getQuestionList, [selectedCategories]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isEndPage) {
      setObserverTarget(undefined);
      return;
    }

    if (isIntersecting && !isLoading && selectedCategories) {
      setSelectedCategories({ ...selectedCategories, page: selectedCategories.page + 1 });
    }
  };
  const { setTarget: setObserverTarget } = useIntersectionObserver({ onIntersect, threshold: 0.2 });

  const onChangeSubCategory = (subCategory: string) => {
    if (selectedCategories?.sub === subCategory || !selectedCategories) return;

    setSelectedCategories({ ...selectedCategories, sub: subCategory, page: initialValues.page });
    setIsEndPage(false);
    router.push({
      pathname: '/',
      query: { dev: selectedCategories.main, category: subCategory },
    });
  };

  const requestQuestionList = async () => {
    if (!router.isReady || !selectedCategories) return;

    const { main, sub, page } = selectedCategories;
    const requestCategory = sub === '전체' ? `${main.toUpperCase()} ALL` : sub.toUpperCase();

    const result = await request({ category: requestCategory, page });
    if (result) {
      setQuestions(
        page === initialValues.page ? result.data.content : [...questions, ...result.data.content],
      );

      if (result.data.last) {
        setIsEndPage(true);
      }
    }
  };

  useEffect(() => {
    requestQuestionList();
  }, [request]);

  useEffect(() => {
    if (!router.isReady) return;

    let { dev, category } = router.query;

    const isValidDev = isString(dev) && Object.keys(categories).includes(dev);
    if (!isValidDev) dev = initialValues.main;

    const isValidCategory =
      isString(category) && categories[dev as MainCategory].includes(category);
    if (!isValidCategory) category = initialValues.sub;

    const notChanged = dev === selectedCategories?.main && category === selectedCategories?.sub;
    if (notChanged) return;

    setSelectedCategories({
      main: dev as MainCategory,
      sub: category as string,
      page: initialValues.page,
    });
  }, [router.isReady, router.query.dev, router.query.category]);

  return (
    <div>
      <Head>
        <title>Developer Wiki</title>
        <meta name="description" content="Developer Wiki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <MainContent>
          {router.isReady && selectedCategories && (
            <MiddleCategory
              categories={['전체', ...categories[selectedCategories.main]]}
              onSelect={onChangeSubCategory}
              currentCategory={selectedCategories.sub}
            />
          )}
          <QuestionList ref={setObserverTarget} questions={questions} />
        </MainContent>
      </MainContainer>
    </div>
  );
};

export default Home;

const MainContent = styled(PageContainer)`
  margin-top: 32px;
`;
