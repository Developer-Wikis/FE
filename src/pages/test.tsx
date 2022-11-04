import styled from '@emotion/styled';
import Button from '~/components/base/Button';
import Link from '~/components/base/Link';
import Toast from '~/components/common/Toast';

const Test = () => {
  const AddBookmarkWithLink = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>북마크에 추가되었습니다.</span>
      <StyledLink size="sm" linkType="borderGray" href={'/'}>
        북마크 보기
      </StyledLink>
    </div>
  );

  return (
    <>
      <Button onClick={() => Toast.showMessage('hi')}>Toast Message</Button>
      <Button onClick={() => Toast.showChildren(AddBookmarkWithLink, true)}>Toast Children</Button>
    </>
  );
};

export default Test;

const StyledLink = styled(Link)`
  line-height: 1;
`;
