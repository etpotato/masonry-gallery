import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: grid;
`;

export const StyledImage = styled.img`
  grid-area: 1 / 1 / 2 / 2;
  width: 100%;
  height: auto;
`;

export const StyledSkeleton = styled.div<{ bgColor?: string | null }>`
  grid-area: 1 / 1 / 2 / 2;
  position: relative;
  background-color: ${(props) => props.bgColor || props.theme.colors.neutral};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateY(-100%);
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 35%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 65%
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateY(100%);
    }
  }
`;
