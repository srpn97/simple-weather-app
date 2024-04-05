## Simple Weather App (Backend)
This repository contains the backend part of the Simple Weather App, a service designed to interface with weather data APIs and serve weather information to the frontend application. It's built with Node.js and Express.

Prerequisites
Before you begin, ensure you have Node.js installed on your system. This project uses npm (Node Package Manager) to manage dependencies.

```
cd simple-weather-app
```

## Project setup

```
npm install
```

## Configuration

Before starting the server, you need to configure environment variable used by the application (API_KEY)

Create a .env file in the root directory and populate it with the necessary values:

```
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

## Running the Server

To start the server locally for development:

```
node app.js
```


