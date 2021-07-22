import React, { useState, useEffect } from 'react'
const api = {
  key: '#',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  useEffect(() => {
    if (typeof weather.main != 'undefined')
      document.title = `Weather of ${weather.sys.country}`
    else document.title = 'Weather App'
  }, [weather])
  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          setQuery('')
          if (typeof result.main === 'undefined')
            alert('Please enter a valid city name')
          console.log(result)
        })
    }
  }

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='message'>
          <h1>
            Welcome to weather App! Please enter name of a city and then Press
            Enter
          </h1>
        </div>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{new Date().toLocaleString()}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c </div>
              <div className='weather'>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt=''
                />
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  )
}

export default App
