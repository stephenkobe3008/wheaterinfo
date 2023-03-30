import React, { useState } from "react";
import "./style.css";
import prefectures from "./prefectures.js";

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [selectedPrefecture, setSelectedPrefecture] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedPrefecture) {
      setWeatherInfo(null);
      return;
    }
    const apiKey = "your APIkey";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedPrefecture}&appid=${apiKey}&units=metric&lang=ja`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const weatherData = data.list;
          const weatherInfo = weatherData.map((data) => {
            const date = new Date(data.dt * 1000);
            const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][
              date.getDay()
            ];
            const time = `${
              date.getMonth() + 1
            }/${date.getDate()} (${dayOfWeek}) ${date.getHours()}時`;
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            return (
              <div key={data.dt}>
                <p>{time}</p>
                <p>天気: {description}</p>
                <p>温度: {temperature}°C</p>
                <p>湿度: {humidity}%</p>
                <p>風速: {windSpeed}m/s</p>
              </div>
            );
          });
          setWeatherInfo(weatherInfo);
        }
      });
  }

  return (
    <div>
      <h1>お天気情報</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prefecture">都道府県:</label>
        <select
          id="prefecture"
          name="prefecture"
          value={selectedPrefecture}
          onChange={(event) => setSelectedPrefecture(event.target.value)}
        >
          <option value="">選択してください</option>
          {prefectures.map((prefecture) => (
            <option key={prefecture} value={prefecture}>
              {prefecture}
            </option>
          ))}
        </select>
        <button type="submit">Get Weather</button>
      </form>
      {weatherInfo ? (
        <div className="weather-info">{weatherInfo}</div>
      ) : (
        <p style={{ color: "red" }}>
          天気情報がありません。都道府県を選択してください。
        </p>
      )}
    </div>
  );
}

export default WeatherApp;
