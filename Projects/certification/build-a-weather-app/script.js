const WEATHER_API = "https://weather-proxy.freecodecamp.rocks/api/city/<CITY>";
const ALERT_MSG = "Something went wrong, please try again later";

const rainyVideoURL =
  "https://cdn.pixabay.com/video/2021/11/05/94680-643084362_small.mp4";
const cloudyVideoURL =
  "https://cdn.pixabay.com/video/2018/08/10/17723-284467863_small.mp4";
const clearVideoURL =
  "https://cdn.pixabay.com/video/2016/11/13/6350-191338848_medium.mp4";
let bgVideoURL;

const bgVideo = document.getElementById("bg-video");
const getWeatherBtn = document.getElementById("get-weather-btn");
const citySelector = document.getElementById("city-selector");

const weatherIcon = document.getElementById("weather-icon");
const mainTemperature = document.getElementById("main-temperature");
const maxTemperature = document.getElementById("max-temperature");
const minTemperature = document.getElementById("min-temperature");
const summary = document.getElementById("summary");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationEle = document.getElementById("location");

async function getWeather(city) {
  try {
    const response = await fetch(WEATHER_API.replace("<CITY>", city));
    if (!response.ok) {
      throw new Error(
        `getWeather failed to fetch data, status: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function showWeather(city) {
  if (!city) return;
  try {
    const data = await getWeather(city);
    if (!data) throw new Error(`no usable data from getWeather(${city})`);

    const icon = data?.weather?.[0]?.icon;
    const weatherCode = data?.weather?.[0].id;

    updateBgVideo(weatherCode);

    const textContentData = new Map([
      [mainTemperature, data?.main?.temp],
      [maxTemperature, data?.main?.temp_max],
      [minTemperature, data?.main?.temp_min],
      [summary, data?.weather?.[0].description],
      [feelsLike, data?.main?.feels_like],
      [humidity, data?.main?.humidity],
      [wind, data?.wind?.speed],
      [windGust, data?.wind?.gust],
      [weatherMain, data?.weather?.[0]?.main],
      [locationEle, data?.name],
    ]);
    const fallbackStr = "N/A";

    weatherIcon.src = icon ?? "";
    textContentData
      .entries()
      .forEach(
        ([ele, dataForEle]) => (ele.textContent = dataForEle ?? fallbackStr),
      );
  } catch (e) {
    alert(ALERT_MSG);
  }
}

function getBgURL(weatherCode) {
  if (weatherCode === 800) return clearVideoURL;

  const startingCode = String(weatherCode)[0];
  const rainyCodes = ["2", "3", "5", "6"];
  const cloudyCodes = ["7", "8"];

  if (rainyCodes.includes(startingCode)) {
    return rainyVideoURL;
  }
  if (cloudyCodes.includes(startingCode)) {
    return cloudyVideoURL;
  }

  return null;
}

function updateBgVideo(weatherCode) {
  const url = getBgURL(weatherCode);
  if (!url || bgVideoURL === url) return;

  if (bgVideo.classList.contains("loaded")) {
    bgVideo.classList.remove("loaded");
  } else {
    bgVideo.src = url;
  }

  bgVideoURL = url;
}

function showBgVideo() {
  bgVideo.classList.add("loaded");
}

bgVideo.addEventListener("canplay", () => showBgVideo());
bgVideo.addEventListener("transitionend", () => {
  if (!bgVideo.classList.contains("loaded")) {
    bgVideo.src = bgVideoURL;
  }
});
getWeatherBtn.addEventListener("click", () => showWeather(citySelector.value));
