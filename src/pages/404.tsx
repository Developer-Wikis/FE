import styled from '@emotion/styled';
import Button from '~/components/base/Button';
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
        <Button>홈으로 이동</Button>
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
