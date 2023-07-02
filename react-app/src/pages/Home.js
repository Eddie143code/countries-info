const Home = ({ search, setSearch, submitCountry, country, countryExtra }) => {
  console.log(country);
  console.log(countryExtra);
  return (
    <section className="flex justify-center items-center h-[100vh] bg-[#C70039]">
      <article className="flex flex-col gap-10 min-h-[90vh] bg-white w-[90%]">
        <div className=" flex justify-center items-center text-[#C70039] text-2xl font-bold mt-6">
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
        {country && countryExtra && (
          <>
            <div className="flex justify-center">
              <img src={countryExtra.flag} alt="flag" />
            </div>
            <div className="flex justify-center text-[#C70039] text-2xl font-bold">
              <h2>{country.name}</h2>
            </div>
          </>
        )}
      </article>
    </section>
  );
};

export default Home;
