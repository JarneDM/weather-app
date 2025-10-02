import { useState } from "react";

export default async function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <h1>Weather App</h1>
    </div>
  );
}
