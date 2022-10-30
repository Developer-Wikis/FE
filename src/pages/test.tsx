import Pagination from '~/components/common/Pagination';

const Test = () => {
  const pageSize = 20;

  return (
    <>
      <Pagination
        totalItem={pageSize * 1}
        pageSize={20}
        onChange={(page: number) => console.log(page)}
      />
      <Pagination
        totalItem={pageSize * 4}
        pageSize={20}
        onChange={(page: number) => console.log(page)}
      />
      <Pagination
        totalItem={pageSize * 11}
        pageSize={20}
        onChange={(page: number) => console.log(page)}
        current={5}
      />
    </>
  );
};

export default Test;
