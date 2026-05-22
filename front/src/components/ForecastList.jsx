import { getWeatherDescription } from "../utils/weatherCodes";

function ForecastList({ city, daily }) {
  const days = daily.time.map((date, index) => ({
    date,
    code: daily.weather_code[index],
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
    rain: daily.precipitation_sum[index],
    wind: daily.wind_speed_10m_max[index],
  }));

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase text-sky-700">Forecast</p>
          <h2 className="text-2xl font-bold text-slate-900">Next 5 days</h2>
          <p className="mt-1 text-sm text-slate-500">{city.name}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {days.map((day) => (
          <article
            key={day.date}
            className="rounded-md border border-sky-100 bg-sky-50 p-4"
          >
            <p className="font-semibold text-slate-900">
              {new Date(day.date).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}
            </p>
            <p className="mt-2 min-h-10 text-sm text-slate-600">
              {getWeatherDescription(day.code)}
            </p>
            <p className="mt-4 text-lg font-bold text-slate-900">
              {Math.round(day.max)}° / {Math.round(day.min)}°
            </p>
            <p className="mt-2 text-sm text-slate-500">Rain: {day.rain} mm</p>
            <p className="text-sm text-slate-500">Wind: {day.wind} km/h</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ForecastList;
