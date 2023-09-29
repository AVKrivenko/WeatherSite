import { DateTime } from "luxon";

const API_KEY="dd6e982815799c71cf65bb14ec5d28e3";

 const makeiconURL =(iconId)=>` https://openweathermap.org/img/wn/${iconId}@2x.png`
const getFormattedWeatherData= async (city,units="metric")=>{
    const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL).then((res)=>res.json()).then((data)=> data);
 
    const {weather,
        coord:{lat,lon},
        main:{temp ='metric',feels_like,temp_max,
        temp_min,humidity,pressure },
        sys:{country,sunrise,sunset},
        name,
        dt,
        wind:{speed}} = data;
    
    const {details,description,icon} = weather[0]
    

    return{
        lat,
        lon,
        description,
     
        iconURL:makeiconURL(icon),
        temp,
        feels_like,
        temp_max,
        temp_min,
        pressure,
        humidity,
        country,
        sunrise,
        sunset,
        speed,
        name,
        dt,
        details
        
    };
};
const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "ccc"),
        temp: d.temp.day,
        icon: d.weather[0].icon,
      };
    });
    hourly = hourly.slice(1, 6).map((d) => {
        return {
          title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
          temp: d.temp,
          icon: d.weather[0].icon,
        };
      });
    
      return { timezone, daily, hourly };
    };
    
const formatToLocalTime = (
    secs,
    zone,
    format  = "cccc, dd LLL yyyy' |  'hh:mm a "
    
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  
  const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export {getFormattedWeatherData};
export { formatToLocalTime,iconUrlFromCode };