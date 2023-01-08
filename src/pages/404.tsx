import styled from '@emotion/styled';
import Link from '~/components/base/Link';
import PageContainer from '~/components/common/PageContainer';

const Custom404 = () => {
  return (
    <PageContainer>
      <Content>
        <PageText>
          <h2>404</h2>
          <strong>Page Not Found</strong>
          <p>찾으려는 페이지가 존재하지 않습니다.</p>
        </PageText>
        <Link variant="black" size="md" href="/">
          홈으로 이동
        </Link>
      </Content>
    </PageContainer>
  );
};

export default Custom404;

const Content = styled.div`
  text-align: center;
  padding-top: 170px;
  padding-bottom: 170px;
`;

const PageText = styled.div`
  margin-bottom: 32px;

  h2 {
    font-size: 180px;
    line-height: 200px;
  }

  strong {
    font-size: 28px;
  }

  p {
    margin-top: 12px;
    ${({ theme }) => theme.fontStyle.body1};
  }
`;
