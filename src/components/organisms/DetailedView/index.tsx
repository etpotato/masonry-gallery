import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { PhotoQueryFn, PhotoQueryKey } from '../../../queries/photos';
import { Modal } from '../../molecules/Modal';
import { Loader } from '../../atoms/Loader';
import { StyledItem, StyledList } from './styles';
import { Image } from '../../atoms/Image';

export const DetailedView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const photoQuery = useQuery({
    queryKey: PhotoQueryKey.detailed({ id: id || '' }),
    queryFn: PhotoQueryFn.detailed,
  });

  return (
    <Modal onClose={() => navigate('/')}>
      {photoQuery.isLoading ? <Loader /> : null}
      {photoQuery.isError && 'Error loading photo'}
      {photoQuery.isSuccess ? (
        <>
          <StyledList>
            <StyledItem>
              <i>{photoQuery.data.title ? `"${photoQuery.data.title}"` : 'Untitled'}</i>
            </StyledItem>
            <StyledItem>
              Photographer:{' '}
              <a href={photoQuery.data.authorUrl} target="_blank" rel="noopener noreferrer">
                {photoQuery.data.author}
              </a>
            </StyledItem>
            <StyledItem>
              <a href={photoQuery.data.url} target="_blank" rel="noopener noreferrer">
                Original post on Pexels
              </a>
            </StyledItem>
          </StyledList>
          <Image image={photoQuery.data} />
        </>
      ) : null}
    </Modal>
  );
};
