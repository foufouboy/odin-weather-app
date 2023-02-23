export {
    getFormatedData, 
    getDayWeather,
    getHourWeather, 
    baseUrl,
    options,

};

const apiKey = "f2bc89ce91054760857142356232302";
const baseUrl = 
    `https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;
const options = `&q=Paris&days=8`;

async function getWeatherData(url) {
    const request = await fetch(url, {
        method: "GET", 
        mode: "cors"
    });
    return await request.json();
}

async function getFormatedData(url) {
    try {
        const formated = {
            location: "", 
            days: []
        }

        const apiData = await getWeatherData(url);
        console.log(apiData);
        const forecastData = apiData.forecast.forecastday;

        formated.location = apiData.location.name;
        forecastData.forEach((day) => {
            const dayObject = {
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
