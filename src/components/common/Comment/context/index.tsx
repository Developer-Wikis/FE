import { createContext, ReactNode, useState } from 'react';
import { CommentActionType } from '~/types/comment';
interface PasswordState {
  commentId: null | number;
  action: CommentActionType;
  password: string;
}

export interface ContextTypes {
  questionId: number;
  editId: null | number;
  passwordState: PasswordState;
  updateEditId: (commentId: number | null) => void;
  updatePasswordState: (payload: PasswordState) => void;
  resetPasswordState: () => void;
}
export const CommentContext = createContext<ContextTypes>({} as ContextTypes);

interface CommentStoreProps {
  children: ReactNode;
  questionId: number;
}

const CommentProvider = ({ children, questionId }: CommentStoreProps) => {
  const [editId, setEditId] = useState<null | number>(null);
  const [passwordState, setPasswordState] = useState<PasswordState>({
    commentId: null,
    action: '',
    password: '',
  });

  const updateEditId = (commentId: number | null) => {
    setEditId(commentId);
  };

  const updatePasswordState = (payload: PasswordState) => {
    setPasswordState(payload);
  };

  const resetPasswordState = () => {
    setPasswordState({ commentId: null, action: '', password: '' });
  };

  return (
    <CommentContext.Provider
      value={{
        questionId,
        editId,
        passwordState,
        updateEditId,
        updatePasswordState,
        resetPasswordState,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
