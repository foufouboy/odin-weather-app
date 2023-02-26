import * as utilsFncs from "./utils";

export {
    getFormatedDataFrom, 
    getDayWeather,
    getHourWeather, 
    getIconFrom,
};

const apiKey = "f2bc89ce91054760857142356232302";
const baseUrl = 
    `https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=`;



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
        1009: "../dist/assets/cloudy.png",
        1240: "../dist/assets/cloudy_rainy.png",
        1255: "../dist/assets/cloudy_snowy.png",
        1003: "../dist/assets/cloudy_sunny.png",
        1006: "../dist/assets/cloudy_sunny_calm.png",
        1000: "../dist/assets/sunny.png",
        1030: "../dist/assets/foggy.png",
        1063: "../dist/assets/image5x2.png",
        1066: "../dist/assets/lot_cloudy_snowy.png",
        1069: "../dist/assets/lot_cloudy_snowy.png",
        1072: "../dist/assets/foggy_snowy.png",
        1087: "../dist/assets/rainy_thunder.png",
        1114: "../dist/assets/image5x3.png",
        1117: "../dist/assets/foggy_snowy.png",
        1135: "../dist/assets/foggy.png",
        1147: "../dist/assets/foggy_snowy.png",
        1150: "../dist/assets/foggy_snowy.png",
        1168: "../dist/assets/foggy_snowy.png",
        1171: "../dist/assets/foggy_snowy.png",
        1180: "../dist/assets/image5x2.png",
        1183: "../dist/assets/little_rainy.png",
        1186: "../dist/assets/image5x2.png",
        1189: "../dist/assets/image5x2.png",
        1192: "../dist/assets/rainy.png",
        1195: "../dist/assets/rainy.png",
        1198: "../dist/assets/little_rainy.png",
        1201: "../dist/assets/sametime_snowy_rainy.png", 
        1204: "../dist/assets/sametime_snowy_rainy.png", 
        1210: "../dist/assets/sametime_snowy_rainy.png", 
        1213: "../dist/assets/image5x3.png",
        1216: "../dist/assets/image5x3.png",
        1219: "../dist/assets/image5x3.png",
        1222: "../dist/assets/lot_snowy.png",
        1225: "../dist/assets/lot_snowy.png",
        1237: "../dist/assets/lot_snowy.png",
        1240: "../dist/assets/little_rainy.png",
        1243: "../dist/assets/image5x2.png",
        1246: "../dist/assets/cloudy_rainy.png",
        1249: "../dist/assets/little_rainy.png",
        1252: "../dist/assets/rainy.png",
        1255: "../dist/assets/snowy_sunny.png",
        1258: "../dist/assets/lot_cloudy_snowy.png",
        1261: "../dist/assets/image5x3.png",
        1264: "../dist/assets/lot_cloudy_snowy.png",
        1273: "../dist/assets/rainy_thunder.png",
        1276: "../dist/assets/rainy_thunder.png",
        1279: "../dist/assets/rainy_thunder.png",
        1282: "../dist/assets/rainy_thunder.png",
    };

    return correspondances[code];
}
