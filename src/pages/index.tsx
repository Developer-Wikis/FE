import type { NextPage } from 'next';
import Head from 'next/head';
import PageContainer from '~/components/common/PageContainer';
import QuestionList from '~/components/domain/QuestionList';
import styled from '@emotion/styled';
import { useState } from 'react';
import MiddleCategory from '~/components/common/MiddleCategory';

const questions = [
  {
    id: 1,
    title: 'var, let, const의 차이점을 말씀해 주세요.',
    nickname: 'none',
    category: 'JS',
    viewCount: 1,
    commentCount: 2,
    createAt: '',
  },
  {
    id: 2,
    title: 'HTTP method에 대해 설명해 주세요.dddddddddddddddddddddddddddddddddddddddddddd',
    nickname: 'none',
    category: '네트워크zzzzzzzzzzzz',
    viewCount: 1,
    commentCount: 2,
    createAt: '',
  },
];

const frontCategories = [
  '전체',
  '기본',
  'HTML',
  'JS',
  'CSS',
  'REACT',
  '네트워크',
  '자료구조/알고리즘',
  '디자인패턴',
  '보안',
];
const Home: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const onSelectCategory = (value: string) => {
    setSelectedCategory(value);
  };
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
            categories={frontCategories}
            onSelect={onSelectCategory}
            currentCategory={selectedCategory}
          />
          <QuestionList questions={questions} />
        </MainContent>
      </main>
    </div>
  );
};

export default Home;

const MainContent = styled(PageContainer)`
  margin-top: 32px;
`;
