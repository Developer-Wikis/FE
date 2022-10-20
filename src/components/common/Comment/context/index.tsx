import { createContext, ReactNode, useEffect, useState } from 'react';
import useAxios from '~/hooks/useAxios';
import {
  checkCommentPassword,
  createComment,
  deleteComment,
  editComment,
  getCommentList,
} from '~/service/comment';
import { ICommentItem } from '~/types/comment';
import { commentValuesType } from '../AddCommentForm';

interface PasswordState {
  commentId: null | number;
  action: CommentActionType;
  password: string;
}

export interface ContextTypes {
  comments: ICommentItem[];
  editId: null | number;
  passwordState: PasswordState;
  onOpenPassword: (commentId: number | null, action: CommentActionType) => void;
  onSubmitPassword: (commentId: number, password: string) => void;
  onAddComment: (values: commentValuesType) => void;
  onEditComment: (commentId: number, content: string) => void;
  onCancelEdit: () => void;
}
export const CommentContext = createContext<ContextTypes>({} as ContextTypes);

type CommentActionType = 'delete' | 'edit' | '';

interface CommentStoreProps {
  children: ReactNode;
  questionId: number;
}

const CommentProvider = ({ children, questionId }: CommentStoreProps) => {
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
    <CommentContext.Provider
      value={{
        comments,
        editId,
        passwordState,
        onOpenPassword,
        onSubmitPassword,
        onAddComment,
        onEditComment,
        onCancelEdit,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
