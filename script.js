// const { Await } = require("react-router-dom");

const apikey = "600365a07f5a3696bf7e7f724d75f13d";

const weatherDataElement = document.getElementById("weather-data");

const cityInputElement = document.getElementById("city-input");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	const cityValue = cityInputElement.value;
	getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
	try {
		const responce = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
		);

		if (!responce.ok) {
			throw new Error("Network Responce Was Not Ok");
		}
		const data = await responce.json();
		const temperature = Math.round(data.main.temp);
		const description = data.weather[0].description;
		const icon = data.weather[0].icon;
		const details = [
			`Feels Like: ${Math.round(data.main.feels_like)}`,
			`Humidty: ${data.main.humidity}%`,
			`Wind Speed: ${data.wind.speed} m/s`,
		];

		weatherDataElement.querySelector(
			".icon"
		).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

		weatherDataElement.querySelector(
			".temperature"
		).textContent = `${temperature}°C`;

		weatherDataElement.querySelector(".description").textContent = description;

		weatherDataElement.querySelector(".details").innerHTML = details
			.map((detail) => `<div>${detail}</div>`)
			.join("");
	} catch (error) {
		weatherDataElement.querySelector(".icon").innerHTML = "";

		weatherDataElement.querySelector(".temperature").textContent = "";

		weatherDataElement.querySelector(".description").textContent =
			"An Error Occured Please try again!";

		weatherDataElement.querySelector(".details").innerHTML = "";
	}
}
