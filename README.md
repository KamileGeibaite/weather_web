Weather Forecast App

This is a simple weather forecast application.

Frontend is made with React and Tailwind CSS. Backend is made with Node.js and Express.

The app lets user select a city and see current weather and 5 days forecast. When city is selected, backend logs this action into console and saves it into PostgreSQL database.

Used technologies

Frontend:
- React
- Vite
- Tailwind CSS
- Axios
- localStorage

Backend:
- Node.js
- Express
- CORS
- dotenv
- PostgreSQL
- Docker Compose

Weather API:
- Open-Meteo
- https://open-meteo.com/

What app does

- User can search city
- User can select city from dropdown
- Page shows current weather
- Page shows 5 days forecast
- Browser saves mostly viewed cities
- Page shows 3 mostly viewed cities
- Backend logs selected city into console
- Backend saves selected city into database

Project folders

```txt
back   - backend application
front  - frontend application
```

How to start project with Docker

Open project folder:

```bash
cd "wheather app"
```

Start everything:

```bash
docker compose up --build
```

This starts:
- frontend
- backend
- PostgreSQL
- pgAdmin

Frontend runs here:

```txt
http://localhost:5173
```

Backend runs here:

```txt
http://localhost:3000
```

pgAdmin runs here:

```txt
http://localhost:5052
```

To stop containers:

```bash
docker compose down
```

Backend routes

Check if backend works:

```txt
GET /api/v1/health
```

Save selected city:

```txt
POST /api/v1/logs/city
```

Example body:

```json
{
  "city": "Vilnius"
}
```

Get saved city logs:

```txt
GET /api/v1/logs
```

pgAdmin

Login:

```txt
Email: admin@admin.com
Password: admin
```

Add server:

```txt
Name: weather_app
Host: postgres
Port: 5432
Database: weather_app
Username: postgres
Password: postgres
```

Table name:

```txt
city_logs
```

Bruno

Bruno requests are in:

```txt
back/bruno
```

I used Bruno to test backend routes.

How it works

Cities are saved in frontend with their coordinates. Open-Meteo API needs latitude and longitude, so selected city coordinates are sent to API.

Weather data is received from Open-Meteo and shown in the page.

Mostly viewed cities are saved in browser localStorage.

When user selects city, frontend sends POST request to backend. Backend logs selected city and saves it into database.

