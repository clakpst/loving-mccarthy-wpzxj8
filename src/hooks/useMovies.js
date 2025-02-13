import { searchMovies } from "../services/movies";
import { useState, useEffect, useRef } from "react";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);
  const getMovies = async () => {
    if (search === previusSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const sortedMovies = sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies;

  useEffect(() => {
    getMovies();
  }, [search]);

  return { movies: sortedMovies, getMovies, loading };
}
