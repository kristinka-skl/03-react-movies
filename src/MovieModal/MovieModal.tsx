import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../types/movie";
import { useEffect } from "react";
interface MovieModalProp {
  data: Movie;
  onClose: () => void;
}
export default function MovieModal({ data, onClose }: MovieModalProp) {
  const onBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return createPortal(
    <div
      className={css.backdrop}
      onClick={onBackDropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {data.poster_path ? (
          <img
            className={css.image}
            src={
              data.backdrop_path
                ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
            }
            alt={data.title}
          />
        ) : (
          <span className={css.noimage}>No image</span>
        )}

        <div className={css.content}>
          <h2>{data.title}</h2>
          <p>{data.overview}</p>
          <p>
            <strong>Release Date:</strong> {data.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {data.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
