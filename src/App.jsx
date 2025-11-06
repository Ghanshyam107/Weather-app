import React, { useState } from 'react'

const API_BASE = 'https://api.openweathermap.org/data/2.5/weather'

export default function App() {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [cardVisible, setCardVisible] = useState(false)

  // NOTE: For demo we read API key from an env variable injected by Vite.
  // Create a `.env` file in react-app with VITE_OWM_KEY=your_key
  const apiKey = import.meta.env.VITE_OWM_KEY || ''

  async function handleSearch() {
    setError(null)
    setData(null)
    setCardVisible(false)
    if (!city) return setError('Enter a city name')
    if (!apiKey) return setError('API key missing. Create .env with VITE_OWM_KEY')
    setLoading(true)
    try {
      const url = `${API_BASE}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
      const res = await fetch(url)
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Failed to fetch')
      setData(json)
      // reveal card with a short delay for nicer transition
      setTimeout(()=>setCardVisible(true), 60)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => { if (e.key === 'Enter') handleSearch() }

  return (
    <div className="app">
      <h1 className="title">Weather App (React)</h1>

      <div className="controls">
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={onKey}
          placeholder="Enter city, e.g. Delhi"
          className="input"
        />
        <button className="btn" onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading…' : 'Search'}
        </button>
      </div>
  <div className={`card ${cardVisible ? 'show' : ''}`} aria-live="polite">
        {loading && (
          <div style={{display:'flex',justifyContent:'center',padding:'1rem'}}>
            <div className="spinner" aria-hidden="true"></div>
          </div>
        )}

        {error && <div className="error">Error: {error}</div>}

        {data ? (
          <div className={`weather-row ${cardVisible ? 'show' : ''}`}>
            <div className="weather-main">
              <div className="temp">{Math.round(data.main.temp)}°C</div>
              <div className="meta">{data.name}, {data.sys.country} — {data.weather[0].description}</div>
              <div className="meta">Humidity: {data.main.humidity}% | Wind: {data.wind.speed} m/s</div>
            </div>
            <img
              className={`icon icon-animate ${data.weather[0].main?.toLowerCase().includes('rain') ? 'rainy' : 'sunny'}`}
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
            />
          </div>
        ) : (!loading && !error ? (
          <div className="meta">No data yet — search for a city above.</div>
        ) : null)}
      </div>

      <footer className="footer">Create a <code>.env</code> file with <code>VITE_OWM_KEY=YOUR_KEY</code> and run <code>npm run dev</code>.</footer>
    </div>
  )
}
