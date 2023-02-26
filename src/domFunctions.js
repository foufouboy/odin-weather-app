import * as chartFcns from "./chartFunctions";

// Qu'est-ce qu'on doit faire comme modifications sur le visuel :
//  - changerJour (lorsqu'on a déjà les données)
//  - changerUnité
//  - changerGraphe
//  - changerLieu

const cardsTemps = document.querySelectorAll(".weather-card");

const updateUnit = (function (){
    function updateUnit(data) {
        const activeUnit = data.activeUnit;
        const activeDay = data.activeDay;

        updateCardsValues(data, activeUnit);
        updateActive(activeUnit);
        updateDayValue(data, activeUnit);

        activeUnit === "F" ? 
            data.activeUnit = "C" : data.activeUnit = "F";

        chartFcns.updateChartsValues(data.days[activeDay], data.activeUnit);
    }

    function updateActive(active) {

        document.querySelector(".active").classList.remove("active");

        if (active === "F") {
            document
                .querySelector(".unit .celsius")
                .classList.add("active");
        } else {
            document
                .querySelector(".unit .fahreneit")
                .classList.add("active");
        }
    }

    function updateCardsValues(data, active) {
        
        cardsTemps.forEach((card, index) => {
            const cardData = data.days[index].data;
            const temps = card.querySelectorAll(".temp");

            if (active === "F") {
                temps.forEach((temp, index) => {
                    if (index === 1) {
                        temp.textContent = cardData.min.celsius;
                    } else {
                        temp.textContent = cardData.max.celsius;
                    }
                });
            } else {
                temps.forEach((temp, index) => {
                    if (index === 1) {
                        temp.textContent = cardData.min.fahrenheit;
                    } else {
                        temp.textContent = cardData.max.fahrenheit;
                    }
                });
            }
        });     

    }

    function updateDayValue(data, active) {
        const dayValue = document.querySelector(".weather-degrees .degrees");
        const activeDay = data.activeDay;
        const dayData = data.days[activeDay];

        if (active === "F") {
            dayValue.textContent = dayData.avgTempC;
        } else {
            dayValue.textContent = dayData.avgTempF;
        }
    }

    return updateUnit;
})();

const updateDay = (function() {
    function updateDay(data, dayNumber) {
        // updateResume
        // updateCard
        // updateChartValues (plus tard)

        updateResume(data, dayNumber);
        updateCard(dayNumber);
        chartFcns.updateChartsValues(data.days[dayNumber - 1], data.activeUnit);
    }

    function updateResume(data, dayNumber) {
        const dayData = data.days[dayNumber - 1];
        const unitValue = data.activeUnit;
        const resumeIcon = document
            .querySelector(".weather-icon img");
        const resumeTemp = document
            .querySelector(".weather-degrees .degrees");
        const resumeDetails = document
            .querySelectorAll(".weather-data span");
        const resumeDay = document
            .querySelector(".weather-time-day");
        const resumeText = document
            .querySelector(".weather-text-resume");
        const resumeLocation = document
            .querySelector(".location-name .location");

        resumeLocation.textContent = data.location;
        resumeIcon.src = dayData.iconUrl;
        resumeTemp.textContent = dayData["avgTemp" + unitValue];
        resumeDay.textContent = dayData.day;
        resumeText.textContent = dayData.conditionText;
        resumeDetails.forEach((detail, index) => {
            switch(index) {
                case 0: 
                    detail.textContent = dayData.precipitationChances + "%";
                    break;

                case 1: 
                    detail.textContent = dayData.avgHumidity + "%";
                    break;

                case 2: 
                    detail.textContent = dayData.maxWind + "kph";
                    break;

                default:
                    console.log("error");
                    break;
            }
        });
    }

    function updateCard(dayNumber) {
        document
            .querySelector(".active-card")
            .classList.remove("active-card");

        cardsTemps[dayNumber - 1].classList.add("active-card");
    }

    return updateDay;
})();

const updateLocation = (function() {

    function updateLocation(data) {
        // mettre à jour jour

        updateCardsValues(data);
        updateDay(data, 1);
        chartFcns.showChart("temp");
    }

    function updateCardsValues(data) {
        cardsTemps.forEach((card, index) => {
            const dayData = data.days[index];
            const cardIcon = card.querySelector(".icon img");
            const cardDay = card.querySelector(".day");
            const cardTemps = card.querySelectorAll(".temps .temp");
            const unitValue = data.activeUnit === "F" ?
                "fahrenheit" : "celsius";

            cardIcon.src = dayData.iconUrl;
            cardDay.textContent = dayData.day.slice(0, 3);
            cardTemps.forEach((temp, index) => {

                if (index === 1) {
                    temp.textContent = dayData.data.min[unitValue]; 
                } else {
                    temp.textContent = dayData.data.max[unitValue]; 
                }
            });
        });
    }
    
    return updateLocation;
})();

function updateChart(type, elementClicked) {
    chartFcns.showChart(type);

    document
        .querySelector(".active-graph")
        .classList.remove("active-graph");

    elementClicked.classList.add("active-graph");

}

function displayError() {
    document
        .querySelector(".error-text")
        .textContent = "Your input is either not a good city name either not well formated!"
}

function hideError() {
    document
        .querySelector(".error-text")
        .textContent = ""
}


export {
    updateUnit,
    updateLocation,
    updateDay, 
    updateChart,
    displayError,
    hideError
};
