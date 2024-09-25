import React, { useState } from "react";
import axios from "axios";
import rain from "./Assests/rain.png";
import sun from "./Assests/sun.png";
import therm from "./Assests/therm.png";
import wind from "./Assests/windt.png";
import cloud from "./Assests/cloud.png"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=58fdfff6aa3d419baa4777accd44eb3a`;

  const searchLocation = async () => {
    try {
      const { data } = await axios.get(url);
      setData(data);
      setError(null); // Reset any previous errors
      console.log(data);
    } catch (error) {
      setError("Location not found or API error occurred");
    } finally {
      setLocation(""); // Clear the input field
    }
  };

  return (
    <div className="w-full">
      <div className="relative mt-6 mb-5 w-[16rem] sm:w-[20rem] mx-auto">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Search location"
          className="block w-full rounded-lg border border-neutral-300 bg-transparent py-3 pl-3 pr-20
           text-white ring-4  outline-none ring-transparent transition placeholder:text-white 
           placeholder:text-sm"
        />
        <div className="absolute">
          {error && (
            <p className="error text-sm text-rose-500 font-bold my-1">
              {error}
            </p>
          )}
        </div>
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            onClick={searchLocation}
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-lg bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3 10 .5v2H0v1h10v2L16 3Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* displayed data */}
      <div className="w-[16rem] sm:w-[20rem] text-center mx-auto">
        {(data.name && (
          <div className="text-center">
            <div className="card">
              <div className="flex items-center justify-center">
                <h1 className="text-5xl text-center">{data.name}</h1>
                <p>{data.sys.country}</p>
              </div>
              <img
                src={data.weather[0].main === "Clouds" ? rain : sun}
                alt="rainy-cloud"
                className="w-32 mx-auto my-2"
              />
            </div>
            <div className="card">
              {data.main && (
                <div className="flex items-center justify-between">
                  {/* <img src={therm} alt="thermometer-icon" className="w-5" /> */}
                  <h1 className="font-bold">
                    {(((data.main.temp - 32) * 5) / 9).toFixed(1)}
                    <span>&#176;</span>C <br />{" "}
                    <span className="flex items-center">
                      Temperature
                      <img src={therm} alt="thermometer-icon" className="w-5" />
                    </span>
                  </h1>

                  <p className="font-bold">
                    {(((data.main.feels_like - 32) * 5) / 9).toFixed(1)}
                    <span>&#176;</span>C <br /> <span>Feels Like.</span>
                  </p>
                </div>
              )}
            </div>
            <div className="card flex items-center justify-around font-bold">
              <p className="text-3xl mr-1">
                {data.weather && <p>{data.weather[0].main}</p>}
              </p>
              <p className="text-sm">
                {data.weather && <p>{data.weather[0].description}</p>}
                <span className="text-sm">
                  Description
                  <img src={cloud} alt="cloud icon" className="w-7 mx-auto" />
                </span>
              </p>
            </div>
          </div>
        )) || (
          <SkeletonTheme baseColor="#082529" highlightColor="#768081">
            <Skeleton className="h-52" />
          </SkeletonTheme>
        )}
        {(data.name && (
          <div className="card flex items-center justify-around font-bold text-sm">
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p className="size">Humidity</p>
            </div>
            <div className="wind">
              {data.wind && <p className="bold">{data.wind.deg}</p>}
              <p className="size">
                Degrees<span>&#176;</span>
              </p>
            </div>
            <div className="wind">
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()} mph</p>
              )}
              <p className="flex items-center">
                Winds <img src={wind} alt="wind-icon" className="w-5 ml-1"/>
              </p>
            </div>
          </div>
        )) || (
          <SkeletonTheme baseColor="#082529" highlightColor="#768081">
            <Skeleton className="h-24" count={3} />
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
}

export default App;
