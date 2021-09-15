import React,{useState,useEffect} from 'react';
import './App.css';
import './index.css'

function App() {
  const gettingDate = (d)=>{
    let months = ["January","February",'March',"April","May","June","July","August","September","October","November","December"]
    let days = ["Sunday","Monday","Tuesday","Wednesday",'Thursday',"Friday","Saturady"]
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

    const[isloading,setisloading] = useState(false)
    const[input,setInput]  = useState("Karachi")
    const [weather,setWeather] = useState({})
    const [error,setError] = useState(null)
    useEffect(()=>{
      setTimeout(() => {
        fetchWeather()
        
      }, 2000);
    },[])
    const cityHandler = (event)=>{
      setInput(event.target.value)
  
    }
    async function fetchWeather(){
      setisloading(true)
      try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=80bfefd7fd280b454e5e7ccc60cd5329&units=metric`)
        if(!response.ok){
          throw new Error("Something went wrong")
        }
        const data =  await  response.json()
        const fetcheddata = {temp:data.main.temp,city:data.name,country:data.sys.country,atmos:data.weather[0].main}
        setWeather(fetcheddata)
        console.log(data)
    }
    
      catch(error){
              setError(error.message)
            }
             setisloading(false)
          
  
    }
  
    return (
      
        <div className = {weather.atmos==="Clouds" || weather.atmos==="Smoke" ? "app"  : weather.atmos ==="Rain"?  "rainapps" : weather.atmos==="Haze" ? "hazeapps" :  "apps"}>
        
          <input  type="text" value={input} onChange={cityHandler} className="inp" /><br/>
          <div className="btn">
          <button onClick={fetchWeather}>Enter</button>
          </div>
          <div className="place">
            <div className = "city">{weather.city}, {weather.country}</div>
            <div className = "date">{gettingDate(new Date())}</div>
  
          </div>
          <div className="weather">
          <div className ="temp">{weather.temp} *C</div>
          <div className ="atmos">{weather.atmos}</div>
          </div>
      
       
       </div>

  
  
    
  );
}

export default App;
