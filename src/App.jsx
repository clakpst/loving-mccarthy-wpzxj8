import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = new useState(null);

  useEffect(() => {
    if (search === "") {
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
  const { search, updateSearch, error } = useSearch();

  const { movies } = useMovies();

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /*const field = new window.FormData(event.target);
    const query = field.get("query");
    console.log(query);
    setQuery(query);
    /*const inputEl = inputRef.current;
    const value = inputEl.value;*/
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
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
