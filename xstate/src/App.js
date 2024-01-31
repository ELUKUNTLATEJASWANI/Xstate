import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => {
        setCountries(res.data);
        console.log("Countries:", res.data);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => {
          setStates(res.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
          console.log("States:", res.data);
        })
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => {
          setCities(res.data);
          setSelectedCity("");
          console.log("Cities:", res.data);
        })
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedCountry, selectedState]);



  return (
    <div className='city-selector'>
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className='dropdown'
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
         value={selectedState}
         onChange={(e) => setSelectedState(e.target.value)}
         className='dropdown'
         >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
          </select>
          <select
         value={selectedCity}
         onChange={(e) => setSelectedCity(e.target.value)}
         className='dropdown'
         
         >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
          </select>
      </div>
      {selectedCity && (
        <h2 className='result'>
          You selected <span className='highlight'>{selectedCity},</span>
          <span className='fade'>
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
    
  );
}

export default App;