export type ImageIntrinsicSize = {
  width: number;
  height: number;
};

export type ImageData = ImageIntrinsicSize & {
  id: string;
  src: {
    original: string;
    md: string;
    lg: string;
  };
  title: string;
  author: string;
  authorUrl: string;
  background?: string;
};
