function PopularCities({ popularCities, cities, onSelectCity }) {
  if (popularCities.length === 0) {
    return (
      <p className="mt-4 text-sm text-slate-500">
        Mostly viewed cities will appear here.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="mb-2 text-sm font-semibold text-slate-700">
        Mostly viewed cities
      </h2>
      <div className="flex flex-wrap gap-2">
        {popularCities.map((item) => {
          const city = cities.find((cityItem) => cityItem.name === item.name);

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => city && onSelectCity(city)}
              className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              {item.name} ({item.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PopularCities;
