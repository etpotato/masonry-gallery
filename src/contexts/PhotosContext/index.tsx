import { createContext, useContext, useState } from 'react';
import { FCWithChildren } from '../../types/react';

type PhotosContextValue = {
  photos: ImageData[];
  setPhotos: (photos: ImageData[]) => void;
};

const PhotosContext = createContext<PhotosContextValue | null>(null);

export const PhotosProvider: FCWithChildren = ({ children }) => {
  const [photos, setPhotos] = useState<ImageData[]>([]);

  function setData(photos: ImageData[]) {
    setPhotos(photos);
  }

  return (
    <PhotosContext.Provider value={{ photos, setPhotos: setData }}>
      {children}
    </PhotosContext.Provider>
  );
};

export const usePhotos = (): PhotosContextValue => {
  const photosContext = useContext(PhotosContext);

  if (photosContext === null) {
    throw new Error('The usePhotos hook must be used within the PhotosContext provider');
  }

  return photosContext;
};
