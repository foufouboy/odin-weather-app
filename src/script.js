import * as apiFncs from "./apiFunctions";
import * as domFncs from "./domFunctions";

import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./style.css";

// Interaction elements

const unitSwitcher = document.querySelector(".unit");
const graphOptions = document.querySelectorAll(".option");
const daysCards = document.querySelectorAll(".weather-card");
const searchInput = document.querySelector("input");
const searchButton = window.getComputedStyle(
    document.querySelector(".search-container"), "::after"
);
console.log(searchButton);

unitSwitcher.addEventListener("click", _ => {
    // switch all degrees to other unit
    // and change the active one
})

graphOptions.forEach(option => {
    option.addEventListener("click", _ => {
        // show graph of option for this and the four next hours
        // and change the active one
    });
});

daysCards.forEach(card => {
    card.addEventListener("click", _ => {
        // change the WHOLE page to fit the actual day        
        // so yeah quite tiresome
    });
});

searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && searchInput.value) console.log(searchInput.value);
    // verifying the input is not sh*tty, 
    // make the api call for the city given,
    // change the UI data for it
});

searchButton.addEventListener("click", _ => {
    if (searchInput.value) console.log(searchInput.value);
})

const data = [
    {day: "Monday", temp: 11},
    {day: "Tuesday", temp: 12},
    {day: "Wednesday", temp: 13},
    {day: "Thursday", temp: 11},
    {day: "Friday", temp: 13},
    {day: "Saturday", temp: 10},
];

Chart.register(ChartDataLabels);
Chart.defaults.set("plugins.datalabels", {
    color: "white",
    padding: {
        bottom: 30,
    },
    font: {
        size: 11, 
        lineHeight: 1.6
    }, 
    formatter: value => value + "\n"
});

const sampleChart = new Chart(
    document.querySelector("canvas"),
    {
        type: "line",
        options: {
            responsive: true, 
            maintainAspectRatio: false, 
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true, 
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }
            }, 
            elements: {
                point: {
                    radius: 0
                }
            }, 
            plugins: {
                legend: {
                    display: false
                },
            },
            layout: {
                padding: {
                    top: 20,
                    bottom: 10
                } 
            }
        }, 
        data: {
            labels: data.map(row => row.day),
            datasets: [
                {
                    data: data.map(row => row.temp), 
                    borderColor: "RGB(17, 106, 167)", 
                    borderWidth: 2, 
                    fill: true,
                    backgroundColor: "RGB(17, 106, 167, .5)"
                } 
            ]
        }
    }
);

// Sample API request :
// const c = `${apiFncs.baseUrl}${apiFncs.options}`;
// console.log(c)
// apiFncs
//     .getFormatedData(c)
//     .then((data) => {
//         console.log(data);
//         console.log(apiFncs.getHourWeather(data, 2, 11));
//     })
//     .catch((err) => {
//         console.log(err);
//     }) ;
