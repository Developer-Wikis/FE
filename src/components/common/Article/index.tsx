import styled from '@emotion/styled';

const Article = styled.article`
  width: 440px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 42px 28px 45px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default Article;
