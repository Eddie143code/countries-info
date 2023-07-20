import { Oval } from "react-loading-icons";

const Home = ({
  search,
  setSearch,
  submitCountry,
  country,
  loading,
  error,
}) => {
  return (
    <section className="flex justify-center items-center h-[100vh] bg-[#C70039]">
      <article className="flex flex-col bg-white w-[90%] max-w-[1000px] rounded-md shadow-2xl">
        <div className="flex flex-col gap-8 min-h-[80vh]">
          <div className=" flex justify-center items-center text-[#C70039] text-2xl font-bold mt-6 md:text-4xl lg:text-5xl">
            <h1>Countries of the world</h1>
          </div>
          <div className="flex justify-center">
            <form onSubmit={submitCountry}>
              <input
                placeholder="Search..."
                className="pl-2 h-[4vh] w-[100%] border border-1 border-black rounded-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          {error && (
            <div className="flex justify-center text-red-600">
              Invalid input. Try again
            </div>
          )}

          {country ? (
            <>
              <div className="flex justify-center">
                <img src={country.flag} alt="flag" />
              </div>
              <div className="flex justify-center text-[#C70039] text-2xl font-bold ">
                <h2 className="w-[200px]">{country.name}</h2>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center font-bold">
                <p className=" bg-[#FFE5B4] w-[200px] rounded-md">
                  Capital: {Object.values(country.capital).join(", ")}
                </p>

                {country.language && typeof country.language === "object" ? (
                  <p className=" bg-[#FFE5B4] w-[200px] rounded-md">
                    Language: {Object.values(country.language).join(", ")}
                  </p>
                ) : (
                  <p className=" bg-[#FFE5B4] w-[200px] rounded-md">
                    Language: {country.language}
                  </p>
                )}
                <p className=" bg-[#FFE5B4] w-[200px] rounded-md">
                  Population: {country.population}
                </p>
                <p className=" bg-[#FFE5B4] w-[200px] rounded-md">
                  Currency: {country.region}
                </p>
              </div>
              <div className="flex justify-center mb-3">
                <a
                  href={country.map}
                  className="p-3 bg-[#FF4177] text-white font-medium rounded-md"
                >
                  See on Google Maps
                </a>
              </div>
            </>
          ) : (
            loading && (
              <div className="flex justify-center">
                <Oval stroke="black" strokeOpacity={0.5} fill="white" />
              </div>
            )
          )}
        </div>
      </article>
    </section>
  );
};

export default Home;
