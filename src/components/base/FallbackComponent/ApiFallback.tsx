import axios from 'axios';
import { FallbackProps } from 'react-error-boundary';
import PageContainer from '~/components/common/PageContainer';
import Button from '../Button';
import Link from '../Link';

const ApiFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (!axios.isAxiosError(error)) {
    throw error;
  }

  switch (error.response?.status) {
    case 401:
      return (
        <PageContainer>
          <div role="alert">
            <p>
              로그인이 필요한 서비스입니다.
              <br />
              로그인 후 이용해주세요.
            </p>
            <Link href="/login" variant="borderGray" size="sm">
              로그인
            </Link>
          </div>
        </PageContainer>
      );
    case 404:
    // 404 handler
    case 500:
      return (
        <PageContainer>
          <div role="alert">
            <h3>시스템 점검 중입니다.</h3>
            <p>
              보다 안정적인 서비스 이용을 위해 현재 developerwiki를 점검 중입니다.
              <br />
              서비스 이용에 불편을 드려 죄송합니다.
            </p>
          </div>
        </PageContainer>
      );
  }

  return (
    <PageContainer>
      <div role="alert">
        <span>일시적인 오류로 불러오지 못했습니다.</span>
        <Button onClick={resetErrorBoundary}>다시 불러오기</Button>
      </div>
    </PageContainer>
  );
};

export default ApiFallback;
