import * as utilsFncs from "./utils";

export {
    getFormatedDataFrom, 
    getDayWeather,
    getHourWeather, 
    getIconFrom,
};

// That is NOT goog practice, but I will leave it like this for now

const apiKey = "f0a12d7e0fab4ba8a9294419252801";
const baseUrl = 
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=`;



async function getWeatherData(location) {
    try {
        const request = await fetch(`${baseUrl}${location}&days=8`, {
            mode: "cors"
        });
        return await request.json();
    } catch (err) {
        return false;
    }

}

async function getFormatedDataFrom(location) {
    try {
        let formated = {
            location: "",
            days: [], 
            activeDay: 0, 
            activeUnit: document
                .querySelector(".active")
                .textContent
                .charAt(1),
        }

        const apiData = await getWeatherData(location);
        console.log(apiData);

        if (apiData.error || !apiData) return false;

        const forecastData = apiData.forecast.forecastday;

        formated.location = apiData.location.name;
        forecastData.forEach((day) => {
            const dayObject = {
                avgTempC: day.day.avgtemp_c,
                avgTempF: day.day.avgtemp_f,
                avgHumidity: day.day.avghumidity,
                maxWind: day.day.maxwind_kph, 
                precipitationChances: day.day.daily_chance_of_rain, 
                code: day.day.condition.code, 
                conditionText: day.day.condition.text, 
                iconUrl: getIconFrom(day.day.condition.code),
                day: new Date(day.date).toLocaleString("en-EN", {weekday: "long"}),
                data: {
                    max: {
                        fahrenheit: day.day.maxtemp_f,
                        celsius: day.day.maxtemp_c
                    }, 
                    min: {
                        fahrenheit: day.day.mintemp_f,
                        celsius: day.day.mintemp_c
                    },
                    hours: []
                }
            }; 

            day.hour.forEach((hour) => {
                const hourObject = {
                    hourTime: hour.time.split(" ")[1], 
                    celsius: hour.temp_c,
                    fahrenheit: hour.temp_f,
                    precipitation: hour.chance_of_rain,
                    windSpeed: hour.wind_kph,
                    humidity: hour.humidity, 
                    condition: hour.condition.text,
                    code: hour.condition.code
                } 

                dayObject.data.hours.push(hourObject);
            });

            formated.days.push(dayObject);
        });
        
        formated = utilsFncs.applyFnToNum(formated, Math.floor);
        return formated;   

    } catch(err) {
        console.log(err);
    }
}

function getDayWeather(formatedData, dayNumber) {
    return formatedData.days[dayNumber - 1];
}

function getHourWeather(formatedData, dayNumber, hourNumber) {
    const dayData = getDayWeather(formatedData, dayNumber);
    return dayData.data.hours[hourNumber - 1]
}

function getIconFrom(code) {
    const correspondances = {
        1009: "./assets/cloudy.png",
        1240: "./assets/cloudy_rainy.png",
        1255: "./assets/cloudy_snowy.png",
        1003: "./assets/cloudy_sunny.png",
        1006: "./assets/cloudy_sunny_calm.png",
        1000: "./assets/sunny.png",
        1030: "./assets/foggy.png",
        1063: "./assets/image5x2.png",
        1066: "./assets/lot_cloudy_snowy.png",
        1069: "./assets/lot_cloudy_snowy.png",
        1072: "./assets/foggy_snowy.png",
        1087: "./assets/rainy_thunder.png",
        1114: "./assets/image5x3.png",
        1117: "./assets/foggy_snowy.png",
        1135: "./assets/foggy.png",
        1147: "./assets/foggy_snowy.png",
        1150: "./assets/foggy_snowy.png",
        1168: "./assets/foggy_snowy.png",
        1171: "./assets/foggy_snowy.png",
        1180: "./assets/image5x2.png",
        1183: "./assets/little_rainy.png",
        1186: "./assets/image5x2.png",
        1189: "./assets/image5x2.png",
        1192: "./assets/rainy.png",
        1195: "./assets/rainy.png",
        1198: "./assets/little_rainy.png",
        1201: "./assets/sametime_snowy_rainy.png", 
        1204: "./assets/sametime_snowy_rainy.png", 
        1210: "./assets/sametime_snowy_rainy.png", 
        1213: "./assets/image5x3.png",
        1216: "./assets/image5x3.png",
        1219: "./assets/image5x3.png",
        1222: "./assets/lot_snowy.png",
        1225: "./assets/lot_snowy.png",
        1237: "./assets/lot_snowy.png",
        1240: "./assets/little_rainy.png",
        1243: "./assets/image5x2.png",
        1246: "./assets/cloudy_rainy.png",
        1249: "./assets/little_rainy.png",
        1252: "./assets/rainy.png",
        1255: "./assets/snowy_sunny.png",
        1258: "./assets/lot_cloudy_snowy.png",
        1261: "./assets/image5x3.png",
        1264: "./assets/lot_cloudy_snowy.png",
        1273: "./assets/rainy_thunder.png",
        1276: "./assets/rainy_thunder.png",
        1279: "./assets/rainy_thunder.png",
        1282: "./assets/rainy_thunder.png",
    };

    return correspondances[code];
}
