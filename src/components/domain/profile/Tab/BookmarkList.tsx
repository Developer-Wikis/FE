import React from 'react';
import { Paging } from '~/types/utilityType';
import { IQuestionItem } from '~/types/question';
import NoResult from './NoResult';
import QuestionItem from '../../QuestionList/QuestionItem';
import styled from '@emotion/styled';
import { mediaQuery } from '~/utils/helper/mediaQuery';

const BookmarkList = ({ data, ...props }: { data: Paging<IQuestionItem> }) => {
  if (data.totalElements === 0) return <NoResult {...props}>북마크한 질문이 없습니다.</NoResult>;
  return (
    <Container {...props}>
      {data.content.map((question) => (
        <QuestionItem
          question={question}
          key={question.id}
          currentCategory={{
            mainCategory: question.mainCategory,
            subCategory: question.subCategory,
          }}
        />
      ))}
    </Container>
  );
};

export default BookmarkList;

const Container = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};

  ${mediaQuery('sm')} {
    border-top: 0;
  }
`;