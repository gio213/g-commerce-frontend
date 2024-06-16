type Props = {
  src: string[];
};

const ImagePreview = ({ src }: Props) => {
  return (
    <div className="grid w-full grid-cols-4 gap-2 ">
      {src.map((image, index) => (
        <img key={index} src={image} alt="preview" width={200} height={200} />
      ))}
    </div>
  );
};

export default ImagePreview;
