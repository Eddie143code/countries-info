import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitCountry = async (e) => {
    e.preventDefault();
    setCountry("");
    setError(false);

    setLoading(true);
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${search}`
      );

      setCountry({
        capital: res.data[0].capital,
        language: res.data[0].languages,
        population: res.data[0].population,
        name: res.data[0].name.common,
        region: res.data[0].region,
        flag: res.data[0].flags.png,
        map: res.data[0].maps.googleMaps,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            search={search}
            setSearch={setSearch}
            submitCountry={submitCountry}
            country={country}
            loading={loading}
            error={error}
          />
        }
      />
    </Routes>
  );
}

export default App;
