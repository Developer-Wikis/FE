import { createContext, ReactNode, useState } from 'react';
import { useComment } from '~/react-query/hooks/useComment';
import commentApi from '~/service/comment';
import { ICommentItem } from '~/types/comment';

interface PasswordState {
  commentId: null | number;
  action: CommentActionType;
  password: string;
}

export interface ContextTypes {
  questionId: number;
  comments: ICommentItem[];
  editId: null | number;
  passwordState: PasswordState;
  onOpenPassword: (commentId: number | null, action: CommentActionType) => void;
  onOpenEditor: (commentId: number) => void;
  onSubmitPassword: (commentId: number, password: string) => void;
  onCancelEdit: () => void;
}
export const CommentContext = createContext<ContextTypes>({} as ContextTypes);

type CommentActionType = 'delete' | 'edit' | '';

interface CommentStoreProps {
  children: ReactNode;
  questionId: number;
}

/* 캐시를 통해 상세페이지가 렌더되고, comment가 나타나기까지 약간의 시간이 딜레이 되는 상태임 */

const CommentProvider = ({ children, questionId }: CommentStoreProps) => {
  const { comments, updateComments } = useComment(questionId);

  const [editId, setEditId] = useState<null | number>(null);
  const [passwordState, setPasswordState] = useState<PasswordState>({
    commentId: null,
    action: '',
    password: '',
  });

  const onOpenPassword = (commentId: number | null, action: CommentActionType) => {
    setPasswordState({ commentId, action, password: '' });
  };

  const onOpenEditor = (commentId: number) => {
    setEditId(commentId);
  };

  const onSubmitPassword = async (commentId: number, password: string) => {
    try {
      if (passwordState.action === 'delete') {
        await commentApi.delete(questionId, commentId, password);

        await updateComments();
        setPasswordState({ commentId: null, action: '', password: '' });

        return;
      }

      if (passwordState.action === 'edit') {
        const isCorrectPassword = await commentApi.checkPassword(questionId, commentId, password);
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

  const onCancelEdit = () => {
    setPasswordState({ commentId: null, action: '', password: '' });
    setEditId(null);
  };

  return (
    <CommentContext.Provider
      value={{
        questionId,
        comments,
        editId,
        passwordState,
        onOpenPassword,
        onSubmitPassword,
        onCancelEdit,
        onOpenEditor,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
