import type { NextPage } from 'next';
import Head from 'next/head';
import PageContainer from '~/components/common/PageContainer';
import QuestionList from '~/components/domain/QuestionList';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import MiddleCategory from '~/components/common/MiddleCategory';
import { getQuestionList } from '~/service/question';
import useAxios from '~/hooks/useAxios';
import { categories, MainCategory } from '../utils/constant/category';

// const questions = [
//   {
//     id: 1,
//     title: 'var, let, const의 차이점을 말씀해 주세요.',
//     nickname: 'none',
//     category: 'JS',
//     viewCount: 1,
//     commentCount: 2,
//     createAt: '',
//   },
//   {
//     id: 2,
//     title: 'HTTP method에 대해 설명해 주세요.dddddddddddddddddddddddddddddddddddddddddddd',
//     nickname: 'none',
//     category: '네트워크zzzzzzzzzzzz',
//     viewCount: 1,
//     commentCount: 2,
//     createAt: '',
//   },
// ];

const Home: NextPage = () => {
  const [mainCategory, setMainCategory] = useState<MainCategory>('fe');
  const [subCategory, setSubCategory] = useState('FE 기본');
  const { isLoading, response, error, callback } = useAxios(getQuestionList, [subCategory]);

  useEffect(() => {
    callback(subCategory);
  }, [subCategory]);

  return (
    <div>
      <Head>
        <title>Developer Wiki</title>
        <meta name="description" content="Developer Wiki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainContent>
          <MiddleCategory
            categories={categories[mainCategory]}
            onSelect={setSubCategory}
            currentCategory={subCategory}
          />
          {!isLoading && !error && <QuestionList questions={response?.data.content ?? []} />}
        </MainContent>
      </main>
    </div>
  );
};

export default Home;

const MainContent = styled(PageContainer)`
  margin-top: 32px;
`;
