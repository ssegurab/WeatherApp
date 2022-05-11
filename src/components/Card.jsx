import React from 'react';
import Spinner from './Spinner';

const Card = ({weather, forecast, loadingData, showData}) =>{

    let today = new Date();
    let hour = today.toLocaleTimeString();
    let day = today.getDate();
    let month = today.getMonth() +1;
    let year = today.getFullYear();
    let date = day + '/' + month + '/' + year;

    let url = "";
    let iconUrl = "";

    let iconUrl3h = "";
    let iconUrl6h = "";
    let iconUrl9h = "";

    let forecastDate3h = "";
    let forecastDate6h = "";
    let forecastDate9h = "";
    
    if(loadingData){
        return <Spinner />
    }

    if(showData){
        url = "http://openweathermap.org/img/w/";
        iconUrl = url + weather.weather[0].icon + ".png";

        iconUrl3h = url + forecast.list[1].weather[0].icon + ".png";
        iconUrl6h = url + forecast.list[2].weather[0].icon + ".png";
        iconUrl9h = url + forecast.list[3].weather[0].icon + ".png";

        forecastDate3h = forecast.list[1].dt_txt.substring(8, 10) + '/' + forecast.list[1].dt_txt.substring(5, 7) + '/' + forecast.list[1].dt_txt.substring(0, 4) + ' ' + forecast.list[1].dt_txt.substring(11, 16);
        forecastDate6h = forecast.list[2].dt_txt.substring(8, 10) + '/' + forecast.list[2].dt_txt.substring(5, 7) + '/' + forecast.list[2].dt_txt.substring(0, 4) + ' ' + forecast.list[2].dt_txt.substring(11, 16);
        forecastDate9h = forecast.list[3].dt_txt.substring(8, 10) + '/' + forecast.list[3].dt_txt.substring(5, 7) + '/' + forecast.list[3].dt_txt.substring(0, 4) + ' ' + forecast.list[3].dt_txt.substring(11, 16);
    }

    return(
        <div className="mt-5">

            {
                showData === true ? (
                    <div className="container">
                        <div className="card mb-3 mx-auto bg-dark text-light">
                            <div className="row g-0">
                                <div className="card-weather col-md-4">
                                    <h3 className="card-title">{weather.name}</h3>
                                    <p className="card-date">{date}</p>
                                    <p className="card-hour">{hour.substring(0, 5) + 'h'}</p>
                                    <h1 className="card-temp">{(weather.main.temp - 273.15).toFixed(1)}ºC</h1>
                                    <p className="card-desc"><img src={iconUrl} alt="icon"/>{weather.weather[0].description}</p>
                                    <img src="https://cdn.pixabay.com/photo/2019/12/24/12/31/berlin-4716680_960_720.jpg" className="card-img img-fluid rounded-start" alt="city"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body text-start mt-2">
                                        <h5 className="card-text">Temperatura máxima: {(weather.main.temp_max - 273.15).toFixed(1)}ºC</h5>
                                        <h5 className="card-text">Temperatura mínima: {(weather.main.temp_min - 273.15).toFixed(1)}ºC</h5>
                                        <h5 className="card-text">Sensación térmica: {(weather.main.feels_like - 273.15).toFixed(1)}ºC</h5>
                                        <h5 className="card-text">Humedad: {(weather.main.humidity)}%</h5>
                                        <h5 className="card-text">Velocidad del viento: {(weather.wind.speed)}m/s</h5>
                                    </div>
                                    <hr />

                                    <div className="row mt-4">
                                        <div className="col">
                                            <p>{forecastDate3h}h</p>
                                            <p className="description"><img src={iconUrl3h} alt="icon"/>{forecast.list[1].weather[0].description}</p>
                                            <p className="temp">{(forecast.list[1].main.temp - 273.15).toFixed(1)}ºC</p>
                                        </div>
                                        <div className="col">
                                            <p>{forecastDate6h}h</p>
                                            <p className="description"><img src={iconUrl6h} alt="icon"/>{forecast.list[2].weather[0].description}</p>
                                            <p className="temp">{(forecast.list[2].main.temp - 273.15).toFixed(1)}ºC</p>
                                        </div>
                                        <div className="col">
                                            <p>{forecastDate9h}h</p>
                                            <p className="description"><img src={iconUrl9h} alt="icon"/>{forecast.list[3].weather[0].description}</p>
                                            <p className="temp">{(forecast.list[3].main.temp - 273.15).toFixed(1)}ºC</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ):(
                    <h2 className="text-light">Sin datos</h2>
                )
            }

        </div>
    );
}

export default Card;