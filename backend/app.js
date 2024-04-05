require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');
const Fuse = require('fuse.js');
const cities = require('./cities.json');

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

function getDateFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}


// Fetching and Formatting Data
async function getWeatherData(city) { 
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, { 
            params: {
                q: city,
                units: "imperial",
                appid: process.env.OPENWEATHER_API_KEY
            }
        });

        const responseData = response.data;
        const dailyTemps = responseData.list.reduce((acc, entry) => {
            const dateKey = getDateFromTimestamp(entry.dt);
            const tempMax = entry.main.temp_max;
            const tempMin = entry.main.temp_min;
            const weatherDescription = entry.weather[0].description;
            const weatherIcon = entry.weather[0].icon;

            const existingDateIndex = acc.findIndex(item => item.date === dateKey);

            if (existingDateIndex === -1) {
                acc.push({
                    date: dateKey,
                    maxTemp: tempMax,
                    minTemp: tempMin,
                    description: weatherDescription,
                    icon: weatherIcon
                });
            } else {
                acc[existingDateIndex].maxTemp = Math.max(acc[existingDateIndex].maxTemp, tempMax);
                acc[existingDateIndex].minTemp = Math.min(acc[existingDateIndex].minTemp, tempMin);
            }

            return acc;
        }, []);


        const next5hours = responseData.list.slice(0, 5).map(entry => {
            return {
                time: new Date(entry.dt * 1000).toLocaleTimeString("en-US", {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                temp: entry.main.temp,
                description: entry.weather[0].description,
                icon: entry.weather[0].icon,
                pop: entry.pop,
            };
        });

        this.weatherData = {
            next5hours,
            dailyTemps
        };
        this.showData = true;

        return { dailyTemps, next5hours };

    } catch (error) {
        console.log(error);
        return null;
    }
}

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    let country = ''
    if(req.query.country) {
        country = req.query.country;
    }
    if (!city) {
        return res.status(400).send("City parameter is required");
    }

    let query = '';
    if(country !== '') {
        query = city + ',' + country
    } else {
        query = city
    }

    const result = await getWeatherData(query);
    if (result) {
        res.json(result);
    } else {
        res.status(500).send("Failed to fetch weather data");
    }
});

// Search Code
const fuseOptions = {
    shouldSort: true,
    findAllMatches: false,
    threshold: 0,
    keys: [
        "city_name"
    ]
};

const fuse = new Fuse(cities, fuseOptions);

app.get('/search', async (req, res) => {
    const q = req.query.q;
    let results = await fuse.search(q);
    res.json(results);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
