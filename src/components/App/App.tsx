import { useState } from "react";
import "./App.module.css";
import "modern-normalize";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [modalData, setModalData] = useState<Movie | null>(null);
  const handleSearch = async (topic: string) => {
    try {
      setIsErrorMessage(false);
      setIsLoading(true);
      const data = await fetchMovies(topic);
      setMoviesList(data);
      if (data.length === 0) {
        toast("No movies found for your request");
      }
    } catch {
      setIsErrorMessage(true);
      setMoviesList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (data: Movie) => {
    setModalData(data);
  };

  const handleModalClose = () => {
    setModalData(null);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isErrorMessage && <ErrorMessage />}
      {moviesList.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={moviesList} />
      )}
      {modalData && <MovieModal onClose={handleModalClose} movie={modalData} />}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}
