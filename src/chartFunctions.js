import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const chartsDisplay = document.querySelectorAll(".weather-graph");
const defaultLabels = [
    "00:00",
    "4:00",
    "8:00",
    "12:00",
    "16:00",
    "20:00",
]
const defaultOptions = {
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
            bottom: 10, 
        } 
    }
}; 

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

function showChart(factor) {
    chartsDisplay.forEach((graph) => {
        if (graph.classList.contains(factor)) {
            graph.style.display = "";
        } else {
            graph.style.display = "none";
        }
    })
}

function updateChartsValues(dayData, activeUnit) {
    const unitValue = activeUnit === "F" ? "fahrenheit" : "celsius";
    const tempDataset = [];
    const precDataset = [];
    const windDataset = [];

    for (let i = 0; i <= 20; i += 4) {
        tempDataset.push(dayData.data.hours[i][unitValue]);
        precDataset.push(dayData.data.hours[i].precipitation);
        windDataset.push(dayData.data.hours[i].windSpeed);
    }

    tempChart.data.datasets[0].data = tempDataset;
    precChart.data.datasets[0].data = precDataset;
    windChart.data.datasets[0].data = windDataset;

    tempChart.update();
    precChart.update();
    windChart.update();

}

const tempChart = new Chart(
    document.querySelector(".weather-graph.temp"),
    {
        type: "line",
        options: defaultOptions,       
        data: {
            labels: defaultLabels,
            datasets: [
                {
                    borderColor: "RGB(17, 106, 167)", 
                    borderWidth: 2, 
                    fill: true,
                    backgroundColor: "RGB(17, 106, 167, .5)"
                } 
            ]
        }
    }
);

const precChart = new Chart(
    document.querySelector(".weather-graph.prec"),
    {
        type: "bar",
        options: defaultOptions,       
        data: {
            labels: defaultLabels,
            datasets: [
                {
                    borderColor: "rgb(255,209,26)", 
                    borderWidth: 2, 
                    fill: true,
                    backgroundColor: "RGB(255, 209, 26, .5)"
                } 
            ]
        }
    }
);

const windChart = new Chart(
    document.querySelector(".weather-graph.wind"),
    {
        type: "bar",
        options: defaultOptions,       
        data: {
            labels: defaultLabels,
            datasets: [
                {
                    barPercentage: 1.20, 
                    borderColor: "rgb(255,20,147)", 
                    borderWidth: 2, 
                    fill: true,
                    backgroundColor: "rgb(255,20,147, .5)"
                } 
            ]
        }
    }
);


export {
    showChart,
    updateChartsValues
}
