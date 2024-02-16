let city = "mumbai"
let userUnit="metric"
let DEGREE="C"
let SPEED="m/s"
const apiKey = "10d696a846bb58e1b7f8c9abef6f5c4d"


async function checkWeather() {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=${userUnit}&q=${city}`
    const response = await fetch(apiURL + `&appid=${apiKey}`)
    // console.log(city)
    let data = await response.json();
    // console.log(data);
    document.querySelector(".city").innerText = data.name + ", " + countryCode(data.sys.country)
    document.getElementById("temp").innerText = Math.round(data.main.temp) + "" + String.fromCharCode(176) + DEGREE
    document.getElementById("windStatus").innerText = (data.wind.speed).toFixed(1) +" "+SPEED
    document.getElementById("Humidity").innerText = data.main.humidity + " %"
    document.getElementById("Visibility").innerText = (data.visibility) / 1000 + " km"
    document.getElementById("Pressure").innerText = data.main.pressure + " hPa"
    document.getElementById("Feels").innerText = Math.round(data.main.feels_like) + " " + String.fromCharCode(176) + DEGREE
    document.getElementById("sunRise").innerText = moment.utc(data.sys.sunrise, 'X').add(data.timezone, 'seconds').format('HH:mm ') + " AM"
    document.getElementById("sunSet").innerText = moment.utc(data.sys.sunset, 'X').add(data.timezone, 'seconds').format('hh:mm ') + " PM"
    document.getElementById("skyDescription").innerHTML=(data.weather[0].description)
    document.getElementById("weatherIcon").src= `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

}


const currentDay = () => {
    const date = new Date();

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    };

    document.querySelector(".calendar").innerText = date.toLocaleString('en-IN', options)

}


let icon = document.getElementById("icon");
let imageLogo = document.getElementById("imageLogo");
icon.onclick = (event) => {

    document.body.classList.toggle("whiteTheme")
    icon.classList.toggle('bxs-moon')
    if (document.body.classList.contains("whiteTheme")) {
        imageLogo.src = "images/blackLogo.png"
    } else {
        imageLogo.src = "images/whiteLogo.png"
    }
    event.preventDefault()

    
}


document.querySelector(".weatherSearch").addEventListener('submit', e => {
    let cityName = document.querySelector(".cityName");
    // e.preventDefault(); 
    city=cityName.value
    checkWeather()
    e.preventDefault();
})

const countryCode = (country) => {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country)
}
currentDay()

checkWeather()

    document.getElementById("celsus").addEventListener('click', ()=> {
        if(userUnit!=="metric"){
            userUnit="metric"
            DEGREE="C"
            SPEED="m/s"
            checkWeather()
        }

})
    document.getElementById("frahtine").addEventListener('click', ()=> {
        if(userUnit=="metric"){
            userUnit="imperial"
            DEGREE="F"
            SPEED="mph"
            checkWeather()
        }

})

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const dataContainer = document.getElementById("data");

    // Simulate API data retrieval
    setTimeout(() => {
        loader.style.display = "none";
        dataContainer.style.display = "block";
        // Display the API data in the dataContainer
        // dataContainer.innerHTML = checkWeather();
    }, 2000); // Simulating a 3-second API data loading time
});



