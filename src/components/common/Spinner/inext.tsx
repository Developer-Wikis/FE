import styled from '@emotion/styled';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <div className="loader"></div>
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
  }

  .loader {
    position: relative;

    border-top: 2px solid rgba(255, 255, 255, 0.2);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    border-left: 2px solid #ffffff;

    animation: loading 1.1s infinite linear;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
