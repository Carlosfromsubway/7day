import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';



export default function Home() {
  let apiKey = process.env.NEXT_PUBLIC_APIKEY;
  let units = process.env.NEXT_PUBLIC_UNITS;
  let location = process.env.NEXT_PUBLIC_LOCATION;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;
  

  const [data, setData] = useState();
  const grabWeather = useRef(false);

  

  const fetchWeather = async () => {
    const response = await axios.get(url)

    const arrayOfDays = [];
    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8,2), 10));
      let num = parseInt(weather.dt_txt.substr(8,2), 10);

      if(num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("here")
        console.log(response.data.list[index])
        var month = ''
        var icon =''

        if(weather.dt_txt.substr(5,2) == 1){
          month = "January"
        } else if(weather.dt_txt.substr(5,2) == 2){
          month = "February"
         }  else if(weather.dt_txt.substr(5,2) == 3){
          month = "March"
        } else if(weather.dt_txt.substr(5,2) == 4){
          month = "April"
        }else if(weather.dt_txt.substr(5,2) == 5){
          month = "May"
        }else if(weather.dt_txt.substr(5,2) == 6){
          month = "June"
        }else if(weather.dt_txt.substr(5,2) == 7){
          month = "July"
        }else if(weather.dt_txt.substr(5,2) == 8){
          month = "August"
        }else if(weather.dt_txt.substr(5,2) == 9){
          month = "September"
        }else if(weather.dt_txt.substr(5,2) == 10){
          month = "October"
        }else if(weather.dt_txt.substr(5,2) == 11){
          month = "November"
        }else if(weather.dt_txt.substr(5,2) == 12){
          month = "December"
        }

        if(weather.weather[0].main == "Clouds"){
          icon='/my icons/Cloud.png'
        } else if(weather.weather[0].main == "Clear"){
          icon = '/my icons/Sun.png'
        } else if(weather.weather[0].main == "Atmosphere"){
          icon = '/my icons/mist.png'
        } else if(weather.weather[0].main == "Rain"){
          icon = '/my icons/rain.png'
        } else if(weather.weather[0].main == "Drizzle"){
          icon = '/my icons/shower-rain.png'
        } else if(weather.weather[0].main == "Snow"){
          icon = '/my icons/Snow.png'
        } else if(weather.weather[0].main == "Thunderstorm"){
            icon = '/my icons/Lightning.png'
        }

        var now = new Date(weather.dt_txt)
;

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var day = days[now.getDate];

        return (
          <div key={index}>
            <div className={styles.weather}>
            <Image
            src={icon}
            alt={icon}
            width={190}
            height={160}
            padding={10}
            opacity={80}
            />
            <p> 

              {day} <br/> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}
            </p>
            <div> Temperature {weather.main.temp.toFixed(1)}°C</div>
            <div> Condition: {weather.weather[0].main}</div>
          </div>
          </div>
        )
}
    })
    console.log(arrayOfDays)
    setData(weatherData);
  }

useEffect(() => {
  if(grabWeather.current === true){
    fetchWeather();
  }

  return () => {
    grabWeather.current = true;
  }
}, []);

const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;



  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Weather logo.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
    
      <div className={styles.top}> 
       Van Weather <br/>
       Last updates: {date}
       </div>

      
          <div className={styles.font}>

              By{' '}
              Tyler

        
          </div>
        </div>

        <div className={styles.center}>
          <Image
            
            src="/Weather logo.png"
            alt="Next.js Logo"
            width={300}
            height={180}
            priority
          />

        </div>

        <div className={styles.grid}>
     
        {data}

        </div>
      </main>
    </>
  )
}
