import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=58fdfff6aa3d419baa4777accd44eb3a`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation(""); // clear the input field
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">{data.name}</div>
          <div className="temp">
            {data.main ? (
              <h1>
                {data.main.temp.toFixed()}
                <span>&#176;</span>F
              </h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom" fixed="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {data.main.feels_like.toFixed()}
                  <span>&#176;</span>F
                </p>
              ) : null}
              <p className="size">Feels-Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p className="size">Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}mph</p>
              ) : null}
              <p className="size">winds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
