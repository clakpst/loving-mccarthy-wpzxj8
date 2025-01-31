import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";

function App() {
  const [users, setUsers] = new useState();
  const [query, setQuery] = new useState("");
  const [error, setError] = new useState(null);
  const { movies } = useMovies();
  const inputRef = useRef();

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (query === "") {
      setError("No se puede buscar una película vacía");
      return;
    }
    if (query.match(/^d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }
    setError(null);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const field = new window.FormData(event.target);
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
            ref={inputRef}
            name="query"
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
