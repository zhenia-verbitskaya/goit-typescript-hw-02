import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <button type="button" className={s.loadBtn} onClick={onClick}>
      Load more
    </button>
  );
}
