import React, {useState} from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {

    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?&lang=es";
    let appId = "&appid="
    let apiKey = process.env.REACT_APP_API_KEY;
    let cityUrl = "&q=";

    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?&lang=es";

    const [weather, setWeather] = useState ([]);
    const [forecast, setForecast] = useState ([]);

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) => {
        setLoading(true);git
        setLocation(loc);

        //Weather
        urlWeather = urlWeather + appId + apiKey + cityUrl + loc;

        await fetch(urlWeather).then((response) =>{
            if(!response.ok) throw {response}
            return response.json();
        }).then((weatherData) =>{
            console.log(weatherData);
            setWeather(weatherData);
        }).catch(error =>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });

        //Forecast
        urlForecast = urlForecast + appId + apiKey + cityUrl + loc;

        await fetch(urlForecast).then((response) =>{
            if(!response.ok) throw {response}
            return response.json();
        }).then((forecastData) =>{
            console.log(forecastData);
            setForecast(forecastData);

            setLoading(false);
            setShow(true);

        }).catch(error =>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });

    }

    return(
        <React.Fragment>
            <Form 
                newLocation = {getLocation}
            />

            <Card 
                weather = {weather}
                forecast = {forecast}            
                loadingData = {loading}
                showData = {show}
            />
            
        </React.Fragment>
    );
}

export default WeatherPanel;