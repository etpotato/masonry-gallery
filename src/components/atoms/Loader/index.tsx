import { StyledSvg } from './styles';

export const Loader = () => {
  console.log('Loader');
  return (
    <StyledSvg viewBox="0 0 200 200">
      <path stroke="currentColor" strokeWidth="13" d="M25 85h30v30H25z">
        <animate
          attributeName="opacity"
          begin="-.4"
          calcMode="spline"
          dur="2"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          values="1;0;1;"
        />
      </path>
      <path stroke="currentColor" strokeWidth="13" d="M85 85h30v30H85z">
        <animate
          attributeName="opacity"
          begin="-.2"
          calcMode="spline"
          dur="2"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          values="1;0;1;"
        />
      </path>
      <path stroke="currentColor" strokeWidth="13" d="M145 85h30v30h-30z">
        <animate
          attributeName="opacity"
          begin="0"
          calcMode="spline"
          dur="2"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          values="1;0;1;"
        />
      </path>
    </StyledSvg>
  );
};
