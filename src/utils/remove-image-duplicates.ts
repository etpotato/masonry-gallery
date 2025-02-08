import { ImageData } from '../types/image';

export function removeImageDuplicates(images: ImageData[]) {
  const ids = new Set<string>();

  return images.filter((image) => {
    if (ids.has(image.id)) {
      return false;
    }

    ids.add(image.id);

    return true;
  });
}
