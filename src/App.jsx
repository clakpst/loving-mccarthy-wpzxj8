import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";

function App() {
  const [query, setQuery] = new useState("");
  const [error, setError] = new useState(null);
  const { movies } = useMovies();

  useEffect(() => {
    if (query === "") {
      setError("No se puede buscar una película vacía");
      return;
    }
    if (query.match(/^d+$/)) {
      setError("No se puede buscar una película con un numero");
      return;
    }
    setError(null);
  }, [query]);

  handleChange = (event) => {
    setQuery(event.target.value);
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
            value={query}
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
