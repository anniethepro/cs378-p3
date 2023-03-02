import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [cities, setCities] = useState(['Austin', 'Dallas', 'Houston'])
  const [times, setTimes] = useState([])
  const [temps, setTemps] = useState([])
  const [weathers, setWeathers] = useState([])


  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=ac4226bd5005c5d5a7a36edb3dac0dd8`


  
  const searchLocation = async () => {
    

    try {
      const response = await axios.get(url)
      setData(response.data)
      setErrorMessage('')
      if (!cities.includes(location)) {
        setCities([...cities , location])
      }
      // debugger
      setTimes([data.list[0].dt_txt.split(" ")[1], data.list[1].dt_txt.split(" ")[1], data.list[2].dt_txt.split(" ")[1], data.list[3].dt_txt.split(" ")[1], data.list[4].dt_txt.split(" ")[1], data.list[5].dt_txt.split(" ")[1], data.list[6].dt_txt.split(" ")[1], data.list[7].dt_txt.split(" ")[1]])
      setTemps([data.list[0].main.temp, data.list[1].main.temp, data.list[2].main.temp, data.list[3].main.temp, data.list[4].main.temp, data.list[5].main.temp, data.list[6].main.temp, data.list[7].main.temp])
      setWeathers([data.list[0].weather[0].main, data.list[1].weather[0].main, data.list[2].weather[0].main, data.list[3].weather[0].main, data.list[4].weather[0].main, data.list[5].weather[0].main, data.list[6].weather[0].main, data.list[7].weather[0].main])

    } catch(error) {
      setErrorMessage("Weather data for city not found")
      setTimes([])
      setTemps([])
      setWeathers([])
    }

    setLocation('')
  }

  const clickLocation = async (e) => {
    try {

    
      setLocation(e.target.innerHTML)
      
      const response = await axios.get(url)
      setData(response.data)
      setErrorMessage('')
      // debugger
      setTimes([data.list[0].dt_txt.split(" ")[1], data.list[1].dt_txt.split(" ")[1], data.list[2].dt_txt.split(" ")[1], data.list[3].dt_txt.split(" ")[1], data.list[4].dt_txt.split(" ")[1], data.list[5].dt_txt.split(" ")[1], data.list[6].dt_txt.split(" ")[1], data.list[7].dt_txt.split(" ")[1]])
      setTemps([data.list[0].main.temp, data.list[1].main.temp, data.list[2].main.temp, data.list[3].main.temp, data.list[4].main.temp, data.list[5].main.temp, data.list[6].main.temp, data.list[7].main.temp])
      setWeathers([data.list[0].weather[0].main, data.list[1].weather[0].main, data.list[2].weather[0].main, data.list[3].weather[0].main, data.list[4].weather[0].main, data.list[5].weather[0].main, data.list[6].weather[0].main, data.list[7].weather[0].main])
    }
    catch(error) {
      setErrorMessage("Too many calls to API being made, please wait")
      setTimes([])
      setTemps([])
      setWeathers([])
    }
  }

  
  return (
    <div class="app">
      <div id='cities'>
      
      {cities.map(city => (
        <button class="cityName" onClick={(e) => clickLocation(e)}>{city}</button>
      ))}
      </div>

      <div class='search'>
        <input
        type = "text"
        value = {location}
        onChange = {event => setLocation(event.target.value)}
        placeholder = "Enter Location"
         />
        <button id="addCity" onClick = {()=>searchLocation()}>+</button>
      </div>

      <div class='info'>
      <h1>24-Hour Forecast</h1>
      <div class="metrics">
        <table>
          <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Weather</th>
          </tr>
            {times.map((time, index) => (
            <tr>
              <td>{time}</td>
              <td>{temps[index]}</td>
              <td>{weathers[index]}</td>
              </tr>
           ))}
        </table>
      </div>
 
      <div class="weatherInfo">
        <p>{errorMessage}</p>

      </div>

      </div>


    </div>
  );
}

export default App;
