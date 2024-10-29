import Modal from "react-modal";
import { Image } from "../../types";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div>
        <img
          className={s.modalImg}
          src={image.urls.regular}
          alt={image.alt_description}
        />
      </div>
    </Modal>
  );
}
