Weather Forecast Web

Frontend is made with React and Tailwind CSS. Backend is made with Node.js and Express.

The app lets user select a city and see current weather and 5 days forecast. When city is selected, backend logs this action into console and saves it into PostgreSQL database.

Used technologies

Frontend:
React, Vite, Tailwind CSS, Axios, localStorage.

Backend:
Node.js, Express, CORS, dotenv, PostgreSQL, Docker Compose

Weather API: https://open-meteo.com/

What app does

User can search city
User can select city from dropdown
Page shows current weather
Page shows 5 days forecast
Browser saves mostly viewed cities
Page shows 3 mostly viewed cities
Backend logs selected city into console
Backend saves selected city into database

Project folders

back   - backend application
front  - frontend application


How to start project with Docker
Open project folder:

Start everything:

docker compose up --build

it starts:
frontend
backend
PostgreSQL
pgAdmin

Frontend runs here:
http://localhost:5173


Backend runs here:
http://localhost:3000


pgAdmin runs here:
http://localhost:5052


To stop containers:
docker compose down


Add server:

Name: weather_app
Host: postgres
Port: 5432
Database: weather_app
Username: postgres
Password: postgres


Table name:
city_logs


I used Bruno to test backend routes.

How it works

Cities are saved in frontend with their coordinates. Open-Meteo API needs latitude and longitude, so selected city coordinates are sent to API.

Weather data is received from Open-Meteo and shown in the page.

Mostly viewed cities are saved in browser localStorage.

When user select city, frontend sends POST request to backend. Backend logs selected city and saves it into database.

