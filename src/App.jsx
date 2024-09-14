import { useRef, useState } from "react";
import axios from "axios";
import Card from "./components/Card";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getValue = useRef(null);

  const Weather = (event) => {
    event.preventDefault();
    setLoading(true);
    const apiKey = '2aabea5f82e14886a5e131324242408';

    axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${getValue.current.value}&aqi=no`)
      .then((res) => {
        const cityExists = data.some(item => item.location.name === res.data.location.name);
        if (!cityExists) {
          setData([res.data, ...data]);
        } else {
          alert('City already exists.');
        }
        getValue.current.value = '';
        setLoading(false);
      })
      .catch((err) => {
        alert('This City Is Not Exists In My Data Try Another');
        getValue.current.value = '';
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-4xl font-bold text-white tracking-wide mb-8 shadow-md border-b-4 border-cyan-500">
        Weather App
      </h1>

      <form onSubmit={Weather} className="w-full max-w-md bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="relative mb-4">
          <input
            ref={getValue}
            type="text"
            placeholder="City Name"
            className="w-full py-3 px-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-cyan-500 py-3 rounded-lg text-lg font-bold text-gray-800 hover:bg-cyan-400 transition duration-300">
            {loading ? 'Checking...' : 'Get Weather'}
          </button>
        </div>
      </form>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {data.length > 0 ? data.map((item) => (
          <Card
            key={item.location.name}
            name={item.location.name}
            temperature={item.current.temp_c}
            src={item.current.condition.icon}
            date={item.location.localtime}
            weatherText={item.current.condition.text}
            country={item.location.country}
          />
        )) : <h2 className="text-gray-400 text-lg font-light"> Enter a city name.</h2>}
      </div>
    </div>
  );
}
