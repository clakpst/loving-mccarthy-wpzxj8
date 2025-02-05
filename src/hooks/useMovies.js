import { searchMovies } from "../services/movies";
import { useState, useEffect } from "react";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 const getMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      
      setError(e.message)
    } finally {
      setLoading(false)
    }
  } 
  
  useEffect(() => {
    getMovies()
  }, [search]);

  return { movies, getMovies, loading };
}
