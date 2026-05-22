const STORAGE_KEY = "weatherCityViews";

export const getCityViews = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return {};

  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
};

export const saveCityView = (cityName) => {
  const cityViews = getCityViews();
  cityViews[cityName] = (cityViews[cityName] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cityViews));
};

export const getTopCities = () => {
  return Object.entries(getCityViews())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
};
