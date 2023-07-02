import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Country from "./pages/Country";
import canada from "./assets/canada.svg";
import { useState } from "react";
import axios from "axios";

const token = process.env.REACT_APP_TOKEN;

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState();
  const [countryExtra, setCountryExtra] = useState();

  const submitCountry = async (e) => {
    e.preventDefault();
    //const searchString = search.charAt(0).toUpperCase() + search.slice(1);
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${search}`
    );
    const result = await axios.get(
      `https://api.api-ninjas.com/v1/country?name=${search}`,
      {
        headers: {
          "X-Api-Key": token,
        },
      }
    );
    setCountry(result.data[0]);
    setCountryExtra({
      flag: res.data[0].flags.png,
      map: res.data[0].maps.googleMaps,
    });
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
            countryExtra={countryExtra}
          />
        }
      />
      <Route path="/country/:id" element={<Country />} />
    </Routes>
  );
}

export default App;
