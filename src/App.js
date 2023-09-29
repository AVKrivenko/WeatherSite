
import {useEffect, useState} from "react"
import { getFormattedWeatherData } from './weatherService';
import geo from './assests/geo.svg';
import Description from "./components/description";
import Time from "./components/Time";
import DetailsTemp from "./components/DetailsTemp";



function App() {


  const [city,setCity]=useState("Samara");
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
         setInterval(() => setDateState(new Date()), 300);
  }, []);


   const [weather,setWeather]= useState()
   const [units,setUnits] = useState("metric");
   
  useEffect(()=>
  {
    const fetchWeatherData = async()=>{
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);  
    };

    

    fetchWeatherData();

  },[city,units]);
 

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

 


  return (
      <div className="app" >
        <div className="container">
          <div className="overplay">
          <div className="part__right">
              <div className="section__geolocation">
              
                <div className="geolacation__name">
                <img  className ='geo-icon'src={geo} alt="geolocation-icon"/>
                <div className="geo__text">{`${weather.name},${weather.country}`}</div>
                <button   onClick={(e) => handleUnitsClick(e)} className="section__temperature-btn">
	                    <span  className="checkbox-green-switch" data-label-on="C" data-label-off="F">F</span>
                      </button>
                </div>
              </div>
                <div className="section__temperature">
                  <div className="icon_temperature">
                    
                    <img className="icon__temperature-weather"
                     src={weather.iconURL}
                    alt="weatherIcon"/>
                    
                      </div>

                      <div className="temperature__text">{`${weather.temp.toFixed()}°${units==='metric' ? "C" :"F"}`}</div> 
                      <div className="temperature__text_description">{weather.description}</div> 
                     
                  
                </div>
                {weather && (
              <div className="section__data">
              <Time weather={weather} />
          </div>
                )}
          </div>
          <div className="part__left">
            <input type="text"
             name="city" 
             onKeyDown={enterKeyPressed}
              placeholder="Enter city..."/>
            
            <DetailsTemp weather={weather} />
           <Description weather ={weather} units={units}/>

           
         
           </div>
          </div>
          
          </div>
        </div>
    
      
  );
}

export default App;
