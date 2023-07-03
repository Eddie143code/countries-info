import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Country from "./pages/Country";
import { useState } from "react";
import axios from "axios";

const token = process.env.REACT_APP_TOKEN;

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState();
  const [countryExtra, setCountryExtra] = useState();
  const [loading, setLoading] = useState(false);

  const submitCountry = async (e) => {
    e.preventDefault();
    setCountry("");
    setCountryExtra("");
    //const searchString = search.charAt(0).toUpperCase() + search.slice(1);
    setLoading(true);
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
    setCountry({
      capital: result.data[0].capital,
      pop: result.data[0].population,
      pop_growth: result.data[0].pop_growth,
      fertility: result.data[0].fertility,
      currency: result.data[0].currency.name,
      region: result.data[0].region,
      gdp: result.data[0].gdp,
      gdp_per_capita: result.data[0].gdp_per_capita,
      gdp_growth: result.data[0].gdp_growth,
      unemployment: result.data[0].unemployment,
      life_expectancy_male: result.data[0].life_expectancy_male,
      life_expectancy_female: result.data[0].life_expectancy_female,
    });
    setCountryExtra({
      capital: result.data[0].capital,
      language: res.data[0].languages,
      name: result.data[0].name,
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
            loading={loading}
          />
        }
      />
      <Route
        path="/country/:id"
        element={<Country country={country} countryExtra={countryExtra} />}
      />
    </Routes>
  );
}

export default App;
