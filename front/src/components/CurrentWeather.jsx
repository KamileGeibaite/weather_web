import { getWeatherDescription } from "../utils/weatherCodes";

function CurrentWeather({ city, current }) {
  return (
    <section className="rounded-lg bg-sky-700 p-5 text-white shadow-sm">
      <p className="text-sm font-semibold uppercase text-sky-100">Current</p>
      <h2 className="mt-1 text-2xl font-bold">{city.name}</h2>
      <p className="mt-1 text-sky-100">
        {getWeatherDescription(current.weather_code)}
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-[1fr_2fr] md:items-end">
        <div className="text-6xl font-bold">
          {Math.round(current.temperature_2m)}°C
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <WeatherDetail label="Feels like" value={`${Math.round(current.apparent_temperature)}°C`} />
          <WeatherDetail label="Humidity" value={`${current.relative_humidity_2m}%`} />
          <WeatherDetail label="Wind speed" value={`${current.wind_speed_10m} km/h`} />
        </div>
      </div>
    </section>
  );
}

function WeatherDetail({ label, value }) {
  return (
    <div className="rounded-md bg-white/15 p-3">
      <p className="text-sm text-sky-100">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

export default CurrentWeather;
