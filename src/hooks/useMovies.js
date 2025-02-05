import { searchMovies } from "../services/movies";
import { useState , useEffect} from "react";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const newMovies = await searchMovies({ search });
    setMovies(newMovies);
  };

  useEffect(()=>{
    getMovies()
  },[search]) 

  return { movies, getMovies };
}
