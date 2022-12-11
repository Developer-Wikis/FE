import styled from '@emotion/styled';
import Button from '~/components/base/Button';
import Link from '~/components/base/Link';
import { toast } from '~/components/common/Toast';

const Test = () => {
  const AddBookmarkWithLink = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>북마크에 추가되었습니다.</span>
      <StyledLink size="sm" variant="borderGray" href={'/'}>
        북마크 보기
      </StyledLink>
    </div>
  );

  return (
    <>
      <Button onClick={() => toast.showMessage('hi')}>Toast Message</Button>
      <Button onClick={() => toast.showChildren(AddBookmarkWithLink, true)}>Toast Children</Button>
    </>
  );
};

export default Test;

const StyledLink = styled(Link)`
  line-height: 1;
`;
