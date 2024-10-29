import { Image, OnImageClick } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

export interface ImageGalleryProps {
  images: Image[];
  onImageClick: OnImageClick;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={s.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
