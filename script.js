const grantBtn=document.querySelector(".acc-btn");
const grantscreen=document.querySelector(".grantaccess");
const giveweather=document.querySelector(".giveweather");
const loadingbar=document.querySelector(".loading");
const searchbar=document.querySelector(".searchbar");
const searchbtn=document.querySelector(".searchbtn");
const inputcity=document.querySelector(".searchcity");
const unit=document.querySelector(".unit");

var searchtemp=0;

const cityName=document.querySelector(".place");
    const countryIcon=document.querySelector(".countryicon");
    const desc=document.querySelector(".weater");
    const weatherIcon=document.querySelector(".weatherimg");
    const temp=document.querySelector(".temp");
    const windspeed=document.querySelector(".windspeed");
    const humidity=document.querySelector(".humidity");
    const cloudi=document.querySelector(".cloudi");
    const api_key="2e663fe89ea6b5476b7c22fa6f454fbf";


const yourweather=document.querySelector(".yourweather");
const searchweather=document.querySelector(".searchweather");

let currtab=yourweather;
currtab.classList.add("curr-tab");

    getfromSessionStorage();


    yourweather.addEventListener("click",()=>{
        switchtab(yourweather);
    })
    
    searchweather.addEventListener("click",()=>{
        switchtab(searchweather);
    })


    function switchtab(clickedtab){
        if(clickedtab != currtab){
            currtab.classList.remove("curr-tab");
            currtab=clickedtab;
            currtab.classList.add("curr-tab");
    
            if(currtab == searchweather){
                grantscreen.classList.add("hidden");
                giveweather.classList.add("hidden");             
                searchbar.classList.remove("hidden");
            }
            if(currtab == yourweather){
                searchbar.classList.add("hidden");
                getfromSessionStorage();
            }
        }
    }


    function getfromSessionStorage(){
    
        const localCoordinates= sessionStorage.getItem("user-coordinates");
        // console.log(localCoordinates);
        if(!localCoordinates){

            grantscreen.classList.remove("hidden");
            giveweather.classList.add("hidden");
            
        }
        else{

            // giveweather.classList.remove("hidden");
            const coordinates=JSON.parse(localCoordinates);
            fetchUserWeatherInfo(coordinates);
        }
        }
            
    async function fetchUserWeatherInfo(coordinates){
                
        const{lat,lon}=coordinates;
        // console.log(lat);
        // console.log(lon);
            
           
        grantscreen.classList.add("hidden");
        giveweather.classList.add("hidden");
        loadingbar.classList.remove("hidden");
        
        try{
            const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`);
            const data= await res.json();
    
            loadingbar.classList.add("hidden");
            
            giveweather.classList.remove("hidden");
            
            renderWeatherInfo(data);

            
            // unit.innerHTML="Kelvin";
        }
        catch(err)
        {
            loadingbar.classList.add("hidden");
            console.log(err);
        }
    }


    async function fetchSearchWeatherInfo(city){

        // console.log("call fetchSearchWeatherInfo main ayi");
                
        // const{lat,lon}=coordinates;
        // console.log(lat);
        // console.log(lon);
            
           
        // grantscreen.classList.add("hidden");
        // giveweather.classList.add("hidden");
        loadingbar.classList.remove("hidden");
        
        try{
            const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
            const data= await res.json();
    
            loadingbar.classList.add("hidden");
            
            // giveweather.classList.remove("hidden");
            
            renderWeatherInfo(data);
        }
        catch(err)
        {
            loadingbar.classList.add("hidden");
            console.log(err);
        }
    }


    function renderWeatherInfo(data){

        // console.log("call render main ayi");

        giveweather.classList.remove("hidden");

        cityName.innerHTML=data?.name;
        countryIcon.src = `https://flagcdn.com/48x36/${data?.sys?.country.toLowerCase()}.png`;
        desc.innerHTML=data?.weather?.[0].description;
        weatherIcon.src=`https://openweathermap.org/img/w/${data?.weather?.[0].icon}.png`;
        let t=data?.main?.temp;
        // searchtemp=t;
        if(t>100){
            t=t-273.15;
        }
        temp.innerHTML=t.toFixed(2).toString() ;
        windspeed.innerHTML=data?.wind?.speed;
        humidity.innerHTML=data?.main?.humidity;
        cloudi.innerHTML=data?.clouds?.all;
    
    }

    grantBtn.addEventListener("click",getlocation);


    function getlocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPostion);
        }
        else{
            console.log("no support");
        }
    }


    function showPostion(position){
        const userCoordinates={
            lat:position.coords.latitude,
            lon:position.coords.longitude
        }
    
        sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
        fetchUserWeatherInfo(userCoordinates);
    }




    searchbtn.addEventListener("click",()=>{
        var cityname = inputcity.value;
        console.log(cityname);
        
        if(!cityname){
            // console.log("call if main ayi");
            return;
        }
        else{
            // console.log("call else main ayi");
            fetchSearchWeatherInfo(cityname);
            // unit.innerHTML="°C";
            // temp.innerHTML=searchtemp;
            // console.log(searchtemp);
        }
    });
