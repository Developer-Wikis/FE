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
  updatePasswordState: (payload: PasswordState) => void;
  openPassword: (commentId: number | null, action: CommentActionType) => void;
  openEditor: (commentId: number) => void;
  closeEditor: () => void;
  closePassword: () => void;
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

  const updatePasswordState = (payload: PasswordState) => {
    setPasswordState(payload);
  };

  const openPassword = (commentId: number | null, action: CommentActionType) => {
    setPasswordState({ commentId, action, password: '' });
  };

  const openEditor = (commentId: number) => {
    setEditId(commentId);
  };

  const closeEditor = () => {
    setEditId(null);
  };

  const closePassword = () => {
    setPasswordState({ commentId: null, action: '', password: '' });
  };

  return (
    <CommentContext.Provider
      value={{
        questionId,
        editId,
        passwordState,
        updatePasswordState,
        openPassword,
        openEditor,
        closeEditor,
        closePassword,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
