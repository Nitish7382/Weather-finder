import React, { useState } from 'react';
import axios from 'axios';

const Card = () => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState('');

    const getWeather = () => {
        axios
            .get(`http://api.weatherapi.com/v1/current.json?key=86422775301e4f9481185114242112&q=${city}&aqi=no`)
            .then((res) => {
                console.log(res);
                setData(res.data);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-br from-blue-700 to-green-200 p-4">
            {/* Search Bar */}
            <div className="bg-white shadow-lg p-4 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Weather Finder
                </h1>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter City Name"
                        className="p-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                        onClick={getWeather}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Weather Card */}
            {data && (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-10 w-full max-w-md">
                    <div className="text-center">
                        <h2 className="text-xl font-bold">
                            {data.location.name}, {data.location.region}
                        </h2>
                        <p className=" text-gray-500">{data.location.localtime}</p>
                    </div>

                    <div className="flex justify-center mt-6">
                        <img
                            src={`${data.current.condition.icon}`}
                            alt="Weather condition"
                            className="w-24 h-auto"
                        />
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-6">
                        <p className="text-5xl font-bold">{data.current.temp_c}°C</p>
                        <p className="text-lg text-indigo-600 font-semibold">
                            {data.current.condition.text}
                        </p>
                    </div>

                    <div className="flex justify-around mt-6 text-center">
                        <div>
                            <p className="font-bold">Humidity</p>
                            <p className="text-gray-600">{data.current.humidity}%</p>
                        </div>
                        <div>
                            <p className="font-bold">Wind</p>
                            <p className="text-gray-600">{data.current.wind_kph} k/h</p>
                        </div>
                        <div>
                            <p className="font-bold">Visibility</p>
                            <p className="text-gray-600">{data.current.vis_km} km</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
