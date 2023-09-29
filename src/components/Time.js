import React from "react";
import { formatToLocalTime } from "../weatherService";

function Time({ weather: { dt, timezone } }) {
  return (
    <div>
      <div className="section__time">
        <p className="section__time-dt" >
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      
    </div>
  );
}

export default Time;