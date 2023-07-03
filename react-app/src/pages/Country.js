import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Country = ({ country, countryExtra }) => {
  const navigate = useNavigate();
  console.log(country);
  console.log(countryExtra);
  return (
    <section className="flex justify-center items-center h-[100vh] bg-[#C70039]">
      <article className="flex flex-col min-h-[90vh] bg-white w-[90%] max-w-[1000px] rounded-md shadow-2xl">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="m-1 w-[100%]">
            <button
              onClick={() => navigate(`/`)}
              className="p-1 bg-[#FF4177] text-white font-medium rounded-md"
            >
              <BsArrowLeft className="w-8 h-6" />
            </button>
          </div>
          <div className="flex justify-center text-[#C70039] text-4xl font-bold">
            {countryExtra.name}
          </div>
          <div className="flex justify-center">
            <img src={countryExtra.flag} alt="flag" />
          </div>
          {country && countryExtra && (
            <div className="flex flex-wrap gap-10 justify-center items-center max-w-[500px]">
              {Object.entries(country).map(([key, value]) => (
                <p
                  key={key}
                  className="p- bg-[#FFE5B4] w-[200px] rounded-md font-bold"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </p>
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default Country;
