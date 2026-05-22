import { useEffect, useState } from "react";
import axios from "axios";
import CitySearch from "./components/CitySearch";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import PopularCities from "./components/PopularCities";
import { cities } from "./utils/cities";
import { getTopCities, saveCityView } from "./utils/cityViews";

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const BACKEND_API = "http://localhost:3000/api/v1/logs/city";

function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weather, setWeather] = useState(null);
  const [popularCities, setPopularCities] = useState(getTopCities());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(WEATHER_API, {
        params: {
          latitude: city.latitude,
          longitude: city.longitude,
          current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "weather_code",
            "wind_speed_10m",
          ].join(","),
          daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "wind_speed_10m_max",
          ].join(","),
          forecast_days: 5,
          timezone: "auto",
        },
      });

      setWeather(response.data);
    } catch {
      setError("Weather forecast could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  };

  const logCitySelection = async (cityName) => {
    try {
      await axios.post(BACKEND_API, { city: cityName });
    } catch {
      console.log("City log request failed");
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    saveCityView(city.name);
    setPopularCities(getTopCities());
    logCitySelection(city.name);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase text-sky-700">
            Weather forecast
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Check weather by city
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Select a Lithuanian city and see current conditions with a 5 day forecast.
          </p>
        </header>

        <section className="mb-5 rounded-lg border border-sky-100 bg-white p-5 shadow-sm">
          <CitySearch cities={cities} onSelectCity={handleCitySelect} />
          <PopularCities
            popularCities={popularCities}
            cities={cities}
            onSelectCity={handleCitySelect}
          />
        </section>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">
            Loading weather data...
          </div>
        ) : (
          weather && (
            <div className="grid gap-5">
              <CurrentWeather city={selectedCity} current={weather.current} />
              <ForecastList city={selectedCity} daily={weather.daily} />
            </div>
          )
        )}
      </div>
    </main>
  );
}

export default App;
