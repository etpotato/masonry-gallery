import { useNavigate, useSearchParams, NavigateOptions } from 'react-router';

const PARAMS_TO_KEEP = ['query'];

export function useNavigateWithSearchParams(): (path: string, options?: NavigateOptions) => void {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navigateWithSearchParams = (path: string, options: NavigateOptions = {}): void => {
    const paramsToKeep: Record<string, string> = {};
    PARAMS_TO_KEEP.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        paramsToKeep[param] = value;
      }
    });

    const url = new URL(path, window.location.origin);
    Object.entries(paramsToKeep).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    navigate(`${url.pathname}${url.search}`, options);
  };

  return navigateWithSearchParams;
}
