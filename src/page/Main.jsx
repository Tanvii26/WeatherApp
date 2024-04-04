import React, { useState } from 'react'
import './Main.scss'
import Clock from 'react-live-clock'
const API_KEY = `715417eda886e02847eb5cb32d42e330`

const Main = () => {
    const [place, setPlace] = useState("")
    const [apiData, setApiData] = useState(null)
    const getWeather = async () => {
        if (place && place.length > 0) {
            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`
                let res = await fetch(url)
                const data = await res.json();
                if (data.cod && data.cod === "404") {
                    // Case when city is not found
                    setApiData(null);
                } else {
                    // City found, set the weather data
                    setApiData(data);
                }
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className='main'>
            <div className="top">
                <h1>Weather</h1>
            </div>

            <div className="card">
                <div className="search">
                    <input className='inp' type="text" placeholder='CITY' onChange={(e) => setPlace(e.target.value)} />
                    <button className='icon' onClick={getWeather}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <Clock className='date' format={' MMMM Mo, YYYY, h:mm:ssa'} ticking={true} />
                {apiData ? (
                    <>
                        <div className="content">
                            <h1>{(apiData?.main.temp - 273.15).toFixed(1)}°C</h1>
                            <div className="sec">
                                <span><i class="fa-solid fa-temperature-three-quarters content-icon"></i>Max: {(apiData?.main.temp_max - 273.15).toFixed(1)}°C</span>
                                <span><i class="fa-solid fa-temperature-quarter content-icon"></i>Min: {(apiData?.main.temp_min - 273.15).toFixed(1)}°C</span>
                                <span><i class="fa-solid fa-droplet content-icon"></i>Humidity: {apiData?.main.humidity}%</span>
                            </div>
                        </div>
                    </>
                ):(
                    <div className="cont">
                        <i class="fa-solid fa-cloud-sun"></i>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Main