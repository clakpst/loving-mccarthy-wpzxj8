import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = new useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "" && !isFirstInput.current) {
      setError("No se puede buscar una película vacía");
      return;
    }
    if (search.match(/^d+$/)) {
      setError("No se puede buscar una película con un numero");
      return;
    }
    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [query, setQuery] = new useState("");
  const [sort, setSort] = new useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
    /*const field = new window.FormData(event.target);
    const query = field.get("query");
    console.log(query);
    setQuery(query);
    /*const inputEl = inputRef.current;
    const value = inputEl.value;*/
  };

  const handleSort = () => {
    setSort(!sort);
  };
  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            onChange={handleChange}
            value={search}
            placeholder="Avengers,Star Wars, The Matrix ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{loading ? <p>cargando</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
