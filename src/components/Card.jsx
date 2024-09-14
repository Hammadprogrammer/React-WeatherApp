export default function Card({ name, temperature, src, date, weatherText, country }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-cyan-500/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-cyan-400">{name}, {country}</h2>
          <p className="text-sm text-gray-500">{new Date(date).toLocaleString()}</p>
        </div>
        <img src={src} alt={weatherText} className="w-12 h-12" />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-5xl font-bold text-white">{temperature}°C</p>
        <p className="text-lg font-medium text-cyan-300">{weatherText}</p>
      </div>
    </div>
  );
} 