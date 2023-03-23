import { useState, useEffect } from 'react'

type Weather = {
  current_weather: {
    temperature: number
    time: string
    weathercode: number
    winddirection: number
    windspeed: number
  }
  elevation: number
  generationtime_ms: number
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

function App() {
  const [weather, setWeather] = useState<Weather | undefined>()
  useEffect(() => {
    async function load () {
      const query = new URLSearchParams(window.location.search)
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${query.get('lat')}&longitude=${query.get('lng')}&current_weather=true`)
      const data = await response.json() as Weather
      console.log(data)
      setWeather(data)
    }
    load()
  }, [])

  if (!weather) return null

  return (
    <div style={{display: 'flex', alignItems: 'center', background: 'transparent', height: '100%'}}>
      <div style={{fontWeight: 'bold', color: 'white', fontSize: 22}}>{Math.floor(weather.current_weather.temperature * 9 / 5 + 32)}°F</div>
      <img style={{width: 'auto', height: 48}} src={`https://worldweather.wmo.int/images/${weather.current_weather.weathercode.toString()[0]}.png`} />
    </div>
  )
}

export default App
