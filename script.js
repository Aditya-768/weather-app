const city = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const weatherContainer = document.querySelector("main")
const loader = document.getElementById("loader");
const apiKey = "0f9d55fcf6aeddab7e50f2fa8dc85f66"
const image = document.getElementById("image")

searchBtn.addEventListener("click", () => {
    getWeather()
})


const loaderContainer = document.getElementById("loader-id");
async function getWeather(cityName) {
    try {

        loaderContainer.classList.add("loader")
        cityName = city.value
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            throw new error("Network issue")
        }
        else {
            const data = await response.json()
            const temperature = data.main.temp + " °C"
            const description = data.weather[0].description
            // const icon = data.weather[0].icon
            const details = [
                `Feels like: ${data.main.feels_like} °C`,
                `Humidity: ${data.main.humidity} %`,
                `Wind Speed: ${data.wind.speed} km/hr`
            ]
            const name = document.getElementById("city-name")
            console.log(data)
            console.log(cityName)

            document.getElementById("temperature").innerHTML = temperature
            document.getElementById("humidity").innerHTML = details[1]
            document.getElementById("wind-speed").innerHTML = details[2]
            document.getElementById("feels-like").innerHTML = details[0]
            document.getElementById("description").innerHTML = description
            name.innerHTML = data.name

            image.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather image">`

            document.getElementById("feels-like").classList.add("colored-box");
            document.getElementById("humidity").classList.add("colored-box");
            document.getElementById("wind-speed").classList.add("colored-box");
            city.value = ''

            document.getElementById("feels-like").classList.add("colored-box");
            document.getElementById("humidity").classList.add("colored-box");
            document.getElementById("wind-speed").classList.add("colored-box");
        
        }

    }
    catch (error) {
        console.error(error);
    } 
    finally {
        loaderContainer.classList.remove("loader") 
    }
}
