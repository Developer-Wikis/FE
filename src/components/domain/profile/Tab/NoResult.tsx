import React from 'react';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface NoResultProps {
  children: ReactNode;
}

const NoResult = ({ children, ...props }: NoResultProps) => {
  return (
    <StyledDiv {...props}>
      <span>{children}</span>
    </StyledDiv>
  );
};

export default NoResult;

const StyledDiv = styled.div`
  padding: 64px 0;
  text-align: center;
`;
