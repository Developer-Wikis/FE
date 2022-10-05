import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useAxios from '~/hooks/useAxios';
import {
  checkCommentPassword,
  createComment,
  deleteComment,
  editComment,
  getCommentList,
} from '~/service/comment';
import { ICommentItem } from '~/types/comment';
import AddCommentForm, { commentValuesType } from './AddCommentForm';
import CommentList from './CommentList';

interface CommentProps {
  questionId: number;
}

type CommentActionType = 'delete' | 'edit' | '';
interface PasswordState {
  commentId: null | number;
  action: CommentActionType;
  password: string;
}

const Comment = ({ questionId }: CommentProps) => {
  const [comments, setComments] = useState<ICommentItem[]>([]);
  const { isLoading, error, request } = useAxios(getCommentList, []);
  const [editId, setEditId] = useState<null | number>(null);
  const [passwordState, setPasswordState] = useState<PasswordState>({
    commentId: null,
    action: '',
    password: '',
  });

  const getComments = async () => {
    const result = await request(questionId);
    if (result) {
      setComments(result.data);
    }
  };

  const onOpenPassword = (commentId: number | null, action: CommentActionType) => {
    setPasswordState({ commentId, action, password: '' });
  };

  const onSubmitPassword = async (commentId: number, password: string) => {
    try {
      if (passwordState.action === 'delete') {
        await deleteComment(questionId, commentId, password);
        await getComments();
        setPasswordState({ commentId: null, action: '', password: '' });

        return;
      }

      if (passwordState.action === 'edit') {
        const isCorrectPassword = await checkCommentPassword(questionId, commentId, password);
        if (isCorrectPassword.data) {
          setEditId(commentId);
          setPasswordState({ commentId: null, action: 'edit', password: password });
        } else {
          alert('비밀번호가 일치하지 않습니다.');
        }
      }
    } catch (e) {
      // 상태코드에 따라 다르게 에러 출력하기
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const onAddComment = async (values: commentValuesType) => {
    try {
      await createComment(questionId, values);
      await getComments();
      setPasswordState({ commentId: null, action: '', password: '' });
    } catch (e) {
      // 상태코드에 따라 다르게 에러 출력하기
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const onEditComment = async (commentId: number, content: string) => {
    try {
      await editComment(questionId, commentId, { password: passwordState.password, content });
      await getComments();
      setPasswordState({ commentId: null, action: '', password: '' });
      setEditId(null);
    } catch (e) {
      // 상태코드에 따라 다르게 에러 출력하기
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const onCancelEdit = () => {
    setEditId(null);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Container>
      <TotalCount>댓글 {comments.length}</TotalCount>

      <CommentContent>
        {comments.map((comment) => (
          <CommentList
            key={comment.id}
            id={comment.id}
            comment={comment}
            onOpenPassword={onOpenPassword}
            onSubmitPassword={onSubmitPassword}
            onEditComment={onEditComment}
            onCancelEdit={onCancelEdit}
            isPasswordCheck={comment.id == passwordState.commentId}
            isEditing={comment.id === editId}
          />
        ))}
        <AddCommentForm onAddComment={onAddComment} />
      </CommentContent>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  margin-top: 38px;
`;

const TotalCount = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const CommentContent = styled.div`
  margin-top: 18px;
  border-top: 2px solid ${({ theme }) => theme.colors.blackGray};
  align-items: center;
`;
