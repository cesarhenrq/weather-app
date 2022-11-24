let locals = []

let weatherInformations = []

const getWeather = async (local) => {
  const apiResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/search?q=${local}&apikey=wUCTHNPfuQBxnxdp9GGFGlRWe8lAv6kK`)
  locals = await apiResponse.json()

  const apiResponse2 = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locals[0].Key}?apikey=wUCTHNPfuQBxnxdp9GGFGlRWe8lAv6kK`)
  weatherInformations = await apiResponse2.json()

  setWeather(weatherInformations, locals)
}

const searchWeather = document.getElementById('search-weather')

searchWeather.addEventListener('click', (event) => {
  event.preventDefault()
  let local = document.getElementById('local').value
  getWeather(local)
})

const setWeather = (weather, local) => {
  
  const date = new Date(weather[0].LocalObservationDateTime).toLocaleDateString('pt-BR')
  
  document.getElementById('weather-informations').innerHTML = `<div id="conteiner"><div class="content"><div id="city">${local[0].LocalizedName}</div> <div id="date">${date}</div></div> <div class="content"> <div id="temperature">${weather[0].Temperature.Metric.Value}°C</div> <div id="weather">${weather[0].WeatherText}</div></div></div>`
}

