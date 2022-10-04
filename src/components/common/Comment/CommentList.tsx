import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import Input from '~/components/base/Input';
import PasswordConfirm from '~/components/domain/question/PasswordConfirm';
import { ICommentItem } from '~/types/comment';
import { formatDate } from '~/utils/helper/formatting';

interface CommentListProps {
  id: number;
  comment: ICommentItem;
  onOpenPassword: (id: number | null) => void;
  onDeleteComment: (id: number, password: string) => void;
  openPasswordId: number | null;
}

const CommentList = ({
  id,
  comment,
  onOpenPassword,
  openPasswordId,
  onDeleteComment,
}: CommentListProps) => {
  const handleDelete = () => {
    onOpenPassword(id);
  };

  const handlePasswordSubmit = (password: string) => {
    onDeleteComment(id, password);
  };

  const handleClose = () => {
    onOpenPassword(null);
  };

  return (
    <StyledLi>
      <Writer>
        <span>{comment.nickname}</span>
      </Writer>
      <Content>
        <span>{comment.content}</span>
      </Content>
      <Info>
        <CreatedAt>{formatDate(comment.createdAt)}</CreatedAt>
        <Icon.Button name="Close" color="mediumGray" size="12" onClick={handleDelete} />
      </Info>
      {openPasswordId === id && (
        <PasswordConfirm handlePasswordSubmit={handlePasswordSubmit} handleClose={handleClose} />
      )}
    </StyledLi>
  );
};

export default CommentList;

const StyledLi = styled.li`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  position: relative;
`;

const Writer = styled.div`
  margin-left: 16px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Content = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 16px;
`;

const Info = styled.div`
  text-align: right;
  margin-left: 16px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const CreatedAt = styled.span`
  font-size: 14px;
  margin-right: 14px;
`;
