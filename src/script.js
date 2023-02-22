import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./style.css";

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
