import styled from '@emotion/styled';
import CommentItem from './CommentItem';
import { ICategoryQuery } from '~/types/question';

/*
TODO:
- type 정리
*/

export type TQueryComment = {
  tab: 'comment';
  content: TComment[];
  page: number;
  totalPage: number;
};

export type TComment = {
  id: number;
  title: string;
  nickname: string;
  content: string;
  createdAt: string;
} & ICategoryQuery;

interface CommentProps {
  content: TComment[];
}

const Comment = ({ content }: CommentProps) => {
  return (
    <StyledUl>
      {(content.length === 0 ? DUMMY : content).map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </StyledUl>
  );
};

export default Comment;

const StyledUl = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const DUMMY: TComment[] = [
  {
    id: 1003,
    title:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At nulla omnis ex minus quam, similique voluptatum tempora, explicabo veritatis iste mollitia reprehenderit, amet ratione quidem magnam tempore placeat necessitatibus enim.',
    nickname: 'jini',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At nulla omnis ex minus quam, similique voluptatum tempora, explicabo veritatis iste mollitia reprehenderit, amet ratione quidem magnam tempore placeat necessitatibus enim.',
    createdAt: '2022-10-25T02:30:02.209669',
    mainCategory: 'fe',
    subCategory: 'data_structure/algorithm',
  },
  {
    id: 1004,
    title: 'useMemo와 useCallback을 설명해주세요.',
    nickname: 'jini',
    content: 'asdfasdf',
    createdAt: '2022-10-25T02:33:53.342431',
    mainCategory: 'fe',
    subCategory: 'react',
  },
  {
    id: 1005,
    title: 'useMemo와 useCallback을 설명해주세요.',
    nickname: 'jini',
    content: 'ㅁㅇㄹ\nㅁㄴㅇㄹ',
    createdAt: '2022-10-25T23:10:52.187376',
    mainCategory: 'fe',
    subCategory: 'react',
  },
  {
    id: 1028,
    title: 'useMemo와 useCallback을 설명해주세요.',
    nickname: 'jini',
    content: '궁금해요',
    createdAt: '2022-11-14T01:26:48.145675',
    mainCategory: 'fe',
    subCategory: 'react',
  },
  {
    id: 1029,
    title: 'useMemo와 useCallback을 설명해주세요.',
    nickname: 'jini',
    content: '궁금해요',
    createdAt: '2022-11-14T01:28:11.061833',
    mainCategory: 'fe',
    subCategory: 'react',
  },
  {
    id: 1030,
    title: 'useMemo와 useCallback을 설명해주세요.',
    nickname: 'jini',
    content: '궁금해요!',
    createdAt: '2022-11-14T01:28:28.187058',
    mainCategory: 'fe',
    subCategory: 'react',
  },
  {
    id: 1031,
    title: 'useMemo와 useCallback을 설명해주세요.',
    nickname: 'jini',
    content: 'ee',
    createdAt: '2022-11-14T01:34:31.799146',
    mainCategory: 'fe',
    subCategory: 'react',
  },
];
