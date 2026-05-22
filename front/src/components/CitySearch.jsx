import { useMemo, useState } from "react";

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

function CitySearch({ cities, onSelectCity }) {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCities = useMemo(() => {
    if (!search.trim()) return [];

    return cities
      .filter((city) =>
        normalizeText(city.name).includes(normalizeText(search))
      )
      .slice(0, 5);
  }, [cities, search]);

  const handleSelectCity = (city) => {
    onSelectCity(city);
    setSearch(city.name);
    setShowSuggestions(false);
  };

  return (
    <div>
      <label htmlFor="city-search" className="mb-2 block font-semibold text-slate-800">
        Select city
      </label>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="relative">
          <input
            id="city-search"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search city..."
            className="w-full rounded-md border border-sky-200 bg-sky-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          {showSuggestions && search && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-md border border-sky-100 bg-white shadow-md">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="block w-full px-4 py-3 text-left text-slate-700 hover:bg-sky-50"
                  >
                    {city.name}
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-slate-500">
                  No cities found
                </p>
              )}
            </div>
          )}
        </div>

        <select
          value=""
          onChange={(event) => {
            const city = cities.find((item) => item.name === event.target.value);
            if (city) handleSelectCity(city);
          }}
          className="rounded-md border border-sky-200 bg-white px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        >
          <option value="" disabled>
            Choose city
          </option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CitySearch;
