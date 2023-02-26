import * as apiFncs from "./apiFunctions";
import * as domFncs from "./domFunctions";
import "./style.css";

// Interactive elements

const unitSwitcher = document.querySelector(".unit");
const graphOptions = document.querySelectorAll(".option");
const daysCards = document.querySelectorAll(".weather-card");
const searchInput = document.querySelector("input");
const searchButton = document.querySelector(".search-button");

// Initial request 

(async function() {

    let data = await apiFncs.getFormatedDataFrom("Paris")
    domFncs.updateLocation(data);

    unitSwitcher.addEventListener("click", _ => {
        domFncs.updateUnit(data);  
    });

    graphOptions.forEach(option => {
        option.addEventListener("click", e => {
            const type = option.classList[1];
            domFncs.updateChart(type, e.target);
        });
    });

    daysCards.forEach((card, index) => {
        card.addEventListener("click", _ => {
            data.activeDay = index;
            domFncs.updateDay(data, index + 1);
        });
    });

    searchInput.addEventListener("keydown", async e => {
        if (e.key === "Enter" && searchInput.value) {

            data = await apiFncs.getFormatedDataFrom(searchInput.value);

            if (!data) {
                domFncs.displayError();
                return;
            }

            if (document.querySelector(".error-text"))
                domFncs.hideError();

            domFncs.updateLocation(data);
        }
    });

    searchButton.addEventListener("click", async _ => {
        if (searchInput.value) {
            data = await apiFncs.getFormatedDataFrom(searchInput.value);

            if (!data) {
                domFncs.displayError();
                return;
            }

            if (document.querySelector(".error-text"))
                domFncs.hideError();

            domFncs.updateLocation(data);
        }
    });
})();

