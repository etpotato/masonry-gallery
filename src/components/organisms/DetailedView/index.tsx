import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { PhotoQueryFn, PhotoQueryKey } from '../../../queries/photos';
import { Modal } from '../../molecules/Modal';
import { Loader } from '../../atoms/Loader';
import { LoaderWrap, StyledParagraph, TextWrap, Wrap } from './styles';
import { Image } from '../../atoms/Image';
import { useNavigateWithSearchParams } from '../../../hooks/use-navigate-with-search-params';

export const DetailedView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigateWithSearchParams();

  const photoQuery = useQuery({
    queryKey: PhotoQueryKey.detailed({ id: id || '' }),
    queryFn: PhotoQueryFn.detailed,
  });

  return (
    <Modal onClose={() => navigate('/')}>
      {photoQuery.isLoading ? (
        <LoaderWrap>
          <Loader />
        </LoaderWrap>
      ) : null}
      {photoQuery.isError && 'Error loading photo'}
      {photoQuery.isSuccess ? (
        <Wrap>
          <Image image={photoQuery.data} size="original" />
          <TextWrap>
            <StyledParagraph>
              <i>{photoQuery.data.title ? `"${photoQuery.data.title}"` : 'Untitled'}</i> by&nbsp;
              <a href={photoQuery.data.authorUrl} target="_blank" rel="noopener noreferrer">
                {photoQuery.data.author}
              </a>
            </StyledParagraph>
            <StyledParagraph>
              Original post&nbsp;
              <a href={photoQuery.data.url} target="_blank" rel="noopener noreferrer">
                on Pexels
              </a>
            </StyledParagraph>
          </TextWrap>
        </Wrap>
      ) : null}
    </Modal>
  );
};
