import { Images, OnImageClick } from "../../types";
import s from "./ImageCard.module.css";

export interface ImageCardProps {
  image: Images;
  onImageClick: OnImageClick;
}

export default function ImageCard({ image, onImageClick }: ImageCardProps) {
  return (
    <div onClick={() => onImageClick(image)}>
      <img
        className={s.card}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}
