import React from "react";
// import {
//   UilTemperature,
//   UilTear,
//   UilWind,
//   UilSun,
//   UilSunset,
// } from "@iconscout/react-unicons";
import { WiSunrise,WiSunset } from "react-icons/wi";
import { formatToLocalTime} from "../weatherService";

function DetailsTemp({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div >
        <p>{details}</p>
      </div>

      
      <div className="section__details">
        
        <p className="section__details-sun">
          Sunrise{" "}
          <div className="details__sun-icon">
          <WiSunrise size={50} />
          </div>
          <span className="">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
       

    
        <p className="section__details-sun">
          Sunset{" "}
          <div className="details__sun-icon">
          <WiSunset size={50}/>
          </div>
          <span className="">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        

        
      
      </div>
    </div>
  );
}

export default DetailsTemp;